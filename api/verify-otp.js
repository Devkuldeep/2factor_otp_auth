import axios from "axios";

export default async function handler(req, res) {
  // Health check for GET requests
  if (req.method === "GET") {
    return res.status(200).json({ status: "✅ Verify OTP API is alive" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { sessionId, otp } = req.body;
  if (!sessionId || !otp) {
    return res.status(400).json({ error: "sessionId and otp required" });
  }

  try {
    const API_KEY = '29da840b-9d49-11f0-b922-0200cd936042';
    const url = `https://2factor.in/API/V1/${API_KEY}/SMS/VERIFY/${sessionId}/${otp}`;

    const response = await axios.get(url);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Verify OTP failed:", error.response?.data || error.message);
    return res.status(500).json({ error: "OTP verification failed" });
  }
}
