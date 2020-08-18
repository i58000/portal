import { signOut } from "./dispatcher";

export default function(ctx) {
  console.log("onclose", ctx);

  console.log("unsubscribe", ctx.subscribers);
  signOut(ctx);
}
