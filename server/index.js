import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import productRoutes from "./routes/products.js";

const app = express();
const port = 7000;

app.use(bodyParser.json());
app.use(cors());

app.use("/", productRoutes);

app.all("*", (req, res, next) => {
  res.send("This route doesn't exist");
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
