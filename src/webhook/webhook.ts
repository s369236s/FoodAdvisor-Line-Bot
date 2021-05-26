import express, { Request, Response } from "express";
import { middleware, WebhookEvent } from "@line/bot-sdk";
import { client } from "../client";
import { middlewareConfig } from "../config/lineConfig";
import { replyHandler } from "../handler/replyHandler";

const router = express.Router();

// Line/bot-sdk webhook
router.post(
  "/webhook",
  middleware(middlewareConfig),
  async (req: Request, res: Response): Promise<Response> => {
    const events: WebhookEvent[] = req.body.events;

    const results = await Promise.all(
      //@ts-ignore
      events.map(async (event: WebhookEvent) => {
        try {
          // catch event and send it to replyHandler
          await replyHandler(event, client);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err);
          }

          return res.status(500).json({
            status: "error",
          });
        }
      })
    );
    return res.status(200).json({
      status: "success",
      results,
    });
  }
);

export const WebhookRouter = router;
