import "dotenv/config";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createContext } from "./lib/context";
import { appRouter } from "./routers/index";
import cors from "cors";
import express from "express";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "",
    methods: ["GET", "POST", "OPTIONS"],
  })
);


app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext
  })
);


app.use(express.json())

app.post("/ai", async (req, res) => {
  const { messages = [] } = req.body || {};
  const result = streamText({
    model: google("gemini-1.5-flash"),
    messages,
  });
  result.pipeDataStreamToResponse(res);
});

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
