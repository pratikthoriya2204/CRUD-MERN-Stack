const mongoose = require('mongoose');
const mongoUrl = "mongodb://localhost:27017/reactCRUD";

const connect = async () => {
    try {
        const con = await mongoose.connect(mongoUrl);
        console.log("Connected to mongo successfully...");
    } catch (error) {
        console.log(error);
    }
}
module.exports = connect;