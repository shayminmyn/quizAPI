const mongooes = require('mongoose');
const mongoDB = 'mongodb+srv://shaymin:9899@cluster0-hgfdj.mongodb.net/test?retryWrites=true&w=majority/Quiz'




function getConnect(){
    mongooes.connect(mongoDB,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true });
    
    mongooes.Promise = global.Promise;

    const db = mongooes.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => console.log('Database connected'))
}

module.exports = {
    getConnect: getConnect
}


