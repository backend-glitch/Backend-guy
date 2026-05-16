import mongoose from "mongoose";

export const healthChecker = async(req,res) => {
    try{
        const dbState = mongoose.connection.readyState;

        const dbStatus = dbState === 1 ? "Connected" : "Disconnected";

        return res.status(200).json({
            success : true,
            message : "Server is running .",
            uptime : process.uptime(),
            database : dbStatus,
        })
    }catch(error){
        return res.status(500).jsin({
            success : false,
            message : error.message,
            database : dbStatus
        })
    }
}