import "../instrument.mjs";
import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { inngest, functions } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";

import * as Sentry from "@sentry/node";

const app = express();

app.use(express.json());
app.use(clerkMiddleware()); //req.auth will be available in the request object

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

app.get("/debug-sentry", (res, req) => {
  throw new Error("First Sentry error!");
});

// app.get("/debug-sentry", function mainHandler(req, res) {
//   throw new Error("My first Sentry error!");
// });

app.get("/", (req, res) => {
  res.send("Hello world!");
});

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log("server started on ports:", ENV.PORT);
      });
    }
  } catch (error) {
    console.error("Error Starting the server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
