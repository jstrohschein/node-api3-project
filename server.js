const express = require('express');
const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')


const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('api/users', userRouter);
server.use('api/posts', postRouter);


//custom middleware
function logger(req, res, next) {
  console.log(`${req.method} method`)
  console.log(`${req.url}`)
  console.log(`${Date.now}`)
}

function validateUserID(req, res, next) {
  
}

function validateUser(req, res, next) {
  
}

function validatePost(req, res, next) {
  
}


module.exports = server
