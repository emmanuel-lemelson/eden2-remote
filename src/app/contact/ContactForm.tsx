'use client';

import { useState, useRef } from "react";

interface FormState {
  success?: boolean;
  message?: string;
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormState({});

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://formspree.io/f/xpwgkqkp', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormState({
          success: true,
          message: "Thank you. Our concierge team will reach out within 24 hours."
        });
        formRef.current?.reset();
      } else {
        setFormState({
          success: false,
          message: "Something went wrong. Please try again or email us directly."
        });
      }
    } catch (error) {
      setFormState({
        success: false,
        message: "Something went wrong. Please try again or email us directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl border border-white/60 bg-white/80 p-10 shadow-sm backdrop-blur"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Name*
          </label>
          <input
            name="name"
            type="text"
            required
            className="rounded-2xl border border-stone-200 bg-white/70 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-stone-400 focus:bg-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Email*
          </label>
          <input
            name="email"
            type="email"
            required
            className="rounded-2xl border border-stone-200 bg-white/70 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-stone-400 focus:bg-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            className="rounded-2xl border border-stone-200 bg-white/70 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-stone-400 focus:bg-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Event Type
          </label>
          <div className="flex flex-wrap gap-3">
            {[
              "Retreat",
              "Celebration",
              "Wellness",
              "Corporate",
              "Other",
            ].map((label) => (
              <label
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-stone-600"
              >
                <input type="checkbox" name="events" value={label} />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Check-in
          </label>
          <input
            name="checkIn"
            type="date"
            className="rounded-2xl border border-stone-200 bg-white/70 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-stone-400 focus:bg-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Check-out
          </label>
          <input
            name="checkOut"
            type="date"
            className="rounded-2xl border border-stone-200 bg-white/70 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-stone-400 focus:bg-white"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Adults
          </label>
          <input
            name="guestsAdults"
            type="number"
            min="0"
            className="rounded-2xl border border-stone-200 bg-white/70 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-stone-400 focus:bg-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Children
          </label>
          <input
            name="guestsChildren"
            type="number"
            min="0"
            className="rounded-2xl border border-stone-200 bg-white/70 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-stone-400 focus:bg-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.3em] text-stone-500">
          Message*
        </label>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full rounded-2xl border border-stone-200 bg-white/70 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-stone-400 focus:bg-white"
          placeholder="Tell us about your ideal stay, any special events, experiences to arrange, and desired dates."
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label>
          Do not fill this out
          <input name="token" tabIndex={-1} autoComplete="off" type="text" />
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs text-stone-500">
          Required fields marked with*. Your information remains confidential.
        </div>
        <SubmitButton />
      </div>

      {formState.message ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            formState.success
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {formState.message}
        </div>
      ) : null}
    </form>
  );
}
