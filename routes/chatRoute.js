const express = require("express");
const router = express.Router();


const {saveMessage,getMessage} = require("../controllers/chatController");

router.post('/chat/message',saveMessage);
router.get('/chat/message/:user1/:user2',getMessage);

module.exports = router