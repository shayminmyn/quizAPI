const mongoose = require('mongoose')

const LeaderBoardSchema = new mongoose.Schema({
    name:String,
    score:Number
})

module.exports = mongoose.model('LeaderBoard',LeaderBoardSchema)