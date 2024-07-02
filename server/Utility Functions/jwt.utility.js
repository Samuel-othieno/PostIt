 import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { StatusCodes } from 'http-status-codes';



function tokenCheck(req, res, next) {
  if (req.headers.authorization) {
   
    let authHeader = req.headers.authorization;
    let token = authHeader.split(" ")[1];

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET1, (err, decodedToken) => {
        if (err) {
          res.send("Failed to verify token, please try again😊");
        } else {
          req.tokenData= decodedToken
          next()
        }
      });

    } else {
      res.status(StatusCodes.BAD_REQUEST).json({error:"Invalid token! Please try again to proceed"});
    }
  } else {
    res.status(400).send("Token required!");
  }
} 


export default tokenCheck;