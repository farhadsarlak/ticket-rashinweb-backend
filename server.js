const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const multer= require('multer');

const { connectToDB } = require("./utils/database");

const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");
const orderRoutes = require("./routes/order");

const { setHeaders } = require("./middlewares/headers");
const { errorHandler } = require("./middlewares/errors");

const app = express();
const upload = multer();
//──── Server Port
const port = process.env.PORT || 4000;

//──── Static Folder
app.use("/images", express.static(path.join(__dirname, "public", "images")));

//──── Middlewares
app.use(bodyParser.json());
app.use(setHeaders);

//──── Routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", orderRoutes);

app.post("/file",upload.single('file'),(req,res)=>{
    console.log('body',req.file.lenght, req.file);
    res.json({ success:true })
})

//──── Error Handler Middleware
app.use(errorHandler);

//──── Connecting To Database
connectToDB()
    .then(result => {
        console.log(`Connected To Database`);
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
