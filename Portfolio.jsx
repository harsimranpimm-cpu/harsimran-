import { useEffect, useState } from "react";
import { domAnimation, LazyMotion, m, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Digital marketing strategy",
  "SEO & organic growth",
  "Social media marketing",
  "Google Ads & PPC",
  "Meta Ads",
  "Content marketing",
  "Email marketing",
  "Analytics & reporting",
  "Conversion optimization",
];

const skills = [
  "SEO",
  "Google Analytics",
  "Google Ads",
  "Meta Ads",
  "Content strategy",
  "Email marketing",
  "Marketing automation",
  "Conversion optimization",
  "Keyword research",
  "Brand strategy",
  "Performance marketing",
];

const projects = [
  {
    number: "01",
    type: "Organic growth · SEO",
    title: "A search strategy built to compound.",
    image: "photo-1460925895917-afdab827c52f",
    imageAlt: "A bright desktop with a laptop and notebooks, representing a campaign planning workspace.",
    challenge: "A strong offer was difficult to discover. Organic visibility was scattered across high-intent searches.",
    strategy: "Reframe keyword research around customer intent, then map a useful content system to the buying journey.",
    execution: "Technical SEO, carefully structured landing pages, internal linking and a consistent editorial plan.",
    result: "+68%",
    resultLabel: "organic sessions",
    before: "Low search visibility",
    after: "More qualified discovery",
  },
  {
    number: "02",
    type: "Paid social · Meta Ads",
    title: "Less waste. Better conversations.",
    image: "photo-1531058020387-3be344556be6",
    imageAlt: "Colorful event installation representing a paid social campaign launch.",
    challenge: "A broad acquisition approach was producing clicks without enough qualified enquiries.",
    strategy: "Bring audience intent, creative testing and landing page relevance into one feedback loop.",
    execution: "Structured audience experiments, refreshed creative concepts and weekly budget reallocation.",
    result: "3.2×",
    resultLabel: "return on ad spend",
    before: "Unfocused acquisition",
    after: "More efficient lead flow",
  },
  {
    number: "03",
    type: "Brand · Content strategy",
    title: "A brand with something to say.",
    image: "photo-1490481651871-ab68de25d43d",
    imageAlt: "A considered fashion storefront, representing a brand and content strategy.",
    challenge: "Good products were being presented inconsistently across social channels and formats.",
    strategy: "Find the distinct point of view, then make every content pillar recognizable and repeatable.",
    execution: "Content architecture, channel-specific publishing, stronger creative direction and engagement review.",
    result: "+124%",
    resultLabel: "social engagement",
    before: "Inconsistent publishing",
    after: "A recognizable brand voice",
  },
  {
    number: "04",
    type: "Paid search · Google Ads",
    title: "Make every click earn its place.",
    image: "photo-1497366811353-6870744d04b2",
    imageAlt: "A modern workspace prepared for reviewing campaign performance.",
    challenge: "Search spend was spread across queries that did not reliably translate into new leads.",
    strategy: "Bring search intent, keyword control and landing page experience closer to conversion data.",
    execution: "Campaign restructuring, negative keyword reviews, cleaner conversion tracking and bid refinement.",
    result: "−31%",
    resultLabel: "cost per lead",
    before: "Rising acquisition cost",
    after: "More efficient lead generation",
  },
];

const milestones = [
  {
    number: "01",
    title: "Start with the signal.",
    detail: "Understand the audience, the offer and the numbers that describe a genuinely useful outcome.",
    tag: "Research · Measurement · Positioning",
  },
  {
    number: "02",
    title: "Build with intention.",
    detail: "Connect search, creative and paid channels to one clear strategy, with room to test the thinking.",
    tag: "Strategy · Campaigns · Content",
  },
  {
    number: "03",
    title: "Improve what works.",
    detail: "Turn performance into practical decisions. Scale what earns attention; change what does not.",
    tag: "Optimization · Reporting · Growth",
  },
];

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "hello@example.com";
const isEmailPlaceholder = contactEmail === "hello@example.com";

