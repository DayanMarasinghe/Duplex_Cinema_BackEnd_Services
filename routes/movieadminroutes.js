const express = require("express");
const router = express.Router();
const MovieAdmin = require("../model/movieadmin");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const Movie = require("../model/movie");

async function getMovie(req, res, next) {
  let admin;

  try {
    admin = await MovieAdmin.findById(req.params.id);
    if (admin == null) {
      return res.status(404).json({ message: "Cannot find movie" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.admin = admin;

  //if specific movie is found relevent endpoint will be called
  next();
}

/**
 * @router - get all the movie admins in the system
 */
router.get("/viewMovieAdmins", async (req, res) => {
  try {
    const movieAdmins = await MovieAdmin.find();
    res.json(movieAdmins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @router - register movieadmin to the system
 */

router.post(
  "/addMovieAdmin",
  [
    check("email", "Invalid Email").isEmail(),
    check("password", "password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const movieadmin = new MovieAdmin({
        full_name: req.body.full_name,
        address: req.body.address,
        nic: req.body.nic,
        email: req.body.email,
        password: hash,
      });

      //validate user inputs
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      MovieAdmin.findOne({ email: req.body.email })
        .then((user) => {
          if (user) {
            res.send({ message: "Email aready in use" });
          } else {
            movieadmin
              .save()
              .then((user) => {
                console.log(user);
                res.send({ message: "Registration Success" });
              })
              .catch((err) => {
                res.send({ message: "user details missing" });
              });
          }
        })
        .catch();
    });
  }
);

/**
 * @router - update/patch one movie using movie id
 */
router.patch("/:id", getMovie, async (req, res) => {
  //check the relevent feild to be updated
  if (req.body.full_name != null) {
    res.admin.full_name = req.body.full_name;
  }
  if (req.body.address != null) {
    res.admin.address = req.body.address;
  }
  if (req.body.nic != null) {
    res.admin.nic = req.body.nic;
  }
  if (req.body.email != null) {
    res.admin.email = req.body.email;
  }
  // if (req.body.password != null) {
  //   res.admin.password = req.body.password;
  // }

  try {
    const updatedAdmin = await res.admin.save();
    res.json(updatedAdmin);
  } catch (err) {
    res.status(400).json({ updatedAdmin });
  }
});

/**
 * @router - delete movieAdmin
 */
// router.delete("/deleteAdmin/:adminName", async (req, res) => {
//   let movieadmin;
//   try {
//     movieadmin = await MovieAdmin.find({ full_name: req.params.adminName });
//     if (movieadmin == "") {
//       return res.status(404).json({ message: "Cannot find movie" });
//     } else {
//       await MovieAdmin.findOneAndDelete({ full_name: req.params.adminName });
//       res.json({ message: "Movie Admin is Deleted" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

/**
 * @router - delete admin
 */
router.delete("/:id", getMovie, async (req, res) => {
  try {
    await res.admin.remove();
    res.json({ message: "Deleted Movie Admin" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
