import * as Koa from "koa";
import * as Router from "koa-router";

import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser"
import { createContext } from "node:vm";

const app = new Koa();
const router = new Router();

interface HelloRequest{
    name: string; 
}

// Hello world
router.post("/", async (ctx, next) => {
 const data = <HelloRequest>ctx.request.body; 
  ctx.body = { name: data.name }; 

  await next();
});

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser())

// Routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Koa started");
});