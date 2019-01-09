const express = require('express'),
    bodyParser= require('body-parser'),
        cors  = require('cors');

const app = express();

//Middleware

app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts.js');

//tells the app to use posts from ./routes/api/posts.js
//to send to the router
app.use('/api/posts', posts);

// Handle Production
if(process.env.NODE_ENV === 'production') {
  //static folder
  app.use(express.static(__dirname + '/public'));

  // Handle single page app
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html');

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));