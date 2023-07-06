const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });
const Port = process.env.PORT;

require('./db/conn')

app.use(require('./Route/auth'))

app.listen(Port, () => {
    console.log(`server is running successfully on port ${Port}`);
})
