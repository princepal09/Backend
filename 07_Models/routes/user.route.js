const express = require("express")
const router = express.Router();
const {createUser,  deleteUser,  getAllUser} = require("../controllers/user.controller")

/**
 * create User
 */

router.post("/create", createUser)


/**
 * delete User
 */
router.delete("/delete", deleteUser)


/**
 * get all User
 */
router.post("/allUser", getAllUser)



module.exports = router;