import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const API_KEY = '29da840b-9d49-11f0-b922-0200cd936042'; // keep secret in Vercel env

// Send OTP
app.post("/", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: "Phone number required" });

    const url = `https://2factor.in/API/V1/${API_KEY}/SMS/${phone}/AUTOGEN`;
    const response = await axios.get(url);

    return res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
});

export default app;
