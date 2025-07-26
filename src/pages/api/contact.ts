import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Here you would typically send an email using a service like:
    // - SendGrid, Resend, Nodemailer with SMTP, AWS SES, etc.

    console.log("Contact form submission:", { name, email, message });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
