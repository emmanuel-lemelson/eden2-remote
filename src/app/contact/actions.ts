'use server';

import { z } from "zod";
import { Resend } from "resend";

export type FormState = {
  success?: boolean;
  errors?: Record<string, string>;
  message?: string;
};

const contactSchema = z.object({
  name: z.string().min(1, "Please share your name."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email."),
  phone: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guestsAdults: z.string().optional(),
  guestsChildren: z.string().optional(),
  events: z.array(z.string()).optional(),
  message: z.string().min(1, "Tell us a bit about your stay."),
  token: z.string().optional(),
});

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const contactEmail = process.env.EDEN_CONTACT_EMAIL ?? "hello@edenstowe.com";

export async function submitInquiry(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const payload = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() || undefined,
    checkIn: formData.get("checkIn")?.toString() || undefined,
    checkOut: formData.get("checkOut")?.toString() || undefined,
    guestsAdults: formData.get("guestsAdults")?.toString() || undefined,
    guestsChildren: formData.get("guestsChildren")?.toString() || undefined,
    events: formData.getAll("events").map(String).filter(Boolean),
    message: formData.get("message")?.toString() ?? "",
    token: formData.get("token")?.toString() || undefined,
  };

  const parsed = contactSchema.safeParse({
    ...payload,
    events: payload.events.length ? payload.events : undefined,
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") {
        errors[key] = issue.message;
      }
    }
    return {
      success: false,
      errors,
      message: "Please review the highlighted fields.",
    };
  }

  const data = parsed.data;

  if (data.token) {
    return {
      success: true,
      message: "Thank you. We'll be in touch shortly.",
    };
  }

  const formattedBody = `New inquiry received for Eden Estate:\n\n` +
    `Name: ${data.name}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phone ?? "N/A"}\n` +
    `Check-in: ${data.checkIn ?? "N/A"}\n` +
    `Check-out: ${data.checkOut ?? "N/A"}\n` +
    `Adults: ${data.guestsAdults ?? "N/A"}\n` +
    `Children: ${data.guestsChildren ?? "N/A"}\n` +
    `Events: ${data.events?.join(", ") || "N/A"}\n\n` +
    `Message:\n${data.message}`;

  console.info("[eden] inquiry", {
    ...data,
    message: data.message.substring(0, 120) + (data.message.length > 120 ? "…" : ""),
  });

  if (resend) {
    try {
      await resend.emails.send({
        from: "Eden Estate <hello@edenstowe.com>",
        to: contactEmail,
        replyTo: data.email,
        subject: "New Eden inquiry",
        text: formattedBody,
        html: formattedBody
          .split("\n")
          .map((line) => `<p>${line || "&nbsp;"}</p>`)
          .join(""),
      });
    } catch (error) {
      console.error("[eden] resend error", error);
      return {
        success: false,
        errors: undefined,
        message:
          "We received your inquiry but could not send the confirmation email. Our team will reach out shortly.",
      };
    }
  }

  return {
    success: true,
    errors: undefined,
    message: "Thank you. Our concierge team will reach out within 24 hours.",
  };
}
