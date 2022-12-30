import { TELEGRAM_TOKEN, WEBHOOK_SECRET } from "./config.ts";
import { Api } from "https://deno.land/x/grammy@v1.12.5/mod.ts";

const api = new Api(TELEGRAM_TOKEN);
const url = Deno.args[0];

console.log(`Setting webhook to "${url}"`);

const result = await api.setWebhook(url, { secret_token: WEBHOOK_SECRET });

console.log({ result });
