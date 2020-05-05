const express = require('express')
const router = express.Router()
const Question = require('./models/question')
const LeaderBoard = require('./models/leaderboard')

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

        let question = await Question.find({"_id":id})

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
//get leaderboard url like /leaderboard?level=...&content=...
router.get('/leaderboard', async ( req, res) => {
    try {
        const level = req.query.level
        const content = req.query.content

        const leaderboard = await LeaderBoard.findOne({'level':level,'content':content})

        return res.status(200).json(leaderboard)
    } catch (error) {
        return res.status(500).json({'error':error})
    }
})
//create leaderboard
router.post('/leaderboard', async ( req, res) => {
    try {
        const data = req.body

        const leaderboard = await LeaderBoard.create(data)

        return res.status(201).json(leaderboard)
    } catch (error) {
        return res.status(500).json({'error':error})
    }
})
//update leaderboard url like /leaderboard?level=...&content=...
router.put('/leaderboard/:id', async ( req, res) => {
    try {
        const id = req.params.id
        const data = req.body

        let leaderboard = await LeaderBoard.findOne({"_id":id})

        if(!leaderboard){
            leaderboard = await LeaderBoard.create(data)
            return res.status(201).json(leaderboard)
        }else{
            leaderboard.board = data.board
            await leaderboard.save()
            return res.status(200).json(leaderboard)
        }
    } catch (error) {
        return res.status(500).json({'error':error})
    }
})
//delete leaderboard url like /leaderboard?level=...&content=...
router.delete('/leaderboard', async (req, res) => {
    try {
        const level = req.query.level
        const content = req.query.content

        const leaderboard = await LeaderBoard.findByIdAndDelete({'level':level,'content':content})

        return res.status(203).json(leaderboard)
    } catch (error) {
        return res.status(500).json({'error':error})
    }
})

router.get('/', async (req, res) =>{
    res.send('Hello Min')
})

module.exports = router

