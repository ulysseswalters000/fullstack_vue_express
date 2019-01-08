const express = require('express'),
    bodyParser= require('body-parser'),
        cors  = require('cors');

const app = express();

//Middleware

app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts.js');

//tells the app to use posts from ./routes/api/posts,js
//to send to the router
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));