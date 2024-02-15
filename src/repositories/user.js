const { User, Role } = require('../models/index');
const ClientError = require('../utils/client-error');
const ValidationError = require('../utils/validation-error')
const StatusCodes  = require('http-status-code');
class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data);

            return user;
        } catch (error) {

            if (error.name == 'SequelizeValidationError') {
                console.log('Creating New Validation Error');
                let validationError = new ValidationError(error)
                throw validationError
            }
            console.log("Error", error);
            throw error;

        }
    }

    async getByEmail(email) {
        try {

            const user = await User.findOne({ where: { email: email } })
            if (!user) {
                let error = new ClientError("User Credentials", "Invalid Email", "Please Check the Email",StatusCodes.NOT_FOUND)
                throw error
            }
            console.log(user);
            return user
        } catch (error) {
            throw error
        }

    }
    async getById(id) {
        try {

            const user = await User.findByPk(id)
            console.log(user);
            return user
        } catch (error) {
            throw error
        }

    }
    async isAdmin(id) {
        try {
            const user = await User.findByPk(id)
            console.log(Role);
            const adminRole = await Role.findOne({
                where:
                    { name: "ADMIN" }
            });
            console.log(adminRole);
            const isAdmin = user.hasRole(adminRole)
            // console.log(user);
            return isAdmin
        } catch (error) {
            throw error
        }

    }

}
module.exports = UserRepository