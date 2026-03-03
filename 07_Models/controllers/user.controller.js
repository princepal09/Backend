const User = require('../models/user.model')

exports.createUser = async (req, res) => {
    try {

        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                status: false,
                message: "Name and email are required"
            }
            )
        }

        const user = await User.create({ name, email })

        return res.status(201).json({
            success: true,
            user: user,
            message: "Successfully creatd User",

        })


    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            status: false,
            error: err.message,
            message: "Internal server error"
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { postId } = req.body

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Can't  deleted the user",
            })
        }

        await Post.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Successfully deleted the user"
        })

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            status: false,
            error: err.message,
            message: "Internal server error"
        })
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const users = User.find({});

        if (!users) {
            return res.status(404).json({
                success: false,
                message: "User doesn't exists"
            })
        }

        return res.status(200).json({
            success: true,
            users: users,
            message: "Fetched all users"
        })

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            status: false,
            error: err.message,
            message: "Internal server error"
        })
    }
}