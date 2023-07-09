const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
var fetchuser = require('../middleware/fetchuser');


router.post("/addMenu",async function (req, res) {

    let { menu, session } = req.body;
    let attendance = [];
    let date = new Date();
    //let now = new Date().getTime();
    date=new Date(date.setHours(15,0,0,0));
    //date =  new Date(now - (now % 86400000) + 86400000-1);
    try {
         // let user = await User.findById(req.user.id)
        // //console.log(user);
        // if (user.role != "admin") {
        //     return res.status(401).send("Not Allowed");
        // }
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
        let date = new Date();
    let now = new Date().getTime();
    date=new Date(date.setHours(15,0,0,0));
    console.log(date);
    //date =  new Date(now - (now % 86400000) + 86400000-1);
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

router.get("/getSessions",fetchuser,async function(req,res){
    try {
        // let user = await User.findById(req.user.id)
        // //console.log(user);
        // if (user.role != "admin") {
        //     return res.status(401).send("Not Allowed");
        // }
        let sessions = await Session.find();
        res.send(sessions);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})




module.exports = router;