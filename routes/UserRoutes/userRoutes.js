const express = require('express');
const { protect } = require('../../middlewears/authMiddlewear');
const { registerUser, authUser, registerMovieAdmin, authMovieAdmin, getMovieAdminById, DeleteAdmin, UpdateAdmin, getSystemAdminById } = require('../../UserControllers/UserControllers');
const router = express.Router();

router.route("/").post(registerUser);
router.route("/adminregister").post(registerMovieAdmin);
router.route("/login").post(authUser);
router.route("/loginMovieAdmin").post(authMovieAdmin);
router.route("/:id").get(getMovieAdminById)
router.route("/:id").delete(DeleteAdmin)
router.route("/:id").put(UpdateAdmin)
router.route("/getadmin/:id").get(getSystemAdminById)



module.exports = router