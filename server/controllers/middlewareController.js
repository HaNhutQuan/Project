const User = require("../models/User");
const jwt = require("jsonwebtoken");

const middlewareController = {
      verifyToken: async (req, res, next) => {
            try {
                  const token = req.header("Authorization");
                  
                  if(!token) return res.status(400).json({msg: "Invalid Authentication."});
                  
                  // Ex: Authorization: Bearer asdasd1123123sd 
                  const accessToken = token.split(" ")[1];
                 
                  const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
                  if(!decoded) return res.status(400).json({msg: "Invalid Authentication."});
          
                  const user = await User.findOne({_id: decoded.id});
                  
                  req.user = user;
                  next();
              } catch (err) {
                  return res.status(500).json({message: err.message});
              }
      },
     
};

module.exports = middlewareController;