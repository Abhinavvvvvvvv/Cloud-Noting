const express = require('express')
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require('../middleware/fetchuser')

// ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    const notes = await Notes.find({user: req.user.id})
    res.jso
    res.json([])    
})

module.exports = router