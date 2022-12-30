import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { webhookCallback } from "https://deno.land/x/grammy@v1.12.5/mod.ts";
import { bot } from "./bot.ts";
import { WEBHOOK_SECRET } from "./config.ts";

serve(webhookCallback(bot, "std/http", { secretToken: WEBHOOK_SECRET }));
