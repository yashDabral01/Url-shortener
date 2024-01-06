const {getUser} = require("../service/auth");
async function restrictToLoggedInUserOnly(res,req,next){
    const userUid = res.cookies?.uid;
    if(!userUid) {   // if i didnt get any cookie so i will redirect to do login
        return res.redirect("/login");
    }
    const user = getUser(userUid);   // for getting user object from cookie
    if(!user){
        return res.redirect("/login");
    }
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
}