import { TELEGRAM_TOKEN, WEBHOOK_SECRET } from "./config.ts";
import { Api } from "https://deno.land/x/grammy@v1.12.5/mod.ts";

const api = new Api(TELEGRAM_TOKEN);

const result = await api.setWebhook(Deno.args[0], {
  secret_token: WEBHOOK_SECRET,
});

console.log({ result });
