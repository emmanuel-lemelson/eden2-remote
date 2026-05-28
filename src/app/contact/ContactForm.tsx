"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    flexibleDates: false,
    guestCount: "",
    eventType: "Family Stay",
    requirements: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://formspree.io/f/mlgvzjrj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone || "Not provided",
          "Check-In Date": formData.checkIn || "Not specified",
          "Check-Out Date": formData.checkOut || "Not specified",
          "Flexible Dates": formData.flexibleDates ? "Yes" : "No",
          "Guest Count": formData.guestCount || "Not specified",
          "Event Type": formData.eventType,
          "Bespoke Requirements": formData.requirements || "None",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          checkIn: "",
          checkOut: "",
          flexibleDates: false,
          guestCount: "",
          eventType: "Family Stay",
          requirements: "",
        });
      } else {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      const errorObj = err as Error;
      console.error("Formspree Submission Error:", errorObj);
      setStatus("error");
      setErrorMessage(errorObj.message || "Unable to send inquiry. Please try again or email us directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="animate-fade-up rounded-[2.5rem] border border-[rgba(214,202,183,0.85)] bg-gradient-to-br from-white via-[rgba(237,227,208,0.75)] to-[rgba(225,212,186,0.55)] p-8 text-center shadow-[0_28px_60px_-38px_rgba(58,45,20,0.45)] sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(214,202,183,0.35)] text-[var(--color-gold)] shadow-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-[var(--color-charcoal)] sm:text-3xl">
          Inquiry Received
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-base text-stone-700 leading-relaxed">
          Thank you for sharing your plans with us. Our dedicated Estate Concierge team will review
          your travel details and contact you within 12 hours to begin curating your stay at Eden.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-charcoal)] px-8 py-3 text-sm font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-black/90 hover:shadow-xl"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[2.5rem] border border-[rgba(214,202,183,0.85)] bg-gradient-to-br from-white via-[rgba(237,227,208,0.75)] to-[rgba(225,212,186,0.55)] p-6 shadow-[0_28px_60px_-38px_rgba(58,45,20,0.45)] sm:p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-600"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alexander Vance"
              className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-[var(--color-charcoal)] placeholder-stone-400 outline-none backdrop-blur-sm transition duration-200 focus:border-[var(--color-gold)] focus:bg-white"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-600"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. alexander@vanceholding.com"
              className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-[var(--color-charcoal)] placeholder-stone-400 outline-none backdrop-blur-sm transition duration-200 focus:border-[var(--color-gold)] focus:bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-600"
            >
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 019-2834"
              className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-[var(--color-charcoal)] placeholder-stone-400 outline-none backdrop-blur-sm transition duration-200 focus:border-[var(--color-gold)] focus:bg-white"
            />
          </div>

          {/* Guest Count */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="guestCount"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-600"
            >
              Approx. Guests *
            </label>
            <select
              id="guestCount"
              name="guestCount"
              required
              value={formData.guestCount}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-[var(--color-charcoal)] outline-none backdrop-blur-sm transition duration-200 focus:border-[var(--color-gold)] focus:bg-white"
            >
              <option value="" disabled>Select guest capacity</option>
              <option value="1-5 guests">1 - 5 guests</option>
              <option value="6-12 guests">6 - 12 guests</option>
              <option value="13-20 guests">13 - 20 guests</option>
              <option value="21-40 guests">21 - 40 guests</option>
              <option value="41-80 guests">41 - 80 guests</option>
              <option value="80+ guests">80+ guests</option>
            </select>
          </div>
        </div>

        {/* Date Selectors & Flexible Toggle */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Check-In */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="checkIn"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-600"
              >
                Desired Check-In
              </label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-[var(--color-charcoal)] outline-none backdrop-blur-sm transition duration-200 focus:border-[var(--color-gold)] focus:bg-white"
              />
            </div>

            {/* Check-Out */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="checkOut"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-600"
              >
                Desired Check-Out
              </label>
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-[var(--color-charcoal)] outline-none backdrop-blur-sm transition duration-200 focus:border-[var(--color-gold)] focus:bg-white"
              />
            </div>
          </div>

          {/* Flexible Dates Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="flexibleDates"
              name="flexibleDates"
              checked={formData.flexibleDates}
              onChange={handleChange}
              className="h-4.5 w-4.5 rounded border-white/60 bg-white/70 text-[var(--color-gold)] outline-none transition duration-150 focus:ring-1 focus:ring-[var(--color-gold)]"
            />
            <label
              htmlFor="flexibleDates"
              className="text-sm font-medium text-stone-700 cursor-pointer select-none"
            >
              My travel dates are flexible
            </label>
          </div>
        </div>

        {/* Occasion / Event Type */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="eventType"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-600"
          >
            Stay Category
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-[var(--color-charcoal)] outline-none backdrop-blur-sm transition duration-200 focus:border-[var(--color-gold)] focus:bg-white"
          >
            <option value="Family Stay">Private Family Stay / Vacation</option>
            <option value="Wedding">Bespoke Wedding Celebration</option>
            <option value="Retreat">Corporate / Wellness Retreat</option>
            <option value="Private Getaway">Elite Private Gathering</option>
            <option value="Other">Other Event</option>
          </select>
        </div>

        {/* Bespoke Requirements */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="requirements"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-600"
          >
            Bespoke Requirements & Vision
          </label>
          <textarea
            id="requirements"
            name="requirements"
            rows={4}
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Share details of your ideal stay. Let us know if you require catering, a private chef, security detail, helipad support, or custom local tours..."
            className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-[var(--color-charcoal)] placeholder-stone-400 outline-none backdrop-blur-sm transition duration-200 focus:border-[var(--color-gold)] focus:bg-white resize-none"
          />
        </div>

        {/* Error message */}
        {status === "error" && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 animate-fade-up">
            <div className="flex items-start gap-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 flex-shrink-0 text-red-600"
              >
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.753-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-semibold">Submission Failed</p>
                <p className="mt-1 text-red-700 leading-normal">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--color-charcoal)] px-8 py-4 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5 hover:bg-black/90 disabled:pointer-events-none disabled:opacity-75 sm:text-base cursor-pointer"
          >
            {status === "submitting" ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Processing Request...</span>
              </>
            ) : (
              <span>Request Private Consultation</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
