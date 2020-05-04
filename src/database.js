const mongooes = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/Quiz'




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


