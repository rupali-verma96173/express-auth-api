const express = require('express');
const {registerFaculty, getAllFaculties} = require('../controller/facultyController');

const router = express.Router();

router.post("/facultyRegister", registerFaculty);
router.get("/getFaculty", getAllFaculties);

module.exports = router;