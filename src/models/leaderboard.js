const mongoose = require('mongoose')

const LeaderBoardSchema = new mongoose.Schema({
    level:String,
    content:String,
    board:[
        {
            name:String,
            score:Number
        }
    ]
})

module.exports = mongoose.model('LeaderBoard',LeaderBoardSchema)