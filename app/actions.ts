"use server";

import { contactFormSchema, type ActionResult } from "@/types";
import { resend } from "@/lib/resend";

export async function sendContactEmail(
  formData: unknown
): Promise<ActionResult> {
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? "Dados inválidos";
    return { success: false, error: firstError };
  }

  const { name, email, subject, message } = parsed.data;

  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL!,
    reply_to: email,
    subject: `[Portfolio] ${subject}`,
    html: `
      <h2>Nova mensagem de contato</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Assunto:</strong> ${subject}</p>
      <hr />
      <p><strong>Mensagem:</strong></p>
      <p>${message.replace(/\n/g, "<br />")}</p>
    `,
  });

  if (error) {
    return { success: false, error: "Falha ao enviar mensagem. Tente novamente." };
  }

  return { success: true };
}
