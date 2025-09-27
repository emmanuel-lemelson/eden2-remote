'use client';

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitInquiry, type FormState } from "./actions";

const defaultState: FormState = {
  success: undefined,
  errors: undefined,
  message: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="inline-flex items-center rounded-full border border-stone-300 bg-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-stone-800 transition hover:border-stone-400 hover:bg-white/80 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
    >
      {pending ? "Sending..." : "Send Inquiry"}
    </button>
  );
}

export default function ContactForm() {
  const [formState, formAction] = useActionState(submitInquiry, defaultState);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (formState.success && formRef.current) {
      formRef.current.reset();
    }
  }, [formState.success]);

  return (
    <form
      ref={formRef}
      action={formAction}
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
          {formState.errors?.name && (
            <p className="text-xs text-red-600">{formState.errors.name}</p>
          )}
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
          {formState.errors?.email && (
            <p className="text-xs text-red-600">{formState.errors.email}</p>
          )}
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
        {formState.errors?.message && (
          <p className="text-xs text-red-600">{formState.errors.message}</p>
        )}
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
