"use client";

import { useState } from "react";
import { MessageCircle, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const answers: Record<string, string> = { "What projects have you built?": "A focused mix of product platforms, editorial systems, and human-scale digital experiences. The selected work above is a good place to start.", "What technologies do you use?": "Next.js, React, TypeScript, Node.js, Python, PostgreSQL, and thoughtful AI tooling.", "Tell me about your experience.": "I work independently with ambitious teams, bringing product thinking and engineering craft to complex ideas.", "How can I contact you?": "Send a note to hello@example.com and I will get back to you soon." };

export function AIChat() {
  const [open, setOpen] = useState(false); const [question, setQuestion] = useState(""); const [answer, setAnswer] = useState("");
  const ask = (value: string) => { setQuestion(value); setAnswer(""); window.setTimeout(() => setAnswer(answers[value]), 350); };
  return <div className="chat"><AnimatePresence>{open && <motion.div className="chat-window" initial={{ opacity: 0, y: 16, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: .96 }}><div className="chat-top"><span>YOUR NAME&apos;S ASSISTANT</span><button onClick={() => setOpen(false)} aria-label="Close assistant"><X size={16} /></button></div><p className="chat-welcome">Hi there. Curious about the work, process, or availability?</p>{question && <div className="chat-question">{question}</div>}{question && !answer ? <div className="typing"><i /><i /><i /></div> : answer ? <div className="chat-answer">{answer}</div> : null}<div className="chat-options">{Object.keys(answers).map((item) => <button key={item} onClick={() => ask(item)}>{item}<ArrowUpRight size={13} /></button>)}</div></motion.div>}</AnimatePresence><button className="chat-toggle" onClick={() => setOpen(!open)} aria-expanded={open}><MessageCircle size={16} /> Ask me anything <span>{open ? "−" : "+"}</span></button></div>;
}
