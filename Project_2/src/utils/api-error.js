class ApiError extends Error{

    ApiError(status,message ="Something went wrong!!",errors=[],stack=""){

        super(message)
        this.status = status;
        this.message = message;
        this.error = errors;
        this.success = false;
        this.data = null;

        if(stack){
            this.status = stack;
        }else{
            Error.captureStackTrace(this,this.ApiError);
        }
    }
}

export {ApiError}