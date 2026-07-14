import fs from "node:fs";
import path from "node:path";

export type ArticleBlock = { heading?: string; paragraphs: string[]; quote?: string };

export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  summary: string;
  blocks: ArticleBlock[];
};

const builtInArticles: Article[] = [
  {
    slug: "why-a-pharma-person-started-using-ai",
    title: "一个医药人，为什么开始认真用 AI",
    category: "AI 共创",
    date: "2026.07.01",
    readingTime: "4 MIN READ",
    summary: "我开始认真用 AI，不是因为追风口，而是第一次看到它能把一个模糊想法变成可以持续运行的工作方式。",
    blocks: [
      { paragraphs: ["我一个做医药的，真正开始认真用 AI，居然不是因为工作，而是因为每天学一个英语单词。", "那时候，我想搭一个 AI 智能体，让它每天生成一条英语单词内容。我原来以为，AI 就是查资料、写文字。"] },
      { heading: "从一个念头，到一条流程", paragraphs: ["后来才发现，当我把目标、结构和反馈交代清楚，AI 能把一个模糊的念头，变成可以重复使用的流程。", "从那以后，我开始把 AI 用到工作复盘和演讲表达里。"] },
      { heading: "AI 不替我判断", paragraphs: ["它不是替我判断，而是让我看见，自己哪里还没想清楚。这也是我想做“懂 AI 的医药人”的原因：不追工具，只记录 AI 怎么真正进入工作。"], quote: "你也可以从一件每天重复的小事开始。" },
    ],
  },
  {
    slug: "what-i-learned-at-cpu",
    title: "我在药大读的，其实不是纯药学",
    category: "个人故事",
    date: "2026.07.01",
    readingTime: "4 MIN READ",
    summary: "专业不是背住更多名词，而是知道如何建立地图、核对证据和承认未知。",
    blocks: [
      { paragraphs: ["我在中国药科大学读的，其实不是纯药学，而是国际经济与贸易医药方向。", "这个背景有点特别：一边接触医药，一边学经济和市场。刚进行业时，非纯药学背景的人很容易焦虑：是不是我背的专业名词还不够多？"] },
      { heading: "我越来越在意的三件事", paragraphs: ["后来长期在医药行业工作，我越来越在意的，反而是三件事：我有没有看懂这个问题的结构？证据靠不靠谱？还有哪里其实我并不懂？"] },
      { heading: "先看地图，再一路校正", paragraphs: ["现在遇到一个新领域，我会先让 AI 画第一版知识地图，再回到证据、同行讨论和自己的复盘里校正。"], quote: "AI 可以让你更快看到地图，但不能替你确认，地图上的路是不是真的。" },
    ],
  },
  {
    slug: "pharma-review-with-ai",
    title: "医药人最该复盘的，不是今天拜访了谁",
    category: "医药实践",
    date: "2026.07.01",
    readingTime: "4 MIN READ",
    summary: "复盘不是重写一遍行程，而是留下观察、判断和下一次验证。",
    blocks: [
      { paragraphs: ["很多时候，一天结束，我们记下了时间、对象和做过的事。看起来很完整，第二天再看，却还是不知道下一步做什么。", "因为那只是记录，还不是复盘。"] },
      { heading: "复盘时，我只让 AI 追问三件事", paragraphs: ["第一，我今天真正观察到了什么？", "第二，哪些是事实，哪些只是我的解释？", "第三，下一次我要验证哪个判断？"] },
      { heading: "不把猜测当成事实", paragraphs: ["AI 不能替你理解客户，但它可以防止你把猜测当成事实。今天结束后，不用写完整报告。拿一条已脱敏的记录，让 AI 追问这三个问题就够了。"] },
    ],
  },
  {
    slug: "ai-cognitive-delegation",
    title: "AI 最危险的，不是答错",
    category: "AI 观察",
    date: "2026.07.01",
    readingTime: "7 MIN READ",
    summary: "AI 可能让人把“判断答案对不对”这一步也一起外包掉。",
    blocks: [
      { paragraphs: ["以前我们理解思考，常说两套系统：第一套是直觉，快，凭感觉；第二套是推理，慢，要费脑子。一篇关于人类与 AI 共同决策的论文提醒我：现在还得加第三套。", "第三套不长在脑子里，而是长在手机和电脑里的 AI。"] },
      { heading: "什么是“认知让渡”", paragraphs: ["不是把 AI 当参考，而是它一开口，你就默认它大概是对的，于是连检查都懒得检查了。", "AI 的回答通常很完整、很流畅、很像一个已经想明白的人。这会给人一种错觉：既然它都说得这么像样了，我大概不用再从头想一遍。"] },
      { heading: "AI 还会影响你的信心", paragraphs: ["论文的三组实验共包含 1,372 人、9,593 次作答。当 AI 对时，人答得更好；当 AI 错时，人也会被一起带偏。更微妙的是，用了 AI 之后，人的信心还会变高，哪怕这次其实答错了。"], quote: "AI 最容易制造的，不是错误答案，而是“我已经想过了”的幻觉。" },
      { heading: "我会怎么把它变成一个工作动作", paragraphs: ["下次用 AI 处理重要任务时，强制加一步：先让 AI 给答案，再要求自己写 1 条反对意见、1 条不确定点、1 条需要人工核验的地方。", "如果这三条写不出来，说明你不是在用 AI，而是在跟着 AI 走。"] },
    ],
  },
  {
    slug: "learning-to-become-a-learner",
    title: "我正在学习成为一个学习者",
    category: "表达成长",
    date: "2026.06.30",
    readingTime: "4 MIN READ",
    summary: "真正的成长，可能从停止急着证明自己已经懂了开始。",
    blocks: [
      { paragraphs: ["以前，我很容易进入“我知道”的状态。在会议里、对话里，甚至刚接触一件新事情时，我都想快点理解、快点给答案。", "但最近，我注意到一件有点不舒服的事：有时候，我越想快点给答案，其实越没有真正在听。"] },
      { heading: "给“不知道”留一点空间", paragraphs: ["也许，终身学习不是收集更多知识，而是保持足够长时间的开放，让自己真的能被听到的东西改变。", "所以现在，我在练习一件很简单的事：在解释之前，再问一个问题。在说“我知道”之前，留一点空间。"], quote: "Real growth may begin when I stop rushing to prove that I already know." },
    ],
  },
  {
    slug: "a-day-without-my-phone",
    title: "不带手机出门的一天",
    category: "生活手记",
    date: "2026.06.30",
    readingTime: "4 MIN READ",
    summary: "当我暂时离开手机，我重新看见了附近真实的人、店、价格和生活。",
    blocks: [
      { paragraphs: ["有一天早上，我故意把手机留在家里。只带了十块钱现金，就出门走走。没有手机，没有手表，也没有地图。", "一开始很不方便。不能查消息，不能手机支付，也不能导航。"] },
      { heading: "我开始注意到那些平时忽略的东西", paragraphs: ["墙上的招聘广告、一份旧报纸、一家小早餐店，还有一顿简单饭菜的价格。", "我甚至还迷了一点路，最后只好借别人的手机看看怎么回家。有一点尴尬，但也很好笑。"] },
      { heading: "方便的工具，也会改变我们看世界的宽度", paragraphs: ["这个小实验不是为了批判手机。只是当我暂时移除一个便利工具，才重新注意到真实生活中的许多细节。"], quote: "Sometimes removing one convenient tool helps me notice real life again." },
    ],
  },
];

