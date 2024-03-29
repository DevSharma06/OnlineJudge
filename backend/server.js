require("dotenv").config();
const path = require('path');

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const problemRoutes = require("./routes/problems");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

//routes
app.use("/api/problems", problemRoutes);
app.use("/api/user", userRoutes);

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
