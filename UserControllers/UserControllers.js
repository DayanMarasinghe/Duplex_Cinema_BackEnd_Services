const expressAsyncHandler = require("express-async-handler");
const systemadmin = require("../model/systemadmin");
const movieadmin = require("../model/movieadmin");
const generateToken  = require("../utils/generateToken");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, username, password, pic } = req.body;

  const userExists = await systemadmin.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await systemadmin.create({
    name,
    email,
    username,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      password: user.password,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("eroor");
  }
});

const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await systemadmin.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token : generateToken(user._id)
      
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });


  const registerMovieAdmin = expressAsyncHandler(async (req, res) => {
    const { full_name, address, nic, email, password } = req.body;
  
    const userExists = await movieadmin.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User Already Exists");
    }
  
    const user = await movieadmin.create({
      full_name,
      address,
      nic,
      email,
      password,
     
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        full_name: user.full_name,
        address: user.address,
        nic: user.nic,
        email: user.email,
        password: user.password,
      });
    } else {
      res.status(400);
      throw new Error("eroor");
    }
  });


  const authMovieAdmin = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await movieadmin.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        full_name: user.full_name,
        address : user.address,
        nic : user.nic,
        email: user.email,
        password : user.password,
        token : generateToken(user._id)
      
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });

  const getMovieAdmins = expressAsyncHandler (
    async(req, res) => {
      const admins = await movieadmin.find()
      res.json(admins)
    }
  )

  // const CreateNote = asyncHandler(async (req, res) => {
  //   const { title, content, category } = req.body;
  
  //   if (!title || !content || !category) {
  //     res.status(400);
  //     throw new Error("Please Fill all the feilds");
  //     return;
  //   } else {
  //     const note = new Note({ user: req.user._id, title, content, category });
  
  //     const createdNote = await note.save();
  
  //     res.status(201).json(createdNote);
  //   }
  // });

  const getMovieAdminById = expressAsyncHandler(async (req, res) => {
    const note = await movieadmin.findById(req.params.id);
  
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  

  });

  const getSystemAdminById = expressAsyncHandler(async (req, res) => {
    const note = await systemadmin.findById(req.params.id);
  
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  

  });

const DeleteAdmin = expressAsyncHandler(async (req, res) => {
    const note = await movieadmin.findById(req.params.id);
  
    // if (note.user.toString() !== req.user._id.toString()) {
    //   res.status(401);
    //   throw new Error("You can't perform this action");
    // }
  
    if (note) {
      await note.remove();
      res.json({ message: "Admin Removed" });
    } else {
      res.status(404);
      throw new Error("Admin not Found");
    }
  });

  const UpdateAdmin = expressAsyncHandler(async (req, res) => {
    const { full_name, address, nic, email } = req.body;
  
    const note = await movieadmin.findById(req.params.id);
  
    // if (note.user?.toString() !== req.user._id.toString()) {
    //   res.status(401);
    //   throw new Error("You can't perform this action");
    // }
  
    if (note) {
      note.full_name = full_name;
      note.address = address;
      note.nic = nic;
      note.email = email;
     
  
      const updatedNote = await note.save();
      res.json(updatedNote);
    } else {
      res.status(404);
      throw new Error("Admin not found");
    }
  });

module.exports = { registerUser, authUser, registerMovieAdmin,getSystemAdminById,  authMovieAdmin, getMovieAdminById, DeleteAdmin, UpdateAdmin };
