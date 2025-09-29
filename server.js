import express from "express";
import router from "./src/routes/index.js";

const app = express();
app.use(express.json());
app.use(router);

app.listen(8081, () => {
    console.log("Running on port 8081");
});