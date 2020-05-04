const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    type: String,
    level: String,
    content: String,
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

