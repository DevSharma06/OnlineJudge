require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const problemRoutes = require("./routes/problems");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/api/problems", problemRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & listening on port ", process.env.PORT);
    });
  })
  .catch((e) => {
    console.log(e);
  });
