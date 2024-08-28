import { UserModel } from "../../../../DB/model/user.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    try {
        const { userName, phone, password } = req.body;
        const user = await UserModel.findOne({ phone: phone })
        if (user) {
            return res.json("تم تسجيل هذا البريد الإلكتروني مسبقًا");

        } else {
            const hash = bcrypt.hashSync(password, parseInt(process.env.saltRound))
            const newUser = await UserModel({ userName, phone, password: hash })
            const saveUser = await newUser.save()
            if (saveUser) {
                return res.status(200).json({ message: "succsses", saveUser })
            } else {
                return res.json('فشل انشاء الحساب')
            }

        }
    } catch (error) {
        res.json({ message: `catch error  ${error}` })
    }
}




export const signin = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await UserModel.findOne({ phone })
        if (!user) {
            return res.json('هذا البريد الإلكتروني غير مسجل')

        } else {
            const match = bcrypt.compare(password, user.password)
            if (!match) {
                res.json('يرجى التأكد من صحة كلمة المرور ')
            } else {

                const token = jwt.sign({ id: user._id, phone, userName: user.userName, role: user.role }, process.env.TokenSignIn, { expiresIn: 60 * 60 * 24 })
                res.status(200).json({ message: "sucsses", token })
            }
        }
    } catch (error) {
        res.json(`catch error ${error}`)
    }

}

