require('dotenv').config(); // dotenv paketini chaqirish

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ProductRoutes = require("./routes/products");
const CategoryRoutes = require("./routes/category");
const UserRouter = require("./routes/users");
const tokenVerify = require("./middlewares/auth");
const path = require('path');

const app = express();
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

const url = process.env.MONGO_URI;

mongoose.connect(url)
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.error("Error connecting to DB", e));

app.use("/products", ProductRoutes);
app.use("/category", CategoryRoutes);
app.use("/auth", UserRouter);

const PORT = 3000;
app.listen(PORT, () => console.log('Server started on port 3000'));
