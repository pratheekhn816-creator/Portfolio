"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowLeft, ArrowRight, ChevronDown, Code2, Copy, Download, Globe, Mail, MessageCircle, Phone, Settings, UserRound, Video, X } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { ContactForm } from "@/components/ContactForm";

const nav = [["Home", "/"], ["Expertise", "/expertise"], ["Experience", "/experience"], ["Projects", "/work"], ["Contact", "/contact"], ["FAQ", "/faq"]];
const expertise = [
  ["01", "Web & Application Development", "Design and build scalable, production-ready web and mobile applications with clean architecture, modern frameworks, and reliable backend APIs focused on performance, maintainability, and business impact.", ".NET, Node.js, Python, React, Next.js, Angular, REST APIs"],
  ["02", "UI / UX Engineering", "Create intuitive, user-centric interfaces that balance usability and visual clarity. Translate business requirements into responsive, accessible, and consistent user experiences.", "Figma, Wireframing, Prototyping, Design Systems"],
  ["03", "Test Automation, DevOps & Quality Engineering", "Ensure high software quality and reliable delivery through automated testing, CI/CD pipelines, and integration validation. Focused on stability, performance, and defect prevention across the full delivery lifecycle.", "CI/CD, Docker, Kubernetes, Cypress, Test, Selenium, VDS"],
  ["04", "Cloud, Security & Reliability", "Deliver secure, reliable cloud-based systems with practical security controls, access management, and monitoring. Focused on stability, compliance, and production resilience across modern application environments.", "AWS, Auth, Monitoring, Secure APIs, SSH, Network Security"],
];
const faqs = ["What kind of services or projects can you develop?", "What is your availability and typical project timeline?", "What are your pricing models (hourly vs. project-based)?", "Do you work remotely or on-site?", "What technologies and tech stack do you prefer?", "What is your project process and workflow?", "How do you prefer to communicate during projects?", "Can you share examples of your portfolio or previous projects?", "What certifications and education do you have?", "What is your location and timezone?"];

export function PortfolioShell() {
  const pathname = usePathname();
  return <><Navbar pathname={pathname} /><main>{pathname === "/" ? <Home /> : pathname === "/expertise" ? <Expertise /> : pathname === "/experience" || pathname === "/about" ? <Experience /> : pathname === "/work" ? <Projects /> : pathname === "/contact" ? <Contact /> : <FAQ />}</main><SideTools /><Chat /><Footer pathname={pathname} /></>;
}

function Navbar({ pathname }: { pathname: string }) {
  return <header className="reference-nav"><Link prefetch className="reference-logo" href="/">Portfolio<span>.</span></Link><nav>{nav.map(([label, href]) => <Link prefetch className={pathname === href ? "active" : ""} key={href} href={href}>{label}</Link>)}<span className="nav-globe"><Globe size={22} /></span><Link prefetch className="hire-button" href="/contact">Hire me!</Link></nav></header>;
}

function Home() {
  return <div className="reference-page home-page"><section className="reference-hero"><div className="reference-copy"><p className="hello-line">Hello! I&apos;m</p><h1>PRATHEEK H N</h1><h2>Full-Stack Developer <span>|</span> Node.js, React &amp; Next.js Engineer</h2><p className="hero-bio">Developer with 2 years of hands-on experience designing and maintaining Node.js and Express backends alongside React-driven frontends. Skilled in building scalable RESTful APIs, optimizing SQL queries, and implementing robust business logic for production systems.<br />Experienced in delivering end-to-end web applications, improving application performance, and collaborating in agile teams to develop scalable, high-performance software solutions.</p><div className="hero-bottom"><a className="resume-button" href="/pratheek-hn-resume.html" download><Download size={15} /> DOWNLOAD RESUME</a><Socials /></div></div><Portrait /></section><Stats /></div>;
}



