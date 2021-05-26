import { Client } from "@line/bot-sdk";
import { clientConfig } from "./config/lineConfig";

const client = new Client(clientConfig);

export { client };
