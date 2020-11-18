const express = require('express');
const router = express.Router();
const users = require('./userDb')


router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({ message: 'DB error' })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params
  users.getById(id)
    .then(user => {
      if(user){
        res.status(201).json(user)
      }
      else{
        res.status(404).json({ message: 'User not found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'DB error' })
    })
});

router.get('/:id/posts', validatePost, validateUserId, (req, res) => {
  const { id } = req.params
  users.getUserPosts(id)
    .then(post => {
      if(post){
        res.status(201).json(post)
      }
      else{
        res.status(404).json({ message: 'Not found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'DB error' })
    })
});

router.delete('/:id', validatePost, validateUserId, (req, res) => {
  const { id } = req.params
  users.getById(id)
    .then(user => {
      res.status(201).json({ message: 'Deleted' })
    })
    .catch(err => {
      res.status(500).json({ message: 'DB error' })
    })

})   

router.put('/:id', validatePost, validateUserId, (req, res) => {
      const { id } = req.params
      const changes = req.body
      users.update(id, changes)
        .then(new => {
          res.status(200).json(new)
        })
        .catch(err => {
          res.status(500).json({ message: 'DB error' })
        })
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params
  users.getById(id)
    .then(user => {
      if(user){
        req.user = user
        next()
      }
      else{
        res.status(404).json({ message: 'Not found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'DB error' })
    })
}

function validateUser(req, res, next) {
  const body = req.body
  if(req.body && Object.keys(req.body).length > 0){
    next()
  }
  else{
    res.status(400).json({ message: 'You forgot the body' })
  }
}

function validatePost(req, res, next) {
  const body = req.body
  if(req.body && Object.keys(req.body).length > 0){
    next()
  }
  else{
    res.status(400).json({ message: 'You forgot the body' })
  }
}

module.exports = router;