function parseFrontmatter(source: string) {
  if (!source.startsWith("---")) return { data: {} as Record<string, string>, body: source };
  const end = source.indexOf("\n---", 3);
  if (end === -1) return { data: {} as Record<string, string>, body: source };
  const data: Record<string, string> = {};
  for (const line of source.slice(3, end).split("\n")) {
    const separator = line.indexOf(":");
    if (separator > 0) {
      data[line.slice(0, separator).trim()] = line
        .slice(separator + 1)
        .trim()
        .replace(/^['\"]|['\"]$/g, "");
    }
  }
  return { data, body: source.slice(end + 4).trim() };
}

function markdownToBlocks(markdown: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  let current: ArticleBlock = { paragraphs: [] };
  let paragraph: string[] = [];
  const flushParagraph = () => {
    if (paragraph.length) current.paragraphs.push(paragraph.join(" "));
    paragraph = [];
  };
  const flushBlock = () => {
    flushParagraph();
    if (current.heading || current.paragraphs.length || current.quote) blocks.push(current);
    current = { paragraphs: [] };
  };
  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trim();
    if (line.startsWith("# ")) continue;
    if (line.startsWith("## ")) {
      flushBlock();
      current.heading = line.slice(3).trim();
      continue;
    }
    if (line.startsWith("> ")) {
      flushParagraph();
      current.quote = line.slice(2).trim();
      continue;
    }
    if (!line) {
      flushParagraph();
      continue;
    }
    paragraph.push(
      line
        .replace(/^[-*]\s+/, "• ")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/`([^`]+)`/g, "$1"),
    );
  }
  flushBlock();
  return blocks;
}

function loadMarkdownArticles(): Article[] {
  const directory = path.join(process.cwd(), "content", "articles");
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((name) => name.endsWith(".md") && !name.startsWith("_"))
    .map((name) => {
      const source = fs.readFileSync(path.join(directory, name), "utf8");
      const { data, body } = parseFrontmatter(source);
      return {
        slug: data.slug || name.replace(/\.md$/, ""),
        title: data.title || name.replace(/\.md$/, ""),
        category: data.category || "思考手记",
        date: data.date || "",
        readingTime: data.readingTime || "5 MIN READ",
        summary:
          data.summary ||
          body.split("\n").find((line) => line.trim() && !line.startsWith("#"))?.trim() ||
          "",
        blocks: markdownToBlocks(body),
      };
    });
}

const merged = new Map(builtInArticles.map((article) => [article.slug, article]));
for (const article of loadMarkdownArticles()) merged.set(article.slug, article);
export const articles = Array.from(merged.values()).sort((a, b) => b.date.localeCompare(a.date));

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
