const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const { SECRET_KEY } = process.env

const register = async(req, res) => {
    const { password, email } = req.body
    const user = await User.findOne({ where: { email } })
    if (user) {
        return res.status(400).send('User already exists')
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const result = await User.create({ email, password: hashPassword })
    res.status(201).json({
        status: "success",
        code: 201,
        data: result
    })

}


const login = async (req, res) => {
    try {
        const { email } = req.body;
    const user = await User.findOne({ where: { email } })
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    )
    if (!user || !isValidPassword) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Invalid credentials'
      })
    }
    const id = user.id
    const payload = { id }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
        await User.update({ token }, { where: { id } });
    return res.json({ status: 'success', code: 200, data: { token } })
  } catch (e) {
    console.log(e)
  }
}

const logout = async(req, res) => {
   try {
       const id = req.user.id;
       await User.update({ token: null }, { where: { id } });
        return res.status(204).json({})
   } catch (error) {
    console.log(error)
   }
}

module.exports = {
    register,
    login,
    logout
}