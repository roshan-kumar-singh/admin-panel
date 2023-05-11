const Admin = require('../model/admin');
const jwt = require("jsonwebtoken");
const secretKey = "secretkey";
class adminController  {

    adminRegister = async (req, res) => {
        const { adminName, password } = req.body
        if (password.length < 6) {
          return res.status(400).json({ message: "Password less than 6 characters" })
        }
        try {
          await Admin.create({
            adminName,
            password,
          }).then(user =>
            res.status(200).json({
              message: "User successfully created",
              user,
            })
          )
        } catch (err) {
          res.status(401).json({
            message: "User not successful created",
            error: err.message,
          })
        }
      }

      adminDetails=async(req,res) =>{
        try{
            const allData = await Admin.find();
            return res.json(allData);  
           }
           catch(err){
            console.log(err.message);
           }
        }

    //        adminSignIn = async (req, res) => {

    //         try {
    //             const { adminName, password } = req.body;
    //             const admin = await Admin.findOne({  adminName , password });
    //             jwt.sign({admin},secretKey,{expiresIn:'300s'},(err,token)=>{res.json({token})})    
    //             if (!admin) {
    //               return res.status(401).json({ message: 'admin not found' });
    //             }
    //             // return res.json(user.email);
    //           } catch(err) {
    //             console.log(err.message);
    //           }
    //   }

    adminSignIn = async (req, res) => {
  const { adminName, password } = req.body;
  
  try {
    const admin = await Admin.findOne({ adminName });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Authentication successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
    





}
module.exports = new adminController();