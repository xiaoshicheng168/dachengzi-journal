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

const notes = [
  { date: "JUL 2026", title: "如何让 AI 真正成为思考搭档", kind: "AI 共创" },
  { date: "JUN 2026", title: "一个医药商业问题，如何被重新讲清楚", kind: "行业观察" },
  { date: "MAY 2026", title: "从紧张到真诚：我的舞台表达手记", kind: "表达练习" },
];

export default function Home() {
  return (
    <main>
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
        </nav>
      </header>

      <section className="hero" id="top">
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
            <div className="seal" aria-hidden="true"><span>真诚</span><span>·</span><span>共创</span></div>
            <p className="index-label">IN THIS ISSUE</p>
            <a href="#about"><em>01</em><span>从真实经历出发</span><b>→</b></a>
            <a href="#work"><em>02</em><span>三件正在做的事</span><b>→</b></a>
            <a href="#notes"><em>03</em><span>最近的思考与作品</span><b>→</b></a>
          </aside>
        </div>
        <p className="edition">SHANGHAI · 2026 — A LIVING ARCHIVE OF IDEAS &amp; PRACTICE</p>
      </section>

      <section className="about" id="about">
        <div className="section-meta"><span>PROFILE</span><span>01 / 04</span></div>
        <div className="about-grid">
          <h2>我更关心<br />“人如何发生改变”</h2>
          <div className="about-copy">
            <p className="dropcap">过去的经历让我长期站在几个世界的交界处：医药商业的专业与现实，AI 带来的新工具与新问题，以及每一个人在表达中的不安与成长。</p>
            <p>我喜欢把散落的线索连起来，找到事情背后的结构，再用一种更容易理解的方式讲出来。不是为了显得聪明，而是为了让对话可以继续，让行动真正发生。</p>
          </div>
        </div>
      </section>

      <section className="work" id="work">
        <div className="section-meta"><span>CURRENT PRACTICE</span><span>02 / 04</span></div>
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
        <div className="section-meta"><span>RECENT NOTES</span><span>03 / 04</span></div>
        <div className="notes-grid">
          <div className="notes-intro"><p className="eyebrow">持续写，持续想</p><h2>近期<br /><i>作品</i></h2><p>这里是一些还在生长的答案。</p></div>
          <div className="note-list">
            {notes.map((note, index) => (
              <a href="#contact" key={note.title}>
                <span className="note-date">{note.date}</span>
                <span className="note-title"><small>{note.kind}</small>{note.title}</span>
                <span className="note-index">0{index + 1} ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="section-meta"><span>LET’S CONNECT</span><span>04 / 04</span></div>
        <div className="contact-inner">
          <p className="contact-kicker">如果你也在思考 AI、医药商业或表达成长——</p>
          <h2>欢迎来找我<br /><i>聊一聊。</i></h2>
          <a className="contact-link" href="mailto:834455850@qq.com">834455850@qq.com <span>↗</span></a>
          <p className="contact-note">微信公众号：<span>心想世程</span></p>
        </div>
      </section>

      <footer><span>© 2026 大橙子🍊</span><span>MADE WITH CURIOSITY &amp; CARE</span><a href="#top">回到顶部 ↑</a></footer>
    </main>
  );
}
