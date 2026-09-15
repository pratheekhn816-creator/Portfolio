"use client";

import Link from "next/link";
import { Menu, ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const links = [["About", "about"], ["Work", "work"], ["Experience", "experience"], ["Contact", "contact"]];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="site-nav"><Link href="/" className="logo" onClick={() => setOpen(false)}>YN<span>.</span></Link><nav className="nav-links">{links.map(([label, id]) => <Link key={id} href={`/#${id}`}>{label}</Link>)}</nav><Link className="nav-cta" href="/#contact">Let&apos;s talk <ArrowUpRight size={15} /></Link><button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X size={19} /> : <Menu size={19} />}</button><AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>{links.map(([label, id], index) => <motion.div key={id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .06 }}><Link href={`/#${id}`} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={16} /></Link></motion.div>)}</motion.nav>}</AnimatePresence></header>;
}
