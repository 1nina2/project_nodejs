const express = require("express");
const { auth } = require("../middlewares/auth");
const { ToyModel, validateToy } = require("../models/toyModel")

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        let data = await ToyModel.find({});
        res.json(data);
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }

})

router.get("/search/name", async(req, res) => {
    try {
        let queryName = req.query.s;
        let queryPage = req.query.page;

        let searchReg = new RegExp(queryName, "i");
        let data = await ToyModel.find({ name: searchReg })
            .limit(queryPage)
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})

router.get("/search/category", async(req, res) => {
    try {
        let queryCategory = req.query.s;
        let queryPage = req.query.page;

        let searchReg = new RegExp(queryCategory, "i");
        let data = await ToyModel.find({ cat: searchReg })
            .limit(queryPage)
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})
router.get("/search/info", async(req, res) => {
        try {
            let queryInfo = req.query.s;
            let queryPage = req.query.page;


            let data = await ToyModel.find({ info: "/" + queryInfo + "/" })
                .limit(queryPage)
            res.json(data);
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    })
    //The information came from body, check it on the server side//
router.post("/signUp", auth, async(req, res) => {
    let validateBody = validateToy(req.body);
    if (validateBody.error) {
        return res.status(400).json(validateBody.error.details)
    }
    try {
        let toy = new ToyModel(req.body);
        toy.user_id = req.tokenData._id;
        await toy.save();
        res.status(201).json(toy)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })

    }

})
router.put("/:idEdit", async(req, res) => {
    let valdiateBody = validateToy(req.body);
    if (valdiateBody.error) {
        return res.status(400).json(valdiateBody.error.details)
    }
    try {
        let idEdit = req.params.idEdit
        let data = await ToyModel.updateOne({ _id: idEdit }, req.body)

        res.json(data);
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }
})

router.delete("/:idDel", auth, async(req, res) => {
    try {
        let idDel = req.params.idDel

        let data = await ToyModel.deleteOne({ _id: idDel, user_id: req.tokenData._id })

        res.json(data);
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }
})


module.exports = router;