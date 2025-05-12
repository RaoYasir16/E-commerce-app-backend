const Message = require("../models/chatModel");


const saveMessage = async(req,res)=>{
    try {

        const {sender,receiver,message} = req.body


        const newMsg = new Message({sender,receiver,message});
        await newMsg.save();
        return res.status(200).json(newMsg);


    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


const getMessage = async(req,res)=>{
    try {

        const {user1,user2} = req.params;

        const message = await Message.find({
            $or:[
                {sender: user1,receiver:user2},
                {sender:user2,receiver:user1}
            ]
        }).sort({timestamp:1});

        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

module.exports = {saveMessage,getMessage}