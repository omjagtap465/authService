const { UserService } = require('../services/index'); // Adjust the path accordingly
const ValidationError = require('../utils/validation-error.js')

const userService = new UserService()

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const User = await userService.createUser({
      email: req.body.email,
      password: req.body.password
    });

    res.status(201).json(User);
  } catch (error) {
    console.error('Error creating User:', error);
    res.status(error.statusCode).json(
      {
        message:error.message,
        data:{},
        error:error.explanation,
        success:false
      }
    );
  }
}
const signIn = async (req, res) => {
  try {
    console.log(req.body);

    const User = await userService.signIn(req.body);

    res.status(201).json(User);
  } catch (error) {

    res.status(500).json({ error: error });
  }
}
const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"]
    console.log(token);
    const response = await userService.isAuthenticated(token)

    res.status(200).json(response);
  } catch (error) {

    res.status(500).json({ error: error });
  }
}
const isAdmin = async (req, res) => {
  try {
    const data = req.body
    console.log(data);
    const response = await userService.isAdmin(data)

    res.status(200).json(response);
  } catch (error) {

    res.status(500).json({ error: error });
  }
}
module.exports = {
  createUser, signIn, isAuthenticated,isAdmin
}