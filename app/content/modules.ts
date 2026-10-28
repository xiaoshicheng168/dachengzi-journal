/**
 * 站点模块（一级分类）与内容类型（横向维度）。
 *
 * 模块对应持续产出内容的工作主线：每周自动化产出的新内容按 module 归档，
 * 页面（首页模块网格、/modules、/modules/[slug]）全部从这里读，新增模块只需加一条配置。
 */

export type ContentTypeKey = "design" | "thinking" | "method" | "review";

export type ContentType = {
  key: ContentTypeKey;
  label: string;
  en: string;
};

export const contentTypes: ContentType[] = [
  { key: "design", label: "设计作品", en: "DESIGN" },
  { key: "thinking", label: "思考手记", en: "THINKING" },
  { key: "method", label: "方法卡", en: "METHOD" },
  { key: "review", label: "周复盘", en: "REVIEW" },
];

const contentTypeMap = new Map(contentTypes.map((item) => [item.key, item]));

export function contentTypeLabel(key: string | undefined): string {
  return contentTypeMap.get(key as ContentTypeKey)?.label ?? "手记";
}

export function contentTypeEn(key: string | undefined): string {
  return contentTypeMap.get(key as ContentTypeKey)?.en ?? "NOTE";
}

export type SiteModule = {
  key: string;
  number: string;
  name: string;
  en: string;
  accent: string;
  copy: string;
  /** 更新节奏，用于模块页与卡片计数旁 */
  cadence: string;
  /** 是否出现在首页模块网格（次级模块只在 /modules 出现） */
  primary: boolean;
};

export const modules: SiteModule[] = [
  {
    key: "ai-brain",
    number: "01",
    name: "AI 外脑",
    en: "AI BRAIN",
    accent: "#b23a1f",
    copy: "把 AI 变成能一起思考、整理和创造的长期伙伴。",
    cadence: "每周日自动更新",
    primary: true,
  },
  {
    key: "biz-enablement",
    number: "02",
    name: "招商赋能",
    en: "ENABLEMENT",
    accent: "#2f6f4f",
    copy: "把招商经验沉淀成可复用的流程与方法卡。",
    cadence: "每月沉淀",
    primary: true,
  },
  {
    key: "club-ops",
    number: "03",
    name: "俱乐部运营",
    en: "CLUB OPS",
    accent: "#1f6f8b",
    copy: "用 Toastmasters 把表达训练变成日常。",
    cadence: "每周例会",
    primary: true,
  },
  {
    key: "pharma-orange",
    number: "04",
    name: "医药橙子",
    en: "PHARMA",
    accent: "#b5651d",
    copy: "穿过专业术语，找到真正影响决策的人。",
    cadence: "不定期",
    primary: true,
  },
  {
    key: "stock-trading",
    number: "05",
    name: "股票交易",
    en: "TRADING",
    accent: "#5b4b8a",
    copy: "用纪律和复盘，记录交易里的认知迭代。",
    cadence: "交易日",
    primary: true,
  },
  {
    key: "life-notes",
    number: "06",
    name: "生活手记",
    en: "LIFE NOTES",
    accent: "#6e7864",
    copy: "不属于任何主线的零散记录，但同样真实。",
    cadence: "随手记",
    primary: false,
  },
];

const moduleMap = new Map(modules.map((item) => [item.key, item]));

export function getModule(key: string | undefined): SiteModule | undefined {
  return key ? moduleMap.get(key) : undefined;
}

/** 首页模块网格只显示主线模块 */
export const primaryModules = modules.filter((item) => item.primary);

/** 文章缺 module 时的兜底：先按原 category 映射，再落到生活手记 */
const categoryFallback: Record<string, { module: string; type: ContentTypeKey }> = {
  "AI 共创": { module: "ai-brain", type: "thinking" },
  "AI 观察": { module: "ai-brain", type: "thinking" },
  医药实践: { module: "pharma-orange", type: "method" },
  表达成长: { module: "club-ops", type: "thinking" },
  个人故事: { module: "life-notes", type: "thinking" },
  生活手记: { module: "life-notes", type: "thinking" },
};

export function fallbackFor(category: string): { module: string; type: ContentTypeKey } {
  return categoryFallback[category] ?? { module: "life-notes", type: "thinking" };
}
