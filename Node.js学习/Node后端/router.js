
const express = require('express')

const router = express.Router()

router.get('/user/list', (req,res) => {
    console.log("服务器处理")
    res.send("get /user/list")
})

router.post('/user/add', (req, res) => {
    console.log(req.body)
    res.send("post /user/add")
})

module.exports = router;