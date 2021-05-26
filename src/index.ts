import express, { Application, Request, Response } from "express";
import { WebhookRouter } from "./webhook/webhook";
import { db } from "./config/firebaseConfig";

// Check is connected to db,if don't connect to db,server won't start
if (db) {
  const PORT = process.env.PORT || 3000; //Heroku port or localhost 3000 port

  const app: Application = express();

  app.get("/", async (_: Request, res: Response): Promise<Response> => {
    return res.status(200).json({
      status: "success",
      message: "Connected successfully!",
    });
  });

  //api route
  app.use("/api", WebhookRouter);

  app.listen(PORT, () => {
    console.log(`Application is live and listening on port ${PORT}`);
  });
} else {
  console.log("failed to connect db and server didn't start");
}

// const createIndex = async () => {
//   await db
//     .collection("restaurants")
//     .where("type", "==", "燒臘")
//     .orderBy("review", "desc")
//     .limit(5)
//     .get();
// };
