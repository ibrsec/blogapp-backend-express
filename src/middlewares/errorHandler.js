module.exports = (err,req,res,next)=>{
    const statusCode = res.statusCode ? (res.statusCode === 200 ? 500 : res.statusCode)  : 500;
    res.status(statusCode).json({
        error:true,
        message:err.message,
        stack:err.cause,
        stack:err.stack,
    })
}