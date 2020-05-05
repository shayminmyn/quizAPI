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

//get by level and content
router.get('/questions/key', async (req, res) => {
    try {
        const level = req.query.level
        const content = req.query.content
        
        const questions = await Question.find({'level':level,'content':content})
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

//create many
router.post('/questions', async (req, res) => {
    try {
        const data = req.body

        // for(let i=0;i<data.length;i++){
        //     console.log(data[i])
        //     const question = new Question(
        //         data[i]
        //     )
        //     await question.save()
        // }
        const questions = await Question.create(data)

        return res.status(201).json(questions)
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
            question = data
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

router.get('/', async (req, res) =>{
    res.send('Hello Min')
})

module.exports = router

