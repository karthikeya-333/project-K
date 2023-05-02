const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
var fetchuser = require('../middleware/fetchuser');


router.post("/addMenu", async function (req, res) {

    let { menu, session } = req.body;
    let attendance = [];
    let date = new Date().toLocaleDateString();
    try {
        let oldMenu = await Session.findOne({ date: date, session: session });
        if (oldMenu) {
            let savedMenu = await Session.findOneAndUpdate({date: date, session: session },{menu});
            res.send({"menu":savedMenu.menu});
        }
        else {
            const newMenu = new Session({
                menu, session, date, attendance
            })
            const savedMenu = await newMenu.save();
            res.send({"menu":savedMenu.menu});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/getMenu",  async function (req, res) {

    try {
        let date = new Date().toLocaleDateString();
        let { session } = req.body;

        let menu = await Session.findOne({ date: date, session: session });
        //console.log(menu)
        if(menu){
            res.send({menu,msg:"avaliable"});
        }
        else{
            res.send({msg:"not-avaliable"});

        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});




module.exports = router;