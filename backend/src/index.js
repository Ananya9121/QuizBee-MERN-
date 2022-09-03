const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

let server;


mongoose
  .connect(`${config.mongoose.url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server = app.listen(config.port);
    console.log("Database connected", config.port);
  }).catch((err)=>console.log("Unable to connect to Database"));
