const User = require("../models/usersModel")
const bcrypt = require('bcryptjs')

exports.signUp = async ( req, res, next ) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash( password, 12 )
    try{
       const newUser = await User.create({
        username,
        password: hashedPassword
       })

       req.session.user = newUser
       res
       .status(200)
       .json({
        status: 'success',
        data: {
            user: newUser
        }
       })
    }catch(error){
        res.status(400).json({
            status: 'failed'
        })
    }
}

exports.login = async ( req, res, next ) => {
    const { username, password } = req.body;

    const user = await User.findOne( { username } )
    
    if( !user ) {
        return res.status(400).json({
            status: 'failed',
            message: 'user not found'
        })
    }
    const isPasswordCurrect = bcrypt.compare( password, user.password )

    if( isPasswordCurrect ){
        req.session.user = user
        return res.status(200).json({
            status: 'success'
        })
    }else{
        return res.status(400).json({
            status: 'failed',
            message: 'incurrect password or username'
        })
    }

}