const { User } = require('../models')
const bcrypt = require('bcrypt')

const patchSubscription = async(req, res) => {
        const { email, subscription } = req.body;
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
    const id = user.id;
    await User.update({ subscription }, { where: { id } });
    return res.json({status: "success", code: 200, data: user})
}


module.exports = patchSubscription;
