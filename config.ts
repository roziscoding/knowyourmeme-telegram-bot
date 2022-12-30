export const TELEGRAM_TOKEN = Deno.env.get("TELEGRAM_TOKEN") ?? "";
export const WEBHOOK_SECRET = TELEGRAM_TOKEN.replace(/[^0-9a-z]/ig, "");
