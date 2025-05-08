const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function(req, file, cb) {
        const cleanName = file.originalname.replace(/\s+/g, '-'); 
        cb(null, `${Date.now()}-${cleanName}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|png|jpg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only .jpeg, .png, .jpg files are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter }); 

module.exports = upload;