function Portrait() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const savedImage = window.localStorage.getItem("pratheek-profile-image");
    setImageUrl(savedImage || "/profile-photo.svg");
  }, []);

  useEffect(() => () => {
    if (imageUrl?.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
  }, [imageUrl]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : null;
      if (!result) return;

      setImageUrl((currentUrl) => {
        if (currentUrl?.startsWith("blob:")) URL.revokeObjectURL(currentUrl);
        window.localStorage.setItem("pratheek-profile-image", result);
        return result;
      });
    };

    reader.readAsDataURL(file);
  };

  return <div className="reference-portrait"><div className="portrait-ring" />{imageUrl && <Image src={imageUrl} alt="Pratheek HN" width={520} height={650} unoptimized className="portrait-placeholder has-image" onError={() => {
    window.localStorage.removeItem("pratheek-profile-image");
    setImageUrl("/profile-photo.svg");
  }} />}<input type="file" accept="image/*" onChange={handleImageUpload} aria-label="Upload profile photo" /><span className="portrait-note">Pratheek H N</span></div>;
}
function Socials() { return <div className="socials"><a href="https://github.com/pratheekHN" target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 size={18} /></a><a href="https://linkedin.com/in/pratheek-hn7" target="_blank" rel="noreferrer" aria-label="LinkedIn"><UserRound size={18} /></a><a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><MessageCircle size={18} /></a><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Globe size={18} /></a><a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Phone size={18} /></a><a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X"><X size={18} /></a></div>; }
function Stats() { return <section className="reference-stats"><div><strong>02</strong><span>Years of<br />Experience</span></div><div><strong>04</strong><span>Projects<br />Completed</span></div><div><strong>15</strong><span>Technologies<br />Used</span></div><div><strong>∞</strong><span>Code<br />Growing</span></div></section>; }

function Expertise() { return <PageFrame title="Expertise"><div className="expertise-grid">{expertise.map(([number, title, description, stack]) => <motion.article className="expertise-card" key={number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><div className="card-number">{number}</div><div className="round-arrow"><ArrowDown size={28} /></div><h2>{title}</h2><p>{description}</p><strong>{stack}</strong></motion.article>)}</div></PageFrame>; }
function Experience() {
  const [activeTab, setActiveTab] = useState("About me");
  const tabContent: Record<string, { title: string; body: string; details?: [string, string][] }> = {
    "About me": { title: "Professional Summary", body: "Developer with 2 years of hands-on experience designing and maintaining Node.js and Express backends alongside React-driven frontends. Skilled in scalable RESTful APIs, SQL query optimization, robust business logic, end-to-end web applications, and agile delivery.", details: [["Name", "PRATHEEK H N"], ["Phone", "7019857294"], ["Experience", "2 Years"], ["Location", "Chikmagalur, India"], ["Education", "B.E. Computer Science"], ["Email", "pratheekhn816@gmail.com"], ["Availability", "Available"], ["Languages", "English, Kannada, Hindi"]] },
    Experience: { title: "Experience", body: "A hands-on product engineering background focused on reliable web applications, maintainable APIs, and practical delivery.", details: experience.map((item) => [item.company, `${item.role} | ${item.dates}`]) },
    Education: { title: "Education", body: "B.E. Computer Science with a practical focus on software engineering, application development, and quality delivery.", details: [["Degree", "B.E. Computer Science"], ["Focus", "Software Engineering"], ["Learning", "Web, APIs, databases, testing"]] },
    Skills: { title: "Skills", body: "A balanced toolkit for building, testing, and shipping production-ready digital products.", details: [["Frontend", "React, Next.js, Angular"], ["Backend", "Node.js, Express, Python, .NET"], ["Data", "SQL, MongoDB, REST APIs"], ["Quality", "Cypress, Selenium, CI/CD"]] },
  };
  const content = tabContent[activeTab];
  return <PageFrame><div className="experience-layout"><aside>{Object.keys(tabContent).map((tab) => <button type="button" className={activeTab === tab ? "selected" : ""} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}</aside><article className="summary"><h1>{content.title}</h1><p>{content.body}</p><div className="details">{content.details?.map(([label, value]) => <p key={label}>{label} <b>{value}</b></p>)}</div></article></div></PageFrame>;
}
function Projects() { const [index, setIndex] = useState(0); const [viewMode, setViewMode] = useState<"grid" | "list">("grid"); const project = projects[index % projects.length]; return <PageFrame><div className="projects-heading"><h1>Projects <span>({projects.length})</span></h1><p>Here it&apos;s showcase projects, to check open-source production-ready work, visit my <a href="https://github.com/pratheekHN" target="_blank" rel="noreferrer">Github repo ↗</a></p><div className="view-buttons"><button type="button" className={viewMode === "grid" ? "selected" : ""} onClick={() => setViewMode("grid")} aria-label="Grid view">▦</button><button type="button" className={viewMode === "list" ? "selected" : ""} onClick={() => setViewMode("list")} aria-label="List view">☷</button></div></div><article className={`featured-project ${viewMode === "list" ? "list-view" : ""}`}><div className="project-copy"><div className="project-number">0{index + 5}</div><h2>{project.title} - Next.js, Prisma, MongoDB Fullstack Project</h2><p>{project.description} This application includes features such as product listing, adding new products, editing existing products, and filtering products based on various criteria.</p><strong>{project.technologies.join(", ")}</strong></div><div className="project-preview" style={{ background: project.image }}><button type="button" onClick={() => setIndex((index - 1 + projects.length) % projects.length)} aria-label="Previous project"><ArrowLeft /></button><div className="preview-interface" role="img" aria-label={`${project.title} dashboard demo image`} /><button type="button" onClick={() => setIndex((index + 1) % projects.length)} aria-label="Next project"><ArrowRight /></button></div></article></PageFrame>; }
function Contact() { return <PageFrame><div className="contact-layout"><ContactForm /><div className="contact-details"><ContactItem icon={<Phone />} label="Phone" value="7019857294" /><ContactItem icon={<Mail />} label="Email" value="pratheekhn816@gmail.com" /><ContactItem icon={<Globe />} label="Address" value="Chikmagalur, India" /><ContactItem icon={<UserRound />} label="LinkedIn" value="pratheek-hn7" /><ContactItem icon={<Code2 />} label="Github" value="pratheekHN" /></div></div></PageFrame>; }
function ContactItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="contact-item"><span>{icon}</span><div><small>{label}</small><b>{value}</b><Copy size={15} /></div></div>; }
function FAQ() { return <PageFrame title="Frequently Asked Questions"><div className="faq-list">{faqs.map((question) => <details key={question}><summary>{question}<ChevronDown size={17} /></summary><p>Share your requirements and goals, and we can shape the right scope, timeline, and delivery approach together.</p></details>)}</div></PageFrame>; }
function PageFrame({ children, title }: { children: React.ReactNode; title?: string }) { return <section className="reference-page inner-page"><div className="inner-content">{title && <h1 className="page-title">{title}</h1>}{children}</div></section>; }
function Footer({ pathname }: { pathname: string }) { return <footer className="reference-footer"><span>© 2026 All rights reserved.</span>{pathname === "/" ? null : <span><Link prefetch href="/about">About</Link><a href="#">Privacy</a><a href="#">Terms</a></span>}</footer>; }
function SideTools() { return <aside className="side-tools"><span>◉</span><span><Video size={16} /></span><span><MessageCircle size={16} /></span><span><Settings size={17} /></span></aside>; }
function Chat() { const [open, setOpen] = useState(false); return <div className="reference-chat">{open && <div className="chat-bubble"><button onClick={() => setOpen(false)} aria-label="Close chat"><X size={15} /></button><b>Your Name&apos;s Assistant</b><p>Hi! How can I help you today?</p></div>}<button onClick={() => setOpen(!open)} aria-label="Open assistant"><MessageCircle size={25} /></button></div>; }
