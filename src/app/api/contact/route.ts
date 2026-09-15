import { NextResponse } from "next/server";

const attempts = new Map<string, number[]>();
const windowMs = 10 * 60 * 1000;
const maxAttempts = 5;

type Payload = { name?: unknown; email?: unknown; phone?: unknown; subject?: unknown; message?: unknown; website?: unknown };

function text(value: unknown) { return typeof value === "string" ? value.trim() : ""; }
function response(message: string, status: number) { return NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } }); }

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((timestamp) => now - timestamp < windowMs);
  if (recent.length >= maxAttempts) return response("Too many requests", 429);
  recent.push(now);
  attempts.set(ip, recent);

  let payload: Payload;
  try { payload = await request.json() as Payload; } catch { return response("Invalid request", 400); }
  if (text(payload.website)) return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });

  const values = { name: text(payload.name), email: text(payload.email), phone: text(payload.phone), subject: text(payload.subject), message: text(payload.message) };
  const digits = values.phone.replace(/\D/g, "");
  if (!values.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || digits.length < 7 || digits.length > 15 || !/^\+?[0-9\s().-]+$/.test(values.phone) || !values.subject || !values.message) return response("Invalid form data", 400);

  const formUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL?.trim();
  const fields = { name: process.env.NEXT_PUBLIC_GOOGLE_FORM_NAME_FIELD?.trim(), email: process.env.NEXT_PUBLIC_GOOGLE_FORM_EMAIL_FIELD?.trim(), phone: process.env.NEXT_PUBLIC_GOOGLE_FORM_PHONE_FIELD?.trim(), subject: process.env.NEXT_PUBLIC_GOOGLE_FORM_SUBJECT_FIELD?.trim(), message: process.env.NEXT_PUBLIC_GOOGLE_FORM_MESSAGE_FIELD?.trim() };
  if (!formUrl || Object.values(fields).some((field) => !field)) return response("Google Form is not configured", 503);

  const entry = (field: string) => field.startsWith("entry.") ? field : `entry.${field}`;
  const formData = new URLSearchParams({ [entry(fields.name!)]: values.name, [entry(fields.email!)]: values.email, [entry(fields.phone!)]: values.phone, [entry(fields.subject!)]: values.subject, [entry(fields.message!)]: values.message });
  try {
    const googleResponse = await fetch(formUrl, { method: "POST", body: formData, redirect: "follow", signal: AbortSignal.timeout(10000) });
    if (!googleResponse.ok) return response("Google Form submission failed", 502);
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch { return response("Google Form submission failed", 502); }
}