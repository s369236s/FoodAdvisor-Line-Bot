import { WebhookEvent, Client, Message } from "@line/bot-sdk";
import { createFlexMessage } from "./createFlexMessage";
import { ReturnData, textDetector } from "./textDetector";

export const replyHandler = async (
  event: WebhookEvent,
  client: Client
  //@ts-ignore0
): Promise<MessageAPIResponseBase | undefined> => {
  if (event.type !== "message" || event.message.type !== "text") {
    return;
  }
  const { replyToken } = event;
  const { text: userText } = event.message;

  const textCheck: ReturnData = await textDetector(userText);
  let message: Message;

  if (!textCheck.ok) {
    //Check is User Typed undetectable message
    if (!textCheck.errMessage) textCheck.errMessage = "";
    message = {
      type: "text",
      text: textCheck?.errMessage,
    };
  } else {
    const arr: any[] = [];
    if (!textCheck.foundData) {
      //Message that didn't store in database
      message = {
        type: "text",
        text: "無法辨識輸入，提示：可以輸入 ✔ 臭豆腐、 ✔ 雞排、 ✔燒臘等食物類型😊",
      };
    } else {
      //Creating restaurant prop for message
      if (textCheck.type === "restaurant") {
        textCheck.foundData.forEach((data) => {
          const { name, review, address, phone, url: imageUrl } = data.data();
          arr.push({ name, review, address, phone, imageUrl });
        });
      }
      //Creating meal prop for message
      if (textCheck.type === "meal") {
        textCheck.foundData.forEach((data) => {
          const { name, price, url: imageUrl } = data.data();
          arr.push({ name, price, imageUrl });
        });
      }
    }
    message = createFlexMessage(textCheck.type, arr);
  }

  await client
    .replyMessage(replyToken, message)
    .then()
    .catch((err) => console.log("\x1b[33m%s\x1b[0m", err));
};
