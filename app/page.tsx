import Link from "next/link";
import { articles } from "./content/articles";
import { siteUrl, siteDescription, authorName } from "./content/site";

const NOTE_MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

function formatNoteDate(date: string) {
  const [year, month] = date.split(".");
  return year && month ? `${NOTE_MONTHS[Number(month) - 1]} ${year}` : date;
}

const notes = articles.slice(0, 3).map((article) => ({
  date: formatNoteDate(article.date),
  title: article.title,
  kind: article.category,
  href: `/articles/${article.slug}`,
}));

const work = [
  {
    number: "01",
    title: "AI 共创与知识生产",
    copy: "把 AI 变成可以一起思考、整理和创造的长期伙伴。",
    tag: "CO-CREATION",
  },
  {
    number: "02",
    title: "医药商业观察",
    copy: "穿过专业术语和业务数字，找到真正影响决策的人与问题。",
    tag: "PHARMA",
  },
  {
    number: "03",
    title: "表达成长实践",
    copy: "从一次演讲、一段对话开始，练习更清晰、更真诚的表达。",
    tag: "EXPRESSION",
  },
];

const socialLinks = [
  { label: "抖音", note: "DOUYIN", href: "" },
  { label: "TikTok", note: "GLOBAL", href: "" },
  { label: "微信公众号", note: "心想世程", href: "" },
  { label: "小红书", note: "REDNOTE", href: "" },
  { label: "视频号", note: "WECHAT VIDEO", href: "" },
  { label: "Instagram", note: "VISUAL STORIES", href: "" },
  { label: "Facebook", note: "GLOBAL COMMUNITY", href: "" },
  { label: "WhatsApp", note: "DIRECT MESSAGE", href: "" },
];

