const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(fileUpload())

app.use(cors());

app.get("/", (req, res) => {
  res.json("Welcome to Article hub backend - testing  ");
});

const articleRoutes = require("./routes/articleRoutes");
const userRoutes = require("./routes/userRoutes"); 

app.use("/article", articleRoutes);
app.use("/user", userRoutes); 

//mapping media directory
app.use('/media',express.static(__dirname + '/media'))

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
