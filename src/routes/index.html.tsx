import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState, ReactNode } from "react";
import { motion } from "framer-motion";

const ChipBackground = lazy(() =>
  import("@/components/ChipBackground").then((m) => ({ default: m.ChipBackground })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aspiring Information Engineer — TUM Applicant Portfolio" },
      { name: "description", content: "Grade 12 student from Indonesia applying to Information Engineering at the Technical University of Munich. Projects, skills, and academic background." },
      { property: "og:title", content: "Aspiring Information Engineer — TUM Applicant Portfolio" },
      { property: "og:description", content: "Grade 12 student applying to Information Engineering at TUM. Projects in Python, web development, and systems thinking." },
    ],
  }),
  component: Home,
});

const NAV = [
  { id: "about", label: "About" },
  { id: "academics", label: "Academics" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "goals", label: "Goals" },
  { id: "contact", label: "Contact" },
];

/* Custom Premium Scroll Reveal Controller with Cyber Glitch Dynamics */
interface ScrollAnimateProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

function ScrollAnimate({
  children,
  delay = 0,
  direction = "up",
  distance = 30,
}: ScrollAnimateProps) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  // State to trigger a brief, crisp glitch class overlay on reveal
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction],
        scale: direction === "none" ? 0.98 : 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.12 }}
      onViewportEnter={() => {
        // Trigger a sharp 400ms glitch slice when the component enters view
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 400);
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Crisp engineering deceleration curve
      }}
      className={isGlitching ? "animate-matrix-glitch" : ""}
    >
      {children}
    </motion.div>
  );
}

/* Technical Text Glitch / Decrypt Effect Component */
function GlitchText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "X01_█▓░##//_IE_TUM";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration || letter === " ") return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2; // Speed of alphanumeric resolution
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className="font-mono tracking-wide">{displayText}</span>;
}

function Home() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#fafafa] dark:bg-[#03050a] text-slate-900 dark:text-foreground transition-colors duration-500 overflow-x-hidden">
      {mounted && (
        <Suspense fallback={null}>
          <ChipBackground isDarkMode={isDark} />
        </Suspense>
      )}
      
      <Header isDark={isDark} setIsDark={setIsDark} />

      <div className="relative z-10 w-full max-w-7xl mx-auto min-h-screen flex flex-col px-4 sm:px-6 md:px-8">
        <main className="grow">
          <Hero />
          <About />
          <Academics />
          <Skills />
          <Projects />
          <Experience />
          <Goals />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

interface HeaderProps {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
}

function Header({ isDark, setIsDark }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 backdrop-blur-md ${
        scrolled 
          ? "border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-[#03050a]/80" 
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl w-full items-center justify-between px-4 sm:px-6 md:px-8 py-4">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm font-medium">
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-accent" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <span>portfolio<span className="text-muted-foreground">.ie</span></span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-sm text-slate-600 dark:text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-sm border border-border p-2 text-slate-600 dark:text-muted-foreground transition hover:text-foreground"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="rounded-sm border border-border p-2 md:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-rule bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 gap-2">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-slate-600 dark:text-muted-foreground hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative w-full overflow-hidden border-b border-rule">
      <div className="absolute inset-0 w-full h-full grid-bg opacity-40" aria-hidden />
      <div className="relative w-full py-16 md:py-24 lg:py-28">
        <ScrollAnimate direction="up" distance={15} delay={0.1}>
          <p className="eyebrow font-mono text-accent">
            [SYS_INIT] · TUM Applicant · Information Engineering
          </p>
        </ScrollAnimate>
        
        <ScrollAnimate direction="up" distance={25} delay={0.25}>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-7xl">
            Aspiring Information<br />
            <span className="text-accent text-glow animate-pulse-glow">Engineer.</span>
          </h1>
        </ScrollAnimate>

        <ScrollAnimate direction="up" distance={25} delay={0.35}>
          <p className="mt-6 max-w-2xl text-base text-slate-600 dark:text-muted-foreground md:text-lg font-light">
            A Grade 12 student from Indonesia building software, learning systems, and
            preparing to study Information Engineering at the Technical University of Munich.
            Focused on the intersection of code, data, and real-world problem solving.
          </p>
        </ScrollAnimate>

        <ScrollAnimate direction="up" distance={20} delay={0.45}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-sm bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90 font-mono"
            >
              EXEC_PROJECTS <ArrowIcon />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-background px-5 py-2.5 text-sm font-medium transition hover:bg-surface font-mono"
            >
              CONNECT
            </a>
          </div>
        </ScrollAnimate>

        <ScrollAnimate direction="up" distance={20} delay={0.55}>
          <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-rule pt-8 sm:grid-cols-4">
            {[
              { k: "Location", v: "Bandung, ID" },
              { k: "Target", v: "TUM Munich" },
              { k: "Field", v: "Info. Eng." },
              { k: "Languages", v: "EN · DE A1" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="eyebrow">{s.k}</dt>
                <dd className="mt-1 font-mono text-sm text-slate-900 dark:text-white/80">{s.v}</dd>
              </div>
            ))}
          </dl>
        </ScrollAnimate>
      </div>
    </section>
  );
}

