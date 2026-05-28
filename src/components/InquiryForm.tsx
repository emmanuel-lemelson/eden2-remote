"use client";

import { useState } from "react";

interface InquiryFormProps {
  endpoint?: string;
}

export function InquiryForm({ endpoint = "https://formspree.io/f/mlgvzjrj" }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    flexibleDates: false,
    flexibleLength: "1 Week",
    customDuration: "",
    flexibleMonth: "Summer 2026",
    guests: "",
    eventType: "Vacation",
    requirements: "",
  });

  const [status, setStatus] = useState<{
    submitting: boolean;
    succeeded: boolean;
    error: string | null;
  }>({
    submitting: false,
    succeeded: false,
    error: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, succeeded: false, error: null });

    const stayLength = formData.customDuration || "Flexible Stay";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          "Name": formData.name,
          "Email": formData.email,
          "Phone": formData.phone || "Not Provided",
          "Date Type": formData.flexibleDates ? "Flexible" : "Specific Dates",
          "Requested Stay": formData.flexibleDates
            ? `${stayLength} in ${formData.flexibleMonth}`
            : `${formData.checkIn || "Not Selected"} to ${formData.checkOut || "Not Selected"}`,
          "Guests": formData.guests || "Not Specified",
          "Stay Purpose": formData.eventType,
          "Notes": formData.requirements || "None",
        }),
      });

      if (response.ok) {
        setStatus({ submitting: false, succeeded: true, error: null });
      } else {
        const data = await response.json();
        if (data.errors) {
          setStatus({
            submitting: false,
            succeeded: false,
            error: data.errors.map((err: { message: string }) => err.message).join(", "),
          });
        } else {
          setStatus({
            submitting: false,
            succeeded: false,
            error: "An error occurred. Please check your information and try again.",
          });
        }
      }
    } catch {
      setStatus({
        submitting: false,
        succeeded: false,
        error: "Unable to submit your inquiry. Please check your internet connection and try again.",
      });
    }
  };

  const stayLengthText = formData.customDuration || "Flexible Duration";

  if (status.succeeded) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-5 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="mt-6 text-2xl font-medium text-stone-900 tracking-tight">Inquiry Submitted</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-stone-600 leading-relaxed">
          Thank you, <span className="font-semibold text-stone-900">{formData.name}</span>. We have received your stay request. 
          A member of our team will contact you at <span className="font-medium text-stone-900">{formData.email}</span> to confirm availability.
        </p>

        {/* Summary Details */}
        <div className="mt-8 rounded-xl border border-stone-200 bg-stone-50 p-4 text-left max-w-md mx-auto sm:p-5">
          <p className="text-[0.7rem] uppercase tracking-wider text-stone-400 font-bold border-b border-stone-200 pb-2 mb-3">
            Inquiry Summary
          </p>
          <div className="space-y-2.5 text-xs text-stone-700">
            <div className="flex justify-between">
              <span className="text-stone-500">Dates:</span>
              <span className="font-medium">
                {formData.flexibleDates 
                  ? `Flexible: ${stayLengthText} in ${formData.flexibleMonth}`
                  : formData.checkIn && formData.checkOut 
                    ? `${formData.checkIn} to ${formData.checkOut}` 
                    : "To be coordinated"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Guests & Purpose:</span>
              <span className="font-medium">
                {formData.guests || "Unspecified"} Guests – {formData.eventType}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setFormData({
              name: "",
              email: "",
              phone: "",
              checkIn: "",
              checkOut: "",
              flexibleDates: false,
              flexibleLength: "1 Week",
              customDuration: "",
              flexibleMonth: "Summer 2026",
              guests: "",
              eventType: "Vacation",
              requirements: "",
            });
            setStatus({ submitting: false, succeeded: false, error: null });
          }}
          className="mt-8 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-800 transition underline underline-offset-4"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-stone-200/80 bg-[#f4f1ea] p-4 shadow-sm sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="flex h-5 items-center text-[0.68rem] font-extrabold uppercase tracking-wider text-stone-900">
              Full Name <span className="text-red-500 text-lg font-extrabold ml-1 align-middle">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              className="w-full h-[46px] rounded-lg border border-stone-200 bg-white px-4 text-base md:text-sm text-stone-900 placeholder-stone-400 transition focus:border-stone-400 focus:outline-none focus:ring-0"
            />
          </div>
 
          {/* Email Address */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="flex h-5 items-center text-[0.68rem] font-extrabold uppercase tracking-wider text-stone-900">
              Email Address <span className="text-red-500 text-lg font-extrabold ml-1 align-middle">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Your email address"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full h-[46px] rounded-lg border border-stone-200 bg-white px-4 text-base md:text-sm text-stone-900 placeholder-stone-400 transition focus:border-stone-400 focus:outline-none focus:ring-0"
            />
          </div>
        </div>
 
        {/* Row 2: Phone, Purpose, Guests */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {/* Phone (Optional) */}
          <div className="space-y-1.5">
            <label htmlFor="phone" className="flex h-5 items-center text-[0.68rem] font-extrabold uppercase tracking-wider text-stone-900">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              className="w-full h-[46px] rounded-lg border border-stone-200 bg-white px-4 text-base md:text-sm text-stone-900 placeholder-stone-400 transition focus:border-stone-400 focus:outline-none focus:ring-0"
            />
          </div>
 
          {/* Purpose of Stay */}
          <div className="space-y-1.5">
            <label htmlFor="eventType" className="flex h-5 items-center text-[0.68rem] font-extrabold uppercase tracking-wider text-stone-900">
              Purpose of Stay <span className="text-red-500 text-lg font-extrabold ml-1 align-middle">*</span>
            </label>
            <div className="relative">
              <select
                id="eventType"
                name="eventType"
                required
                value={formData.eventType}
                onChange={handleChange}
                className="w-full h-[46px] appearance-none rounded-lg border border-stone-200 bg-white px-4 pr-10 text-base md:text-sm text-stone-900 transition focus:border-stone-400 focus:outline-none focus:ring-0"
              >
                <option value="Vacation">Vacation / Stay</option>
                <option value="Wedding">Wedding</option>
                <option value="Corporate Retreat">Corporate Retreat</option>
                <option value="Family Gathering">Family Gathering</option>
                <option value="Other Event">Other Event</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
 
          {/* Guest Count Input Box */}
          <div className="space-y-1.5">
            <label htmlFor="guests" className="flex h-5 items-center text-[0.68rem] font-extrabold uppercase tracking-wider text-stone-900">
              Total Guests
            </label>
            <input
              type="text"
              id="guests"
              name="guests"
              placeholder="e.g. 12"
              value={formData.guests}
              onChange={handleChange}
              className="w-full h-[46px] rounded-lg border border-stone-200 bg-white px-4 text-base md:text-sm text-stone-900 placeholder-stone-400 transition focus:border-stone-400 focus:outline-none focus:ring-0"
            />
          </div>
        </div>
 
        {/* Row 3: Check-in / Out Dates Block with Airbnb Flexible Selector */}
        <div className="space-y-1.5">
          <label className="flex h-5 items-center text-[0.68rem] font-extrabold uppercase tracking-wider text-stone-900">
            Requested Stay
          </label>
          <div className="rounded-xl border border-stone-200/60 bg-white/60 p-4">
            {!formData.flexibleDates ? (
              /* Specific Dates Mode */
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Check-In */}
                  <div className="space-y-1.5">
                    <label htmlFor="checkIn" className="flex h-5 items-center text-[0.68rem] font-extrabold uppercase tracking-wider text-stone-900">
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      id="checkIn"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="w-full h-[46px] rounded-lg border border-stone-200 bg-white px-4 text-base md:text-sm text-stone-900 transition focus:border-stone-400 focus:outline-none focus:ring-0"
                    />
                  </div>
 
                  {/* Check-Out */}
                  <div className="space-y-1.5">
                    <label htmlFor="checkOut" className="flex h-5 items-center text-[0.68rem] font-extrabold uppercase tracking-wider text-stone-900">
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      id="checkOut"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      className="w-full h-[46px] rounded-lg border border-stone-200 bg-white px-4 text-base md:text-sm text-stone-900 transition focus:border-stone-400 focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>
 
                {/* Dates Flexible Checkbox */}
                <div className="flex items-center gap-2 pt-1.5">
                  <input
                    type="checkbox"
                    id="flexibleDates"
                    name="flexibleDates"
                    checked={formData.flexibleDates}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-500 cursor-pointer"
                  />
                  <label htmlFor="flexibleDates" className="text-xs font-semibold text-stone-700 select-none cursor-pointer">
                    My dates are flexible
                  </label>
                </div>
              </div>
            ) : (
              /* Flexible Stay Estimate Mode (Airbnb Style) */
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Stay Length */}
                  <div className="space-y-1.5">
                    <label htmlFor="customDuration" className="flex h-5 items-center text-[0.68rem] font-extrabold uppercase tracking-wider text-stone-900">
                      Length of Stay
                    </label>
                    <input
                      type="text"
                      id="customDuration"
                      name="customDuration"
                      placeholder="e.g. 1 week, 10 days"
                      value={formData.customDuration}
                      onChange={handleChange}
                      className="w-full h-[46px] rounded-lg border border-stone-200 bg-white px-4 text-base md:text-sm text-stone-900 placeholder-stone-400 transition focus:border-stone-400 focus:outline-none focus:ring-0"
                    />
                  </div>
 
                  {/* Target Month/Season */}
                  <div className="space-y-1.5">
                    <label htmlFor="flexibleMonth" className="flex h-5 items-center text-[0.68rem] font-extrabold uppercase tracking-wider text-stone-900">
                      Target Timeframe
                    </label>
                    <div className="relative">
                      <select
                        id="flexibleMonth"
                        name="flexibleMonth"
                        value={formData.flexibleMonth}
                        onChange={handleChange}
                        className="w-full h-[46px] appearance-none rounded-lg border border-stone-200 bg-white px-4 pr-10 text-base md:text-sm text-stone-900 transition focus:border-stone-400 focus:outline-none focus:ring-0"
                      >
                        <option value="Anytime">Anytime / Flexible</option>
                        <option value="Summer 2026">Summer 2026 (June – Aug)</option>
                        <option value="Autumn 2026">Autumn 2026 (Sept – Nov)</option>
                        <option value="Winter 2026">Winter 2026 (Dec – Feb)</option>
                        <option value="Spring 2027">Spring 2027 (Mar – May)</option>
                        <option value="Summer 2027">Summer 2027 (June – Aug)</option>
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
 
                {/* Dates Flexible Checkbox */}
                <div className="flex items-center gap-2 pt-1.5">
                  <input
                    type="checkbox"
                    id="flexibleDates"
                    name="flexibleDates"
                    checked={formData.flexibleDates}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-500 cursor-pointer"
                  />
                  <label htmlFor="flexibleDates" className="text-xs font-semibold text-stone-700 select-none cursor-pointer">
                    My dates are flexible
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Row 4: Planning Details / Notes */}
        <div className="space-y-1.5">
          <label htmlFor="requirements" className="flex h-5 items-center text-[0.68rem] font-extrabold uppercase tracking-wider text-stone-900">
            How can we help? <span className="text-red-500 text-lg font-extrabold ml-1 align-middle">*</span>
          </label>
          <textarea
            id="requirements"
            name="requirements"
            required
            rows={4}
            placeholder="Your message..."
            value={formData.requirements}
            onChange={handleChange}
            className="w-full rounded-lg border border-stone-200 bg-white p-4 text-base md:text-sm text-stone-900 placeholder-stone-400 transition focus:border-stone-400 focus:outline-none focus:ring-0 resize-none"
          />
        </div>

        {/* Error Feedback */}
        {status.error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-xs text-red-800">
            <p className="font-semibold">Unable to submit form</p>
            <p className="mt-0.5">{status.error}</p>
          </div>
        )}

        {/* Action Buttons (Apple Style, Left-Aligned) */}
        <div className="flex justify-start items-center pt-3">
          {/* Submit Button */}
          <button
            type="submit"
            disabled={status.submitting}
            className="flex items-center justify-center gap-2 rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition duration-200 hover:bg-stone-800 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {status.submitting ? (
              <>
                <svg className="h-4 w-4 animate-spin text-stone-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