export default function Home() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: authorName,
    alternateName: "Dachengzi",
    url: siteUrl,
    description: siteDescription,
    email: "mailto:834455850@qq.com",
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="ink-rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="9" />
          </filter>
        </defs>
      </svg>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="大橙子首页">
          <span>大橙子🍊</span>
          <small>DACHENGZI</small>
        </a>
        <nav aria-label="主导航">
          <a href="#about">关于我</a>
          <a href="#work">我在做的事</a>
          <a href="#notes">近期作品</a>
          <a href="#contact">联系我</a>
          <a href="#socials">社交主页</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <svg className="ink-circle" viewBox="0 0 400 400" aria-hidden="true">
          <circle cx="200" cy="200" r="148" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeDasharray="790 140" transform="rotate(-65 200 200)" filter="url(#ink-rough)" />
        </svg>
        <span className="hero-vertical" aria-hidden="true">把真实的经验，变成可以行动的方法</span>
        <div className="hero-kicker">
          <span>PERSONAL JOURNAL</span><span>NO. 001</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">AI 共创者 · 医药商业观察者 · 表达成长实践者</p>
            <h1>把复杂的事<br />讲清楚<span className="dot">。</span></h1>
            <p className="hero-lead">我是大橙子🍊。我相信，真实的经验值得被好好整理，复杂的知识也能变成可以行动的方法。</p>
            <a className="text-link" href="#about">读读我的故事 <span>↘</span></a>
          </div>
          <aside className="hero-index" aria-label="网站目录">
            <div className="seal" aria-hidden="true"><span>真诚</span><span>共创</span></div>
            <p className="index-label">IN THIS ISSUE</p>
            <a href="#about"><em>01</em><span>从真实经历出发</span><b>→</b></a>
            <a href="#work"><em>02</em><span>三件正在做的事</span><b>→</b></a>
            <a href="#notes"><em>03</em><span>最近的思考与作品</span><b>→</b></a>
          </aside>
        </div>
        <p className="edition">SHANGHAI · 2026 — A LIVING ARCHIVE OF IDEAS &amp; PRACTICE</p>
      </section>

      <section className="about" id="about">
        <span className="ghost-num" aria-hidden="true">01</span>
        <div className="section-meta"><span>PROFILE</span><span>01 / 05</span></div>
        <div className="about-grid">
          <h2>我更关心<br />“人如何发生改变”</h2>
          <div className="about-copy">
            <p className="dropcap">过去的经历让我长期站在几个世界的交界处：医药商业的专业与现实，AI 带来的新工具与新问题，以及每一个人在表达中的不安与成长。</p>
            <p>我喜欢把散落的线索连起来，找到事情背后的结构，再用一种更容易理解的方式讲出来。不是为了显得聪明，而是为了让对话可以继续，让行动真正发生。</p>
          </div>
        </div>
      </section>

      <section className="work" id="work">
        <span className="ghost-num" aria-hidden="true">02</span>
        <div className="section-meta"><span>CURRENT PRACTICE</span><span>02 / 05</span></div>
        <div className="section-heading">
          <h2>我在做的事</h2>
          <p>三条线索，最后都回到同一件事：<br />帮助人看见问题，也看见自己。</p>
        </div>
        <div className="work-list">
          {work.map((item) => (
            <article key={item.number}>
              <span className="work-number">{item.number}</span>
              <div><p className="work-tag">{item.tag}</p><h3>{item.title}</h3></div>
              <p>{item.copy}</p>
              <span className="work-arrow" aria-hidden="true">↘</span>
            </article>
          ))}
        </div>
      </section>

      <section className="notes" id="notes">
        <span className="ghost-num" aria-hidden="true">03</span>
        <div className="section-meta"><span>RECENT NOTES</span><span>03 / 05</span></div>
        <div className="notes-grid">
          <div className="notes-intro"><p className="eyebrow">持续写，持续想</p><h2>近期<br /><i>作品</i></h2><p>这里是一些还在生长的答案。</p></div>
          <div className="note-list">
            {notes.map((note, index) => (
              <Link href={note.href} key={note.title}>
                <span className="note-date">{note.date}</span>
                <span className="note-title"><small>{note.kind}</small>{note.title}</span>
                <span className="note-index">0{index + 1} ↗</span>
              </Link>
            ))}
            <Link className="all-articles" href="/articles">查看全部文章 <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <span className="ghost-num" aria-hidden="true">04</span>
        <svg className="ink-circle" viewBox="0 0 400 400" aria-hidden="true">
          <circle cx="200" cy="200" r="148" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeDasharray="760 170" transform="rotate(30 200 200)" filter="url(#ink-rough)" />
        </svg>
        <div className="section-meta"><span>LET’S CONNECT</span><span>04 / 05</span></div>
        <div className="contact-inner">
          <p className="contact-kicker">如果你也在思考 AI、医药商业或表达成长——</p>
          <h2>欢迎来找我<br /><i>聊一聊。</i></h2>
          <a className="contact-link" href="mailto:834455850@qq.com">834455850@qq.com <span>↗</span></a>
          <p className="contact-note">微信公众号：<span>心想世程</span></p>
        </div>
      </section>

      <section className="social-strip" id="socials">
        <span className="ghost-num" aria-hidden="true">05</span>
        <div className="social-strip-heading">
          <div><small>FOLLOW DACHENGZI</small><h2>在更多地方，找到大橙子🍊</h2></div>
          <span>05 / 05</span>
        </div>
        <div className="social-links" aria-label="大橙子的社交媒体主页">
          {socialLinks.map((item, index) => item.href ? (
            <a href={item.href} key={item.label} target="_blank" rel="noreferrer">
              <em>0{index + 1}</em><span><small>{item.note}</small>{item.label}</span><b>↗</b>
            </a>
          ) : (
            <span className="social-link-pending" key={item.label} title="链接待补充">
              <em>0{index + 1}</em><span><small>{item.note}</small>{item.label}</span><b>·</b>
            </span>
          ))}
        </div>
      </section>

      <footer><span>© 2026 大橙子🍊</span><span>MADE WITH CURIOSITY &amp; CARE</span><a href="#top">回到顶部 ↑</a></footer>
    </main>
  );
}