function SectionHeader({ num, eyebrow, title }: { num: string; eyebrow: string; title: string }) {
  const [insideView, setInsideView] = useState(false);

  return (
    <motion.div 
      onViewportEnter={() => setInsideView(true)}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="mb-12 flex w-full items-end justify-between border-b border-rule pb-4">
        <div>
          <p className="eyebrow font-mono">// {eyebrow.toUpperCase()}</p>
          <h2 className="mt-2 font-serif text-3xl text-slate-900 dark:text-white md:text-4xl min-h-10">
            {insideView ? <GlitchText text={title} /> : title}
          </h2>
        </div>
        <span className="font-mono text-xs text-slate-400 dark:text-muted-foreground/60">§ CODE_{num}</span>
      </div>
    </motion.div>
  );
}

function About() {
  return (
    <section id="about" className="section-pad border-b border-rule">
      <div className="w-full">
        <SectionHeader num="01" eyebrow="About" title="About me" />
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7 space-y-5 text-base leading-relaxed text-slate-700 dark:text-foreground/90 font-light">
            <ScrollAnimate direction="up" delay={0.1}>
              <p>
                I'm a Grade 12 student from Indonesia preparing to study{" "}
                <strong className="font-semibold text-slate-900 dark:text-white">Information Engineering</strong> at the
                Technical University of Munich. My interest sits at the boundary between
                software and the physical systems it controls — how data moves, how
                processes connect, and how small pieces of code translate into real-world
                outcomes.
              </p>
            </ScrollAnimate>
            <ScrollAnimate direction="up" delay={0.15}>
              <p>
                Most of what I know I taught myself, starting with Python in school and
                expanding into web development through projects. I'm drawn to{" "}
                <strong className="font-semibold text-slate-900 dark:text-white">software systems, data structures,
                and applied problem solving</strong> — the kind of work that requires
                both rigor and creativity.
              </p>
            </ScrollAnimate>
            <ScrollAnimate direction="up" delay={0.2}>
              <p>
                Outside coursework, I co-founded a small custom clothing business with
                friends. I built the website, the order intake flow, and the email
                automation around it. The technical part was modest; the lesson was
                not — I learned what it means to ship something real that other people
                depend on.
              </p>
            </ScrollAnimate>
          </div>
          
          <aside className="md:col-span-5">
            <ScrollAnimate direction="up" delay={0.15}>
              <div className="rounded-sm border border-rule bg-surface p-6 backdrop-blur-sm">
                <p className="eyebrow font-mono text-accent">METADATA_INDEX</p>
                <ul className="mt-4 space-y-3 text-sm">
                  {[
                    ["Status", "Grade 12 student, applying 2026"],
                    ["Focus", "Software systems & data"],
                    ["Building", "Custom clothing platform"],
                    ["Learning", "German (A1), algorithms"],
                    ["Reading", "Designing Data-Intensive Apps"],
                  ].map(([k, v]) => (
                    <li key={k} className="flex items-baseline justify-between gap-4 border-b border-rule/60 pb-2 last:border-0 last:pb-0">
                      <span className="eyebrow">{k}</span>
                      <span className="text-right font-mono text-xs text-slate-900 dark:text-foreground">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimate>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Academics() {
  const subjects = ["Mathematics", "Physics", "Programming", "English"];
  const langs = [
    { lang: "Indonesian", level: "Native", pct: 100 },
    { lang: "English", level: "Intermediate", pct: 88 },
    { lang: "German", level: "A1 — In progress", pct: 22 },
  ];
  return (
    <section id="academics" className="section-pad border-b border-rule">
      <div className="w-full">
        <SectionHeader num="02" eyebrow="Education" title="Academic background" />
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <ScrollAnimate direction="up" delay={0.1}>
              <div className="rounded-sm border border-rule bg-background/50 backdrop-blur-sm">
                <div className="flex flex-wrap items-baseline justify-between border-b border-rule p-5 gap-2">
                  <div>
                    <p className="font-mono text-xs text-slate-500 dark:text-muted-foreground">Senior High School</p>
                    <h3 className="mt-1 font-serif text-xl text-slate-900 dark:text-white">Grade 12 · International Stream</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-muted-foreground">Jakarta, Indonesia</p>
                  </div>
                  <span className="font-mono text-xs text-slate-500 dark:text-muted-foreground">2023 — 2026</span>
                </div>
                <div className="p-5">
                  <p className="eyebrow mb-3">Core subjects</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {subjects.map((s) => (
                      <div key={s} className="rounded-sm border border-rule bg-surface px-3 py-2 text-center font-mono text-xs text-slate-800 dark:text-foreground hover:border-accent/40 transition-colors duration-300">
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimate>
          </div>
          
          <div className="md:col-span-5">
            <ScrollAnimate direction="up" delay={0.15}>
              <p className="eyebrow mb-4">Languages</p>
              <ul className="space-y-5">
                {langs.map((l) => (
                  <li key={l.lang}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium text-slate-800 dark:text-foreground">{l.lang}</span>
                      <span className="font-mono text-xs text-slate-500 dark:text-muted-foreground">{l.level}</span>
                    </div>
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-surface">
                      <div className="h-full bg-slate-900 dark:bg-accent animate-pulse-glow" style={{ width: `${l.pct}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollAnimate>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const groups = [
    { label: "Programming", items: ["Python", "HTML", "CSS", "JavaScript"] },
    { label: "Tools", items: ["Git & GitHub", "VS Code", "Netbean", "MySQL"] },
    { label: "Concepts", items: ["Algorithms", "OOP", "System thinking", "Problem solving"] },
  ];
  return (
    <section id="skills" className="section-pad border-b border-rule">
      <div className="w-full">
        <SectionHeader num="03" eyebrow="Toolkit" title="Skills & Frameworks" />
        <div className="grid gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-3">
          {groups.map((g, index) => (
            <ScrollAnimate key={g.label} direction="up" delay={index * 0.08}>
              <div className="bg-background p-6 h-full transition-colors duration-300 hover:bg-surface/50">
                <p className="eyebrow font-mono text-accent">{g.label.toUpperCase()}</p>
                <ul className="mt-4 space-y-2">
                  {g.items.map((i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-800 dark:text-foreground/90 font-light">
                      <span className="font-mono text-xs text-slate-400 dark:text-muted-foreground">›</span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    title: "Custom Clothing Business Website",
    summary: "Online storefront with custom order intake and automated email confirmations for a clothing brand I co-founded.",
    tech: ["HTML", "CSS", "JavaScript", "EmailJS"],
    learned: "Translating a real business workflow into a structured order system; handling user input, validation, and async email delivery.",
    status: "Live",
    image: "/images/Vellaureimg.png",
  },
  {
    title: "Python Utility Suite",
    summary: "A bundle of small command-line tools — calculator, unit converter, and number guessing game — built to practice control flow and modular design.",
    tech: ["Python", "argparse"],
    learned: "Writing readable functions, separating logic from I/O, and packaging multiple scripts under one entry point.",
    status: "Complete",
    image: "/images/clothing-site.png",
  },
  {
    title: "Student Management System",
    summary: "OOP project modeling students, courses, and grades with persistent JSON storage and a simple CLI interface.",
    tech: ["Python", "OOP", "JSON"],
    learned: "Designing classes around real-world entities, using inheritance carefully, and serializing state to disk.",
    status: "Complete",
    image: "/images/clothing-site.png",
  },
  {
    title: "Arduino Environment Monitor",
    summary: "Planned IoT project: read temperature and humidity from sensors and stream data to a small dashboard.",
    tech: ["Arduino", "C++", "MQTT"],
    learned: "Bridging embedded hardware with network protocols — the kind of full-stack systems work Information Engineering centers on.",
    status: "Planned",
    image: "/images/clothing-site.png",
  },
];

function Projects() {
  return (
    <section id="projects" className="section-pad border-b border-rule">
      <div className="w-full">
        <SectionHeader num="04" eyebrow="Selected work" title="Systems Engineering Projects" />
        <div className="grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ScrollAnimate key={p.title} direction="up" delay={(i % 2) * 0.1}>
              <article className="group flex flex-col h-full overflow-hidden rounded-sm border border-rule bg-background transition-all duration-300 hover:border-accent/40 backdrop-blur-sm">
                
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden border-b border-rule bg-surface">
                  {p.image ? (
                    <img 
                      src={p.image} 
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    /* Fallback to your grid background if no image is provided */
                    <div className="absolute inset-0 grid-bg flex items-center justify-center">
                      <div className="rounded-sm border border-rule bg-background/80 px-3 py-1 font-mono text-[11px] text-slate-500 dark:text-muted-foreground backdrop-blur">
                        LOG_RECON_{String(i + 1).padStart(2, "0")}.TSX
                      </div>
                    </div>
                  )}
                  
                  {/* Status Badge Overlaid on top */}
                  <span className="absolute right-3 top-3 z-10 rounded-sm border border-accent/20 bg-background/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent backdrop-blur-sm">
                    {p.status}
                  </span>
                </div>

                {/* Content Container */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-xl text-slate-900 dark:text-white group-hover:text-accent transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-muted-foreground font-light">{p.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-sm border border-rule bg-surface/40 px-2 py-0.5 font-mono text-[11px] text-slate-800 dark:text-foreground/80">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="border-t border-rule pt-4 mt-auto">
                    <p className="eyebrow font-mono text-[11px]">COMPILE_LESSON_LOG</p>
                    <p className="mt-2 text-sm text-slate-700 dark:text-foreground/90 font-light">{p.learned}</p>
                  </div>
                </div>

              </article>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    {
      role: "Co-founder & Developer",
      org: "Custom clothing startup",
      time: "2025 — Present",
      body: "Co-founded a small custom clothing brand with friends. Built and maintain the website, order intake flow, and email automation. Handle the technical operations end-to-end.",
    },
    {
      role: "Head of Business Club",
      org: "School activities",
      time: "2025 — Present",
      body: "One of the school head business group. Participate in business challenges and mentor younger students taking their first steps toward business.",
    },
    {
      role: "Community Volunteer",
      org: "Local outreach",
      time: "2024 — Present",
      body: "Volunteered with a community program supporting local youth, helping organize sessions and educating younger children.",
    },
  ];
  return (
    <section id="experience" className="section-pad border-b border-rule">
      <div className="w-full">
        <SectionHeader num="05" eyebrow="Activities" title="Experience" />
        <ol className="relative space-y-10 border-l border-rule pl-6 md:pl-8">
          {items.map((it, index) => (
            <li key={it.role} className="relative">
              <ScrollAnimate direction="up" delay={index * 0.08}>
                <span className="absolute -left-9.75 md:-left-11.25 top-1.5 h-3 w-3 rounded-full border border-rule bg-background z-20 transition-colors duration-300 group-hover:border-accent" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-xl text-slate-900 dark:text-white">{it.role}</h3>
                  <span className="font-mono text-xs text-slate-400 dark:text-muted-foreground/60">{it.time}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500 dark:text-muted-foreground font-mono">{it.org}</p>
                <p className="mt-3 max-w-2xl text-sm text-slate-700 dark:text-foreground/90 font-light">{it.body}</p>
              </ScrollAnimate>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Goals() {
  const goals = [
    { n: "01", t: "Study at TUM", d: "Pursue a Bachelor's in Information Engineering at the Technical University of Munich starting 2026." },
    { n: "02", t: "Build systems expertise", d: "Develop deep knowledge in software architecture, data engineering, and intelligent systems." },
    { n: "03", t: "Apply it", d: "Contribute to engineering solutions that solve real problems — in industry, research, or my own ventures." },
  ];
  return (
    <section id="goals" className="section-pad border-b border-rule">
      <div className="w-full">
        <SectionHeader num="06" eyebrow="Trajectory" title="Future Roadmap" />
        <div className="grid gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-3">
          {goals.map((g, index) => (
            <ScrollAnimate key={g.n} direction="up" delay={index * 0.08}>
              <div className="bg-background p-7 h-full hover:bg-surface/30 transition-colors duration-300">
                <p className="font-mono text-xs text-accent">#00{g.n}</p>
                <h3 className="mt-3 font-serif text-xl text-slate-900 dark:text-white">{g.t}</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-muted-foreground font-light">{g.d}</p>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio contact — ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
  };
  return (
    <section id="contact" className="section-pad">
      <div className="w-full">
        <SectionHeader num="07" eyebrow="Get in touch" title="System Communication Hub" />
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <ScrollAnimate direction="up" delay={0.05}>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-slate-700 dark:text-foreground/90 font-light">
                  Open for academic inquiries, portfolio evaluations, and technical feedback regarding my engineering path toward TUM.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex flex-wrap items-center gap-2">
                    <span className="eyebrow w-20 font-mono">COM_EMAIL</span>
                    <a href="mailto:reagan9180@gmail.com" className="font-mono text-slate-900 dark:text-foreground hover:text-accent break-all text-xs">
                      reagan9180@gmail.com
                    </a>
                  </li>
                  <li className="flex flex-wrap items-center gap-2">
                    <span className="eyebrow w-20 font-mono">SYS_GIT</span>
                    <a href="https://github.com/reagan9180-prog" target="_blank" rel="noreferrer" className="font-mono text-slate-900 dark:text-foreground hover:text-accent break-all text-xs">
                      github.com/reagan9180-prog
                    </a>
                  </li>
                  <li className="flex flex-wrap items-center gap-2">
                    <span className="eyebrow w-20 font-mono">LOC_NODE</span>
                    <span className="font-mono text-slate-900 dark:text-foreground text-xs">Bandung, West Java, ID</span>
                  </li>
                </ul>
              </div>
            </ScrollAnimate>
          </div>
          
          <div className="md:col-span-7">
            <ScrollAnimate direction="up" delay={0.1}>
              <form onSubmit={onSubmit} className="space-y-4 rounded-sm border border-rule bg-surface p-6 backdrop-blur-sm">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field name="name" label="Name" required />
                  <Field name="email" label="Email" type="email" required />
                </div>
                <Field name="message" label="Message" textarea required />
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p className="font-mono text-[11px] text-slate-500 dark:text-muted-foreground/60">
                    Sends via native system protocol
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-sm bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90 w-full sm:w-auto justify-center font-mono"
                  >
                    TRANSMIT_MSG <ArrowIcon />
                  </button>
                </div>
              </form>
            </ScrollAnimate>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name, label, type = "text", textarea, required,
}: { name: string; label: string; type?: string; textarea?: boolean; required?: boolean }) {
  const cls =
    "mt-1 w-full rounded-sm border border-border bg-background/70 px-3 py-2 text-sm outline-none transition focus:border-foreground/50 focus:ring-2 focus:ring-ring/20 font-light";
  return (
    <label className="block">
      <span className="eyebrow font-mono text-[11px]">{label.toUpperCase()}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={cls} />
      ) : (
        <input name={name} type={type} required={required} className={cls} />
      )}
    </label>
  );
}

/* Updated footer automatically referencing 2026 current scope calculations */
function Footer() {
  return (
    <footer className="border-t border-rule mt-auto w-full">
      <div className="flex flex-col items-start justify-between gap-3 py-8 text-xs text-slate-500 dark:text-muted-foreground sm:flex-row sm:items-center">
        <p className="font-mono">© {new Date().getFullYear()} · Portfolio · Jakarta → München</p>
        <p className="font-mono">Built with React · TanStack · Tailwind</p>
      </div>
    </footer>
  );
}

/* Structural Icon Bundles */
function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}