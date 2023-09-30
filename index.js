import express from "express";
import{ dbConnection,startExpress} from "./service/index.js";

const app = express();
const PORT = 3000;
await dbConnection();
await startExpress(app);
app.listen(PORT, () => {
  console.log("app is runningn on port :", PORT);
});
