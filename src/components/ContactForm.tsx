"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type FormValues = { name: string; email: string; phone: string; subject: string; message: string; website: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = { name: "", email: "", phone: "", subject: "", message: "", website: "" };

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Full name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15 || !/^\+?[0-9\s().-]+$/.test(values.phone.trim())) errors.phone = "Enter a valid international phone number.";
  if (!values.subject.trim()) errors.subject = "Subject is required.";
  if (!values.message.trim()) errors.message = "Message is required.";
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== "idle") setStatus("idle");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) { setErrors(nextErrors); return; }
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      if (!response.ok) throw new Error("Contact submission failed");
      setValues(initialValues);
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const fieldError = (field: keyof FormValues) => errors[field];
  return <form className="contact-panel" onSubmit={submit} noValidate>
    <h1>Let&apos;s build something great!</h1>
    <p>Available for freelance, contract, or full-time roles. I build reliable digital products with Node.js, Express, React, Next.js, SQL, and MongoDB.</p>
    <div className="form-field"><label htmlFor="contact-name">Full Name</label><input id="contact-name" name="name" value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(fieldError("name"))} aria-describedby={fieldError("name") ? "contact-name-error" : undefined} autoComplete="name" />{fieldError("name") && <span className="field-error" id="contact-name-error" role="alert">{fieldError("name")}</span>}</div>
    <div className="form-field"><label htmlFor="contact-email">Email Address</label><input id="contact-email" name="email" type="email" value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(fieldError("email"))} aria-describedby={fieldError("email") ? "contact-email-error" : undefined} autoComplete="email" />{fieldError("email") && <span className="field-error" id="contact-email-error" role="alert">{fieldError("email")}</span>}</div>
    <div className="form-field"><label htmlFor="contact-phone">Phone Number</label><input id="contact-phone" name="phone" type="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} aria-invalid={Boolean(fieldError("phone"))} aria-describedby={fieldError("phone") ? "contact-phone-error" : undefined} autoComplete="tel" />{fieldError("phone") && <span className="field-error" id="contact-phone-error" role="alert">{fieldError("phone")}</span>}</div>
    <div className="form-field"><label htmlFor="contact-subject">Subject</label><input id="contact-subject" name="subject" value={values.subject} onChange={(event) => update("subject", event.target.value)} aria-invalid={Boolean(fieldError("subject"))} aria-describedby={fieldError("subject") ? "contact-subject-error" : undefined} />{fieldError("subject") && <span className="field-error" id="contact-subject-error" role="alert">{fieldError("subject")}</span>}</div>
    <div className="form-field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" value={values.message} onChange={(event) => update("message", event.target.value)} rows={6} aria-invalid={Boolean(fieldError("message"))} aria-describedby={fieldError("message") ? "contact-message-error" : undefined} />{fieldError("message") && <span className="field-error" id="contact-message-error" role="alert">{fieldError("message")}</span>}</div>
    <input className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" value={values.website} onChange={(event) => update("website", event.target.value)} />
    <button className="send-button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : status === "success" ? "Message Sent ✓" : status === "error" ? "Try Again" : "Send Message"} <ArrowUpRight size={16} /></button>
    <p className={`form-status ${status}`} role="status" aria-live="polite">{status === "success" ? "Thank you! Your message has been sent successfully." : status === "error" ? "Something went wrong. Please try again." : ""}</p>
  </form>;
}