const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://shaymin:9899@cluster0-hgfdj.mongodb.net/test?retryWrites=true&w=majority'




function getConnect(){
    mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true });
    
    mongoose.Promise = global.Promise;

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => console.log('Database connected'))
}

module.exports = {
    getConnect: getConnect
}


