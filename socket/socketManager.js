const connectedUsers = new Map();

function socketHandler(io){
    io.on("connection",(socket)=>{
        console.log("A user connected",socket.id);

        socket.on("user-connected",(userId)=>{
            connectedUsers.set(userId,socket.id);
            console.log(`User ${userId} connected with socket ${socket.id}`);
        });

        socket.on("send-message",({from,to,message})=>{
            const receiverSocketId = connectedUsers.get(to);
            if(receiverSocketId){
                io.to(receiverSocketId).emit("receive-message",{from,message});
            }
        });


        socket.on("disconnect",()=>{
            console.log("User disconnected:",socket.id);

            for(let[userId,socketId] of connectedUsers.entries()){

                if(socketId === socket.id){
                connectedUsers.delete(userId);
                break;
            }
        }
        });
    });
}

module.exports = socketHandler