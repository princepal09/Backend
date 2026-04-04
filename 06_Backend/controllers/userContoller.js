// const User = require("../models/User");

// exports.createUser = async (req, res) => {
//   try {
//     const { name, email, age } = req.body;
//     console.log(req.body);
//     if (!name || !email || !age) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are mandatory",
//       });
//     }

//     const postData = await User.create({ name, email, age });
//     if (!postData) {
//       return res.status(404).json({
//         status: false,
//         message: "User Not Found",
//       });
//     }

//     return res.status(201).json({
//       success: true,
//       post: postData,
//       message: "Created post successfully!",
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Error while creating the post ",
//       error: err.message,
//     });
//   }
// };

// exports.getAllUser = async (req, res) => {
//   try {
//     const allUser = await User.find({});
//     console.log(allUser);
//     if (!allUser) {
//       return res.status(404).json({
//         success: false,
//         data: allUser,
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       message: "Fetched users successfully",
//       data: allUser,
//     });
//   } catch (err) {
//     return res.json(500).json({
//       success: false,
//       message: "Error while getting the user ",
//     });
//   }
// };

// exports.getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userData = await User.findById(id);
//     if (!userData) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Fetched users successfully",
//       user: userData,
//     });
//   } catch (err) {
//     return res.json(500).json({
//       success: false,
//       message: "Error while getting the user ",
//     });
//   }
// };

// exports.updatedUser = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { name, email } = req.body;

//     if (!name || !id || !email) {
//       return res.status(400).json({
//         success: false,
//         message: "Fields are mandatory",
//       });
//     }

//     const updatedData = await User.findByIdAndUpdate(
//       id,
//       {
//         $set: {
//           name: name,
//           email: email,
//         },
//       },
//       { new: true },
//     );

//     if (!updatedData) {
//       return res.status(404).json({
//         success: false,
//         message: "Data not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       newData: updatedData,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Error while getting the user ",
//       err: err.message,
//     });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const id = req.params.id;
//     if (!id) {
//       return res.status(400).json({
//         success: false,
//         message: "Bad request",
//       });
//     }
//     await User.findByIdAndDelete(id);

//     return res.status(200).json({
//       success: true,
//       message: "Successfully delete user",
//     });
//   } catch (err) {
//     return res.json(500).json({
//       success: false,
//       message: "Error while getting the user ",
//     });
//   }
// };