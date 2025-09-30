import axios from "axios";

export default async function handler(req, res) {
  // Health check for GET requests
  if (req.method === "GET") {
    return res.status(200).json({ status: "✅ Send OTP API is alive" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: "Phone number required" });
  }

  try {
    const API_KEY ='29da840b-9d49-11f0-b922-0200cd936042';
    const url = `https://2factor.in/API/V1/29da840b-9d49-11f0-b922-0200cd936042/SMS/916268363536/AUTOGEN`;

    const response = await axios.get(url);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Send OTP failed:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
}
