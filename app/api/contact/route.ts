import { NextResponse } from "next/server";
import { sendEmailWithEmailJs } from "./contact.emailjs";
import { CONTACT_ERRORS, ContactRequestError } from "./contact.errors";
import { assertRateLimit } from "./contact.rate-limit";
import { assertFormTiming, getClientIp, parseContactBody } from "./contact.request";
import { verifyTurnstile } from "./contact.turnstile";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = getClientIp(req);

  try {
    const body = await parseContactBody(req);
    assertFormTiming(body.formStartedAt);
    assertRateLimit(ip);

    // Silent success for bots that fill honeypot.
    if (body.honeyPot.length > 0) {
      return NextResponse.json({ ok: true });
    }

    await verifyTurnstile(body.turnstileToken, ip);

    await sendEmailWithEmailJs({
      name: body.name,
      email: body.email,
      message: body.message,
      pageUrl: body.pageUrl,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ContactRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error("[api/contact] unexpected failure", error);
    return NextResponse.json({ error: CONTACT_ERRORS.sendFailed }, { status: 502 });
  }
}
