const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    type:{
        type:String,
        required: true
    },
    level:{
            type:String,
            required: true
        },
    content:{
        type:String,
        required:true
    },
    description: {
        type:String,
        required: true
    },
    answers: [
        {
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ]
})

module.exports = mongoose.model('Question', QuestionSchema)

