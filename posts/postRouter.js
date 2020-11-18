const express = require('express');
const router = express.Router();
const posts = require('./postDb')

router.get('/', (req, res) => {
  posts.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({ message: 'DB erorr' })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  const { id } = req.params
  posts.getById(id)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      res.status(500).json({ message: 'DB erorr' })
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  const {id} = req.params
  posts.remove(id)
    .then(res.status(201).json({ messag: 'removed' }))
    .catch(res.status(500).json({ message: 'DB error' }))
});

router.put('/:id', validatePostId, (req, res) => {
  const {id} = req.params
  const changes = req.body
  posts.update(id, changes)
    .then(res.status(200).json({ message: 'Changes made' }))
    .catch(res.status(500).json({ message: 'DB error' }))
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params
  posts.getById(id)
    .then(post => {
      if(post){
        req.post = post
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

module.exports = router;
