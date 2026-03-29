import { ApiResponse } from "../utils/api-response.js";

const healthCheck = async (req,res,next) =>{


    try{

        const user = await getUserfromDB();
        res
        .status(200)
        .json(new ApiResponse(200,{message:"Server is running"}));

    }catch(error){}
};

export {healthCheck}