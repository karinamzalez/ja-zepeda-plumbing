import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, phone, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const smsMessage = `New Contact Form Submission:
Name: ${name}
Phone: ${phone}
Message: ${message}

From: J.A. Zepeda Plumbing Website`;

  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;
    const toNumber = process.env.SMS_TARGET_NUMBER || "210-355-2804";

    if (!accountSid || !authToken || !fromNumber) {
      console.log("Twilio credentials not configured. SMS data:", {
        to: toNumber,
        message: smsMessage,
        from: fromNumber
      });
      return res.status(200).json({
        message: "Success",
        smsSent: false,
        note: "Twilio credentials not configured. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER environment variables."
      });
    }

    const client = twilio(accountSid, authToken);

    const result = await client.messages.create({
      body: smsMessage,
      from: fromNumber,
      to: toNumber
    });

    console.log('SMS sent successfully:', result.sid);

    res.status(200).json({
      message: "Success",
      smsSent: true,
      twilioSid: result.sid
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
