import { NextRequest, NextResponse } from "next/server";

// POST /api/community/volunteer
// Body: { name, email, phone, skills, message, projectTitle }

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, skills, message, projectTitle } = body;

        if (!name || !email || !phone || !projectTitle) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }

        // ── Optional: send confirmation email via Resend ───────────────────────
        // Install resend: npm install resend
        // Add RESEND_API_KEY to .env.local to enable email sending
        if (process.env.RESEND_API_KEY) {
            try {
                // Dynamic require avoids compile error when package is not installed
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                const { Resend } = require("resend");
                const resend = new Resend(process.env.RESEND_API_KEY);
                await resend.emails.send({
                    from: "BUFC Community <noreply@bufc.com>",
                    to: email,
                    subject: `Volunteer Registration Confirmed — ${projectTitle}`,
                    html: `
                        <h2>Thank you for volunteering, ${name}!</h2>
                        <p>We have received your registration for <strong>${projectTitle}</strong>.</p>
                        <p>Our team will reach out within 48 hours at this email or on ${phone}.</p>
                        ${skills ? `<p><strong>Skills you offered:</strong> ${skills}</p>` : ""}
                        ${message ? `<p><strong>Your message:</strong> ${message}</p>` : ""}
                        <p>Thank you for supporting the Bechem United community! 💛</p>
                    `,
                });
            } catch (emailErr) {
                // Email sending failure should not block the registration
                console.error("Email send failed:", emailErr);
            }
        }

        // ── Optional: save to database or Sanity ─────────────────────────────
        // await sanityClient.create({ _type: 'volunteerApplication', name, email, phone, skills, message, projectTitle });

        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        console.error("Volunteer API error:", err);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
