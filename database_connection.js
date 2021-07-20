const mongoose = require('mongoose');
require('dotenv').config();

class DatabaseConnection {
    static connection = process.env.DB_HOST_ATLAS;

    static connect () {
        // console.log("totoooooooo");
        mongoose.connect(this.connection,{ useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false})
            .then(() => console.log("Database Connected Successfully"))
            .catch(err => console.log(err));
    }
}

module.exports = DatabaseConnection;