function ArrowIcon({ diagonal = false }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      {diagonal ? (
        <path d="M4 12 12 4M5 4h7v7" stroke="currentColor" strokeWidth="1.3" />
      ) : (
        <path d="M2 8h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.3" />
      )}
    </svg>
  );
}

function SectionHeading({ eyebrow, title, description, id }) {
  return (
    <div className="section-heading reveal" id={id}>
      <p className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;

    const context = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray("[data-count]").forEach((element) => {
        const target = Number(element.dataset.count);
        const suffix = element.dataset.suffix || "";
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
          onUpdate: () => {
            element.textContent = `${Math.round(counter.value).toLocaleString()}${suffix}`;
          },
        });
      });

      gsap.to(".hero-portrait", {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
    });

    return () => context.revert();
  }, [reduceMotion]);

  function handleContactSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry — ${formData.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`,
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setFormMessage(isEmailPlaceholder
      ? "Your email draft is ready. Set VITE_CONTACT_EMAIL to your real inbox before publishing."
      : "Your email draft is ready in your mail app.");
  }

  return (
    <LazyMotion features={domAnimation}>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Harsimran, back to top">H<span>.</span></a>
        <a className="header-note" href="#top">Independent digital marketing<br />India · Available worldwide</a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <span className={`menu-icon${menuOpen ? " is-open" : ""}`} aria-hidden="true"><i /><i /></span>
        </button>
        <nav id="primary-navigation" className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {[["About", "about"], ["Services", "services"], ["Work", "work"], ["Experience", "experience"]].map(([label, target]) => (
            <a key={target} href={`#${target}`} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let&apos;s talk <ArrowIcon diagonal /></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <m.p
              className="eyebrow hero-eyebrow"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="eyebrow-dot" />Strategy, with a point of view
            </m.p>
            <m.h1
              id="hero-title"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              Harsimran<span className="title-period">.</span>
            </m.h1>
            <m.p
              className="hero-role"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >Digital Marketing Specialist <span>/</span> Growth Strategist <span>/</span> Brand Builder</m.p>
            <m.p
              className="hero-intro"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >I help ambitious brands grow through performance marketing, SEO, considered content and data-led campaigns.</m.p>
            <m.div
              className="hero-actions"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
            >
              <a className="button button-primary" href="#work">Explore selected work <ArrowIcon /></a>
              <a className="text-link" href="#contact">Start a conversation <ArrowIcon diagonal /></a>
            </m.div>
            <p className="hero-index">01 <span>/</span> 06 <span className="index-line" />Scroll to explore</p>
          </div>
          <m.div
            className="hero-visual"
            initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(5% 0 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.1, delay: 0.2 }}
          >
            <div className="hero-image-frame">
              <img
                className="hero-portrait"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1100&q=85"
                alt="Editorial portrait image placeholder. Replace with Harsimran's professional portrait."
                fetchPriority="high"
              />
              <div className="portrait-gradient" />
              <p className="portrait-label"><span className="eyebrow-dot" />Portrait placeholder · replace before launch</p>
              <div className="portrait-caption"><span>Considered strategy.</span><span>Measurable growth.</span></div>
            </div>
            <span className="hero-visual-index" aria-hidden="true">INDEPENDENT PRACTICE&nbsp; · &nbsp;2026</span>
          </m.div>
          <div className="hero-vertical-note" aria-hidden="true">DIGITAL / STRATEGY / GROWTH</div>
        </section>

        <section className="results-strip" aria-label="Portfolio highlights">
          <div className="results-label reveal"><span className="eyebrow-dot" />Growth at a glance</div>
          <div className="result-item reveal"><strong data-count="100" data-suffix="+">100+</strong><span>Campaigns managed</span></div>
          <div className="result-item reveal"><strong data-count="5" data-suffix="M+">5M+</strong><span>Ad impressions</span></div>
          <div className="result-item reveal"><strong data-count="500" data-suffix="K+">500K+</strong><span>Website visits generated</span></div>
          <p className="results-note">Portfolio highlights · owner-provided figures</p>
        </section>

        <section className="about section-pad" id="about" aria-labelledby="about-title">
          <div className="about-intro">
            <SectionHeading eyebrow="The perspective" title={<>Growth should feel<br /><em>like your brand.</em></>} id="about-title" />
          </div>
          <div className="about-copy reveal">
            <p className="about-lead">A good marketing strategy does more than generate a number. It gives the right people a reason to remember you.</p>
            <p>I bring performance, search and content into the same conversation. That means starting with the people behind the data, building a clear point of view, and measuring the work against outcomes that matter to the business.</p>
            <p>No channel for the sake of a channel. No reporting that ends at a dashboard. Just thoughtful, accountable work that makes the next move clearer.</p>
            <a className="text-link" href="#experience">How I approach the work <ArrowIcon /></a>
          </div>
          <div className="about-statement reveal"><span className="statement-mark">“</span><p>Build a brand people remember.<br />Build a system that proves it.</p><span className="statement-credit">A working principle <span>— Harsimran</span></span></div>
        </section>

        <section className="services section-pad" id="services" aria-labelledby="services-title">
          <SectionHeading eyebrow="What I do" title={<>Strategy meets<br /><em>the full funnel.</em></>} description="The right mix of thinking and doing, shaped around the brief—not a preset channel list." id="services-title" />
          <div className="services-grid">
            {services.map((service, index) => (
              <m.div
                className="service-item"
                key={service}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
              >
                <span className="service-number">0{index + 1}</span><span className="service-name">{service}</span><ArrowIcon diagonal />
              </m.div>
            ))}
          </div>
        </section>

        <section className="work section-pad" id="work" aria-labelledby="work-title">
          <SectionHeading eyebrow="Selected thinking" title={<>Make the work<br /><em>work harder.</em></>} description="Four ways a clear strategy can turn marketing activity into more meaningful outcomes." id="work-title" />
          <p className="case-study-disclosure reveal">Illustrative case studies · concepts and sample metrics shown for presentation. Replace with approved client work and verified results.</p>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <m.article
                className={`project-card${index % 2 ? " project-offset" : ""}`}
                key={project.number}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: 0.08 }}
              >
                <div className="project-image-wrap">
                  <img
                    src={`https://images.unsplash.com/${project.image}?auto=format&fit=crop&w=1200&q=80`}
                    alt={project.imageAlt}
                    loading="lazy"
                  />
                  <span className="image-index">CASE STUDY&nbsp; / &nbsp;{project.number}</span>
                  <span className="image-arrow"><ArrowIcon diagonal /></span>
                  <span className="image-disclosure">Illustrative visual</span>
                </div>
                <div className="project-meta"><span>{project.type}</span><span>0{index + 1} — 04</span></div>
                <h3>{project.title}</h3>
                <div className="project-result"><strong>{project.result}</strong><span>{project.resultLabel}</span><span className="sample-label">Sample result</span></div>
                <div className="project-details">
                  {[["Challenge", project.challenge], ["Strategy", project.strategy], ["Execution", project.execution]].map(([label, text]) => (
                    <div className="project-detail" key={label}><span>{label}</span><p>{text}</p></div>
                  ))}
                </div>
                <div className="before-after"><div><span>Before</span><p>{project.before}</p></div><div><span>After</span><p>{project.after}</p></div></div>
              </m.article>
            ))}
          </div>
        </section>

        <section className="skills section-pad" id="skills" aria-labelledby="skills-title">
          <div className="skills-intro">
            <SectionHeading eyebrow="The toolkit" title={<>Fluent in the<br /><em>details.</em></>} description="A practical stack for understanding your audience, connecting the channels and making each next decision count." id="skills-title" />
          </div>
          <div className="skill-list reveal" aria-label="Marketing skills">
            {skills.map((skill, index) => <span className="skill-pill" key={skill}><span>{String(index + 1).padStart(2, "0")}</span>{skill}</span>)}
          </div>
        </section>

        <section className="experience section-pad" id="experience" aria-labelledby="experience-title">
          <SectionHeading eyebrow="Experience & approach" title={<>Good work is<br /><em>deliberate.</em></>} description="A clear path from understanding the opportunity to creating sustained momentum." id="experience-title" />
          <div className="timeline">
            {milestones.map((item) => (
              <m.article
                className="timeline-item"
                key={item.number}
                initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.55 }}
              >
                <span className="timeline-number">{item.number}</span>
                <div className="timeline-content"><p className="eyebrow">A considered process</p><h3>{item.title}</h3><p>{item.detail}</p><span className="timeline-tags">{item.tag}</span></div>
              </m.article>
            ))}
          </div>
          <div className="credentials-note reveal"><span className="eyebrow-dot" /><p>Education, certifications and named roles can be added here once verified details are available.</p></div>
        </section>

        <section className="testimonial section-pad" aria-labelledby="testimonial-title">
          <div className="testimonial-top">
            <SectionHeading eyebrow="Trust, over time" title={<>Good partnerships<br /><em>make better work.</em></>} id="testimonial-title" />
            <div className="testimonial-aside"><span className="quote-symbol">“</span><p>Client feedback belongs to the people who gave it. Add approved testimonials and company marks here when they are ready to share.</p><span className="testimonial-credit">CLIENT VOICES · PUBLISHED WITH PERMISSION</span></div>
          </div>
          <div className="trust-line"><span>Clear-eyed strategy</span><span>Thoughtful execution</span><span>Accountable reporting</span></div>
        </section>

        <section className="contact section-pad" id="contact" aria-labelledby="contact-title">
          <div className="contact-copy">
            <SectionHeading eyebrow="The next good thing" title={<>Let's make<br /><em>it meaningful.</em></>} description="Have a thoughtful brief or a growth challenge worth solving? I’d love to hear what you’re building." id="contact-title" />
            <div className="contact-details">
              <div><span className="eyebrow">Email</span><a href={`mailto:${contactEmail}`}>{contactEmail} <ArrowIcon diagonal /></a>{isEmailPlaceholder && <p className="config-note">Sample address · set VITE_CONTACT_EMAIL before launch</p>}</div>
              <div><span className="eyebrow">Based in</span><p>India <span>·</span> Working everywhere</p></div>
              <div><span className="eyebrow">Find me</span><div className="social-links"><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn <ArrowIcon diagonal /></a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <ArrowIcon diagonal /></a><a href="https://wa.me/" target="_blank" rel="noreferrer">WhatsApp <ArrowIcon diagonal /></a></div><p className="config-note">Add personal profile links before launch</p></div>
            </div>
          </div>
          <form className="contact-form reveal" onSubmit={handleContactSubmit}>
            <p className="eyebrow"><span className="eyebrow-dot" />Tell me a little about it</p>
            <label htmlFor="contact-name">Your name</label>
            <input id="contact-name" name="name" type="text" placeholder="Name" autoComplete="name" required />
            <label htmlFor="contact-email">Email address</label>
            <input id="contact-email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required />
            <label htmlFor="contact-message">What are you working on?</label>
            <textarea id="contact-message" name="message" placeholder="A little about the challenge, the ambition, or the thing you can’t stop thinking about…" rows="4" required />
            <button className="button button-primary form-submit" type="submit">Prepare an enquiry <ArrowIcon /></button>
            <p className="form-privacy">Opens a draft in your email app. Your message stays yours.</p>
            <p className="form-status" role="status" aria-live="polite">{formMessage}</p>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark footer-mark" href="#top" aria-label="Harsimran, back to top">H<span>.</span></a>
        <p>Independent by nature.<br />Intentional by design.</p>
        <a href="#top" className="back-to-top">Back to the beginning <ArrowIcon diagonal /></a>
        <span className="footer-copyright">© {new Date().getFullYear()} Harsimran</span>
      </footer>
    </LazyMotion>
  );
}

export default Portfolio;