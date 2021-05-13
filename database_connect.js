const mongoose = require('mongoose');
require('dotenv').config();

// const connection = process.env.DB_HOST_ATLAS.toString();
const connection = process.env.DB_HOST_ATLAS;
// console.log(connection);
mongoose.connect(connection,{ useNewUrlParser: true,
                              useUnifiedTopology: true,
                              useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));