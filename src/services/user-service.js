const {UserRepository} = require('../repositories')
const  jwt = require('jsonwebtoken');
const {ServerConfig} = require('../config/index');
const ApiErrors = require('../utils/error-handler');
class UserService {
    constructor() {
      this.UserRepository = new UserRepository();
    }
  
    async createUser(data) {
      try {
        const User = await this.UserRepository.create(data);
        return User;
      } catch (error) {
        if (error.name == 'ValidationError') {
          console.log('Creating  Validation Error');
          
          
          throw error
      }
      
      throw new ApiErrors("ServerError","Sonmething went wrong in service layer","Logical Issue Found",500);
     
      }
    }
    async signIn(user){
    try {
      const response= await this.UserRepository.getByEmail(user.email)
      console.log("Service Layer",response);
      const passwordMatch = await  this.checkPassword(user.password,response.password)
      console.log("Password Match",passwordMatch);
      if(!passwordMatch)
      {
        console.log("Password Doesnt Match");
        throw {error:"Incorrect Password"}
      }
      const newToken = await this.createToken({email:response.email,id:response.id})
      console.log(newToken);
      return newToken
    } catch (error) {
      throw error
    }
    }
    async createToken(user){
      try {
  
        const token = jwt.sign(user, ServerConfig.JWT, { expiresIn: '1h' })
        return token
      } catch (error) {
        console.log("Something went wrong while token Creation");
        throw error
      }
    }
    async isAuthenticated(token){
      try {
        
       const  response = await this.verifyToken(token)
       console.log(response);
       if(!response)
       {
        throw{error:"Wrong token"}
       }
       const user  =await this.UserRepository.getById(response.id)
       if(!user)
       {
        throw{error:"No user found"}
       }
       console.log("User",user);
       return user.id
      } catch (error) {
        console.log("Something went wrong while token Verification");
        throw error
      }
    }
    async verifyToken(token)
    {
      try {
        console.log("Verify-Token",token);
        const tokenVerification = jwt.verify(token, ServerConfig.JWT);
        console.log(tokenVerification);
        return tokenVerification
      } catch (error) {
        throw {error:"Verification Issue"}
      }
    }
    async  checkPassword(password,encryptedPassword){
      try {
        
        const bcrypt = require('bcryptjs');
        const verified  =bcrypt.compareSync(password, encryptedPassword);
        return verified
      } catch (error) {
        console.log("Something went wrong Incorrect Password");
        throw error
      }
    }
    async  isAdmin(user){
      try {
        
        const role  = await this.UserRepository.isAdmin(user.id)
        return role
      } catch (error) {
        console.log("Something went wrong in admin");
        throw error
      }
    }
}
module.exports = UserService