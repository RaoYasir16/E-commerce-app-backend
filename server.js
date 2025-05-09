const express = require("express");
const dotenv = require("dotenv").config();
const path = require('path');
const db = require("./config/db");
const authRoutes = require("./routes/authRoute");
const categoryRoutes = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const addToCart = require("./routes/addToCartRoute");
const orderRoute = require("./routes/orderRoute");

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// Routes
app.use("/", authRoutes);
app.use("/", categoryRoutes);
app.use("/",productRoute);
app.use("/",addToCart);
app.use("/",orderRoute);

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    db();

});
