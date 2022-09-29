const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/PostApp";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected To MongoDB Sucessfully");
    })
}

// OR We Use
// const connectToMongo = () => {
//     mongoose.connect(mongoURI)
// }

module.exports = connectToMongo;