import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const API_KEY = '29da840b-9d49-11f0-b922-0200cd936042'; // keep git secret in Vercel env

app.get("/", (req, res) => {
  res.send("OTP Verification API is running");
});
// Verify OTP
app.post("/", async (req, res) => {
  try {
    const { sessionId, otp } = req.body;
    if (!sessionId || !otp) {
      return res.status(400).json({ error: "sessionId and otp required" });
    }

    const url = `https://2factor.in/API/V1/${API_KEY}/SMS/VERIFY/${sessionId}/${otp}`;
    const response = await axios.get(url);

    return res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({ error: "OTP verification failed" });
  }
});

export default app;
