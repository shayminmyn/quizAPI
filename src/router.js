const express = require('express')
const router = express.Router()
const Question = require('./models/question')

//get all
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find()
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({'error':error})
    }

})

//get by type
router.get('/questions/:type', async (req, res) => {
    try {
        const type = res.params.type
        const questions = await Question.find({'type':type})
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({'error':error})
    }

})

//get one
router.get('/questions/:id', async (req, res) =>{
    try {
        const id = req.params.id
        const question = await Question.findById(id)

        return res.status(200).json(question)
    } catch (error) {
        return res.status(500).json({'error':error})
    }
})

//create one
router.post('/questions', async (req, res) => {
    try {
        const data = req.body

        console.log(data)
        const question = await Question.create({
            data
        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// update one quiz question
router.put('/questions/:id', async (req, res) => {
    try {
        const id = req.params.id 
        const data = req.body

        let question = await Question.findOne({id})

        if(!question){
            question = await Question.create({
                data
            })    
            return res.status(201).json(question)
        }else{
            question.type = data.type
            question.level = data.level
            question.content = data.content
            question.answers = data.answers
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// delete one quiz question
router.delete('/questions/:id',async (req, res) => {
    try {
        const id = req.params.id

        const question = await Question.findByIdAndDelete(id)

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})


module.exports = router

