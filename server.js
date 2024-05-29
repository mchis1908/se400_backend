const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const ProductRoute = require("./routes/productRoute");
const imageUpload = require("./routes/image-server");

require('dotenv').config();

const app = express();
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("Connected to database!");
}).catch(err => {
  console.log("Connection failed: " + err);
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


app.use("/api/v1/products", ProductRoute);
app.use("/image-server", imageUpload)

app.listen(process.env.PORT, () => {
  console.log('Server is listening on port '+ process.env.PORT);
});
