import { bot } from "./bot.ts";

bot.start({
  onStart: (me) => console.log(`Bot listening as @${me.username}`),
});
