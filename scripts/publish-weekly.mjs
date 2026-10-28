#!/usr/bin/env node
/**
 * 内容发布脚本：只提交内容目录，然后 push 触发 GitHub Pages 重新构建。
 *
 * 用法：
 *   node scripts/publish-weekly.mjs                 # 提交并 push
 *   node scripts/publish-weekly.mjs "周报 ai-brain"  # 自定义提交信息后缀
 *   node scripts/publish-weekly.mjs --dry-run        # 只看会提交什么，不提交
 *   node scripts/publish-weekly.mjs --validate-only  # 只校验 frontmatter
 *   node scripts/publish-weekly.mjs --force          # 跳过 frontmatter 校验
 *
 * 环境变量：PUBLISH_REMOTE(默认 github) / PUBLISH_BRANCH(默认 main) /
 *           PUBLISH_PROXY(默认 http://127.0.0.1:10090，设为空串可禁用代理)
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const root = process.cwd();
const args = process.argv.slice(2);
const flags = args.filter((arg) => arg.startsWith("--"));
const label = args.find((arg) => !arg.startsWith("--"));

const dryRun = flags.includes("--dry-run");
const force = flags.includes("--force");
const validateOnly = flags.includes("--validate-only");
const remote = process.env.PUBLISH_REMOTE ?? "github";
const branch = process.env.PUBLISH_BRANCH ?? "main";
const proxy = process.env.PUBLISH_PROXY ?? "http://127.0.0.1:10090";

function run(command, ignoreError = false) {
  try {
    return execSync(command, { cwd: root, encoding: "utf8" }).trim();
  } catch (error) {
    if (ignoreError) return "";
    throw error;
  }
}

/** 从 modules.ts 里读模块 key 与内容类型，保持单一数据源 */
function readConfig() {
  const source = fs.readFileSync(path.join(root, "app/content/modules.ts"), "utf8");
  const typesStart = source.indexOf("export const contentTypes");
  const modulesStart = source.indexOf("export const modules");
  const types = [...source.slice(typesStart, modulesStart).matchAll(/key:\s*"([^"]+)"/g)].map((m) => m[1]);
  const modules = [...source.slice(modulesStart).matchAll(/key:\s*"([^"]+)"/g)].map((m) => m[1]);
  return { types, modules };
}

function parseFrontmatter(source) {
  if (!source.startsWith("---")) return null;
  const end = source.indexOf("\n---", 3);
  if (end === -1) return null;
  const data = {};
  for (const line of source.slice(3, end).split("\n")) {
    const separator = line.indexOf(":");
    if (separator > 0) {
      data[line.slice(0, separator).trim()] = line
        .slice(separator + 1)
        .trim()
        .replace(/^['"]|['"]$/g, "");
    }
  }
  return data;
}

/** 校验 content/articles/*.md：module / type 必填且合法，design 必须有 cover */
function validate() {
  const { types, modules } = readConfig();
  const directory = path.join(root, "content/articles");
  if (!fs.existsSync(directory)) return [];
  const problems = [];
  for (const name of fs.readdirSync(directory)) {
    if (!name.endsWith(".md") || name.startsWith("_")) continue;
    const data = parseFrontmatter(fs.readFileSync(path.join(directory, name), "utf8"));
    if (!data) {
      problems.push(`${name}: 缺少 frontmatter`);
      continue;
    }
    if (!data.module) problems.push(`${name}: 缺少 module`);
    else if (!modules.includes(data.module)) problems.push(`${name}: module "${data.module}" 不在 modules.ts 里`);
    if (!data.type) problems.push(`${name}: 缺少 type`);
    else if (!types.includes(data.type)) problems.push(`${name}: type "${data.type}" 不合法（应为 ${types.join(" / ")}）`);
    if (data.type === "design" && !data.cover) problems.push(`${name}: 设计作品必须填 cover`);
    if (!data.summary) problems.push(`${name}: 缺少 summary`);
  }
  return problems;
}

const problems = validate();
if (problems.length) {
  console.log(force ? "⚠️  frontmatter 校验未通过（--force 已跳过）：" : "❌ frontmatter 校验未通过，已中止发布：");
  for (const item of problems) console.log(`   - ${item}`);
  if (!force) process.exit(1);
} else {
  console.log("✅ frontmatter 校验通过");
}

if (validateOnly) process.exit(0);

const status = run("git status --porcelain content public/images", true);
if (!status.trim()) {
  console.log("没有待发布的内容变更，跳过。");
  process.exit(0);
}

console.log("待提交的内容变更：");
console.log(status.split("\n").map((line) => `   ${line}`).join("\n"));

if (dryRun) {
  console.log("\n--dry-run：未提交。");
  process.exit(0);
}

run("git add content public/images");
const message = `content: ${label ?? `周报 ${new Date().toISOString().slice(0, 10)}`}`;
run(`git commit -m "${message}"`);
console.log(`✅ 已提交：${message}`);

const pushCommand = proxy
  ? `git -c http.proxy=${proxy} push ${remote} ${branch}`
  : `git push ${remote} ${branch}`;
run(pushCommand);
console.log(`✅ 已推送到 ${remote}/${branch}，GitHub Actions 约 1 分钟后完成部署。`);
console.log("   部署地址：https://xiaoshicheng168.github.io/dachengzi-journal");
