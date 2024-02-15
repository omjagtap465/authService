const authValidation = (req,res,next)=> {
    if(!req.body.email || !req.body.password )
    {
        return res.status(400).json({
            success:false,
            data:{},
            error:"Email or password is Invalid",
            message:"Something went wrong"


        })
    }
    next()
}
module.exports = {
    authValidation
}