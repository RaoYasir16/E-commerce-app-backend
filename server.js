const express = require("express");
const http = require("http")
const { Server } = require("socket.io");
const dotenv = require("dotenv").config();
const path = require('path');
const db = require("./config/db");
const authRoutes = require("./routes/authRoute");
const categoryRoutes = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const addToCart = require("./routes/addToCartRoute");
const orderRoute = require("./routes/orderRoute");
const chatRouter = require("./routes/chatRoute");

const socketHandler = require("./socket/socketManager")

const app = express();


const  server =http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});
socketHandler(io);


app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// Routes
app.use("/", authRoutes);
app.use("/", categoryRoutes);
app.use("/",productRoute);
app.use("/",addToCart);
app.use("/",orderRoute);
app.use("/",chatRouter)

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Start server
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
    db();
});

