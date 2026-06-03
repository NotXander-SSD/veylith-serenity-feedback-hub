import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Veylith Serenity — Beta Tester Feedback" },
      { name: "description", content: "Help shape Veylith Serenity. Share your beta testing feedback on our luxury African botanical skincare experience." },
      { property: "og:title", content: "Veylith Serenity — Beta Tester Feedback" },
      { property: "og:description", content: "Your feedback shapes the final experience." },
    ],
  }),
  component: Index,
});

const VEYLITH_URL = "https://theveylithserenity.netlify.app";

const STEPS = [
  "Click the Veylith Serenity website link below to visit the site.",
  "Spend at least 5–10 minutes exploring — browse products, click every button, try adding items to cart, test the checkout flow, navigate all pages.",
  "Try to break things — resize your browser, use your phone, tap every link, and note anything that looks off or doesn't work.",
  "Come back to THIS page when you're done.",
  "Fill in the feedback form below and hit submit.",
];

function StarRating({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className="text-4xl leading-none transition-transform hover:scale-110"
          style={{ color: n <= value ? "var(--brand-gold)" : "rgba(42,34,24,0.25)" }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [device, setDevice] = useState("");
  const [hadBugs, setHadBugs] = useState(false);
  const [bugDesc, setBugDesc] = useState("");
  const [liked, setLiked] = useState("");
  const [improve, setImprove] = useState("");
  const [other, setOther] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!rating) { setError("Please give an overall rating."); return; }
    if (!device) { setError("Please select which device you used."); return; }
    setSubmitting(true);
    const { error: insertError } = await supabase.from("beta_feedback").insert({
      name: name.trim() || null,
      email: email.trim() || null,
      star_rating: rating,
      device,
      has_bug: hadBugs,
      bug_description: hadBugs ? bugDesc.trim() || null : null,
      liked_most: liked.trim() || null,
      improvements: improve.trim() || null,
      other_comments: other.trim() || null,
    });
    setSubmitting(false);
    if (insertError) { setError("Something went wrong. Please try again."); return; }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-24 bg-brand-cream">
        <div className="max-w-xl text-center">
          <div className="mx-auto mb-8 h-px w-16 bg-brand-gold" />
          <h1 className="text-4xl md:text-5xl text-brand-brown leading-tight">Thank you for helping us grow.</h1>
          <p className="mt-6 text-lg text-brand-brown/80 leading-relaxed">
            Your feedback has been received and is deeply valued.
          </p>
          <p className="mt-4 italic text-brand-brown/70">— The Veylith Team</p>
          <div className="mx-auto mt-10 h-px w-16 bg-brand-gold" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-cream text-brand-brown">
      {/* Hero */}
      <section className="px-6 pt-20 pb-16 md:pt-28 md:pb-20 text-center max-w-3xl mx-auto">
        <p className="tracking-[0.35em] text-xs md:text-sm text-brand-gold uppercase">Veylith Serenity · Beta</p>
        <div className="mx-auto mt-6 h-px w-12 bg-brand-gold" />
        <h1 className="mt-8 text-4xl md:text-6xl leading-tight">Help Us Perfect Veylith Serenity</h1>
        <p className="mt-6 text-base md:text-lg text-brand-brown/80 leading-relaxed max-w-xl mx-auto">
          You've been invited to beta test our website before launch. Your feedback shapes the final experience.
        </p>
      </section>

      {/* Steps */}
      <section className="px-6 pb-12 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-center">How to Participate</h2>
        <div className="mx-auto mt-4 h-px w-12 bg-brand-gold" />
        <ol className="mt-10 space-y-6">
          {STEPS.map((step, i) => (
            <li key={i} className="flex gap-5 items-start">
              <span
                className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full border text-lg"
                style={{ borderColor: "var(--brand-gold)", color: "var(--brand-gold)", fontFamily: "Georgia, serif" }}
              >
                {i + 1}
              </span>
              <p className="pt-2 text-base md:text-lg leading-relaxed text-brand-brown/90">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Visit button */}
      <section className="px-6 py-12 text-center">
        <a
          href={VEYLITH_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-12 py-5 text-lg tracking-wide transition-all hover:opacity-90 hover:tracking-wider"
          style={{
            backgroundColor: "var(--brand-brown)",
            color: "var(--brand-gold)",
            border: "1px solid var(--brand-gold)",
          }}
        >
          Visit Veylith Serenity →
        </a>
      </section>

      {/* Reminder banner */}
      <section
        className="px-6 py-5 text-center text-brand-brown font-medium"
        style={{ backgroundColor: "var(--brand-gold)" }}
      >
        Done exploring? Scroll down and leave your feedback below 👇
      </section>

      {/* Form */}
      <section className="px-6 py-20 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-center">Share Your Experience</h2>
        <div className="mx-auto mt-4 h-px w-12 bg-brand-gold" />

        <form onSubmit={handleSubmit} className="mt-12 space-y-8">
          <Field label="Tester name (optional)">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} maxLength={120} />
          </Field>

          <Field label="Email address (optional)">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} maxLength={255} />
          </Field>

          <Field label="Overall experience">
            <StarRating value={rating} onChange={setRating} />
          </Field>

          <Field label="What device did you use?">
            <select value={device} onChange={(e) => setDevice(e.target.value)} className={inputCls} required>
              <option value="">Select a device…</option>
              <option value="Desktop">Desktop</option>
              <option value="Mobile">Mobile</option>
              <option value="Tablet">Tablet</option>
            </select>
          </Field>

          <Field label="Did you encounter any bugs or broken elements?">
            <div className="flex gap-3">
              {[{ v: false, l: "No" }, { v: true, l: "Yes" }].map((opt) => (
                <button
                  key={opt.l}
                  type="button"
                  onClick={() => setHadBugs(opt.v)}
                  className="px-6 py-2 transition-all"
                  style={{
                    backgroundColor: hadBugs === opt.v ? "var(--brand-brown)" : "transparent",
                    color: hadBugs === opt.v ? "var(--brand-gold)" : "var(--brand-brown)",
                    border: "1px solid var(--brand-brown)",
                  }}
                >
                  {opt.l}
                </button>
              ))}
            </div>
            {hadBugs && (
              <textarea
                value={bugDesc}
                onChange={(e) => setBugDesc(e.target.value)}
                placeholder="Please describe the bug…"
                rows={4}
                maxLength={2000}
                className={`mt-4 ${inputCls}`}
              />
            )}
          </Field>

          <Field label="What did you like most?">
            <textarea value={liked} onChange={(e) => setLiked(e.target.value)} rows={4} maxLength={2000} className={inputCls} />
          </Field>

          <Field label="What should be improved or changed?">
            <textarea value={improve} onChange={(e) => setImprove(e.target.value)} rows={4} maxLength={2000} className={inputCls} />
          </Field>

          <Field label="Any other comments?">
            <textarea value={other} onChange={(e) => setOther(e.target.value)} rows={4} maxLength={2000} className={inputCls} />
          </Field>

          {error && <p className="text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 text-lg tracking-wide transition-all hover:opacity-90 disabled:opacity-60"
            style={{
              backgroundColor: "var(--brand-brown)",
              color: "var(--brand-gold)",
              border: "1px solid var(--brand-gold)",
            }}
          >
            {submitting ? "Submitting…" : "Submit Feedback"}
          </button>
        </form>
      </section>

      <footer className="px-6 py-10 text-center text-xs tracking-[0.2em] uppercase text-brand-brown/60 border-t" style={{ borderColor: "rgba(42,34,24,0.15)" }}>
        Veylith Serenity Beta Program · by Zariah & Co. In partnership with Dynasty100™
      </footer>
    </main>
  );
}

const inputCls =
  "w-full bg-transparent border-0 border-b border-brand-brown/30 px-1 py-2 outline-none focus:border-brand-gold transition-colors text-brand-brown placeholder:text-brand-brown/40";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs tracking-[0.2em] uppercase text-brand-brown/70 mb-3">{label}</label>
      {children}
    </div>
  );
}
