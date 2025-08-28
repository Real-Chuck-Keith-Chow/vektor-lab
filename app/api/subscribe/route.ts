import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { email } = await req.json().catch(()=>({}));
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ ok:false }, { status:400 });
  }
  // Hook up Mailchimp/Brevo later.
  return NextResponse.json({ ok:true });
}
