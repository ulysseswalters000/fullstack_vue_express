const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//GET posts

//because we linked this file to a specifc route (/api/posts)
//route of '/' actually refers to /api/posts/*
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

//ADD Posts
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  //insetOne is part of mongodb collection to inset
  await posts.insertOne({
    //stores data from body-parser
    text: req.body.text,
    //stores date created
    createdAt: new Date(),
  });
  //returns the statues 201 that it was fine
  //and something was created
  res.status(201).send();
});

//Delete Posts
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect('mongodb://abc123:abc123@ds151994.mlab.com:51994/vue_express', {
    useNewUrlParser: true
  });

  return client.db('vue_express').collection('posts');
}

module.exports = router;
