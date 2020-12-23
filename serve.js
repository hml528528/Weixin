const Koa = require('koa');
const app = new Koa();
const mongo = require("koa-mongo")
const koaStatic = require("koa-static");
const path = require("path");
const homeRouter = require("./pages/home")
const categoryRouter = require("./pages/category")
const albumRouter = require("./pages/album")
const videoRouter = require("./pages/video")
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.body = JSON.stringify({ code: 2, data: null, msg: error.message })
  }
})
app.use(mongo({
  // url: "mongodb://root:root@localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256&3t.uriVersion=3&3t.connection.name=t"
  uri: "mongodb://root:root@localhost:27017/dnpicture2?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256&3t.uriVersion=3&3t.connection.name=t"
}))


app.use(koaStatic(path.join(__dirname, "public")));
app.use(homeRouter.routes());
app.use(categoryRouter.routes());
app.use(albumRouter.routes());
app.use(videoRouter.routes());

app.listen(3000);