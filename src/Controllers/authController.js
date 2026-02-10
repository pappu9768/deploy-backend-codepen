import authModel from '../Models/authModels.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false

            })
        }

        const emailExist = await authModel.findOne({ email })
        if (emailExist) {
            return res.status(400).json({ message: "Email Already Exist", success: false })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new authModel({
            name,
            email,
            password: hashPassword
        })

        const saveUser = await newUser.save();
        return res.status(200).json({
            message: "SignUp successfully Done",
            success: true,
            saveUser
        })


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error found while signup",
            success: false
        })

    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const emailNotExist = await authModel.findOne({ email });
        if (!emailNotExist) {
            return res.status(400).json({
                message: "Email Not found",
                success: false

            })
        }

        const checkPassword = await bcrypt.compare(password, emailNotExist.password);
        if (!checkPassword) {
            return res.status(400).json({
                message: "Invalid Password",
                success: false
            })
        }

        const jwtToken = jwt.sign({ _id: emailNotExist._id, name: emailNotExist.name }, process.env.SECRET_KEY, { expiresIn: '1h' })
        return res.status(200).json({
            message: "Login successfully done",
            success: true,
            jwtToken
        })


    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:"Error found while login",
            Error:error
        })
    }
}