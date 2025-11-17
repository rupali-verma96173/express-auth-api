const {Faculty} = require('../model/facultyModel.js');

const registerFaculty = async (req,res) => {
    const {name, email, password} = req.body;
    const faculty = await Faculty.create({name, email, password});
res.status(201).json({faculty});
};

const getAllFaculties = async (req,res) => {
    console.log("All faculties fetched successfully");
    res.status(200).json({message:"All faculties fetched successfully"});
};
module.exports = {registerFaculty, getAllFaculties};