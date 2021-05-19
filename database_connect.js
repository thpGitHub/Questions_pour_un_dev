const mongoose = require('mongoose');
require('dotenv').config();

const connection = process.env.DB_HOST_ATLAS;
// const connection = process.env.DB_HOST_LOCAL;

mongoose.connect(connection,{ useNewUrlParser: true,
                              useUnifiedTopology: true,
                              useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));