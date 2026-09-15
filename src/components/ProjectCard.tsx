"use client";

import { ArrowUpRight, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <motion.article className={`project-card ${project.featured ? "featured" : ""}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ delay: index * .08, duration: .6 }}><a href={project.liveUrl} className="project-visual" style={{ background: project.image }} aria-label={`View ${project.title}`}><span>0{index + 1}</span><div className="project-art" /></a><div className="project-info"><div><h3>{project.title}</h3><p>{project.description}</p><div className="tech-list">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></div><div className="project-links"><a href={project.liveUrl} aria-label={`Open ${project.title}`}><ArrowUpRight size={19} /></a><a href={project.githubUrl} aria-label={`${project.title} source`}><Code2 size={17} /></a></div></div><p className="project-category">{project.category}</p></motion.article>;
}
