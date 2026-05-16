const errorHandler = (error,req,res,next) => {

    const statusCode = res.statusCode === 200 ? 500  : res.statusCode;  // if response code  = 200 ,then it is server side error, else something else

        res.status(statusCode).json({
            success : false,
            message : error.message
        })
      //  next();
}

export default errorHandler;