const router = require('express').Router();
const Landmark = require('../models/Landmark')

router.post('/', (req, res, next) =>{
  const {address, year, architect, description} = req.body;
  Landmark.create({
    address,
    year,
    architect,
    description
  })
  .then(landmark =>{
    res.status(201).json(landmark);
  })
  .catch(err =>{
    res.json(err)
  });
});

router.get('/', (req, res, next) => {
  Landmark.find()
  .then(landmarks => {
    res.status(200).json(landmarks);
  })
  .catch(err => res.json(err));
});

router.get('/:id', (req, res, next) =>{
  Landmark.findById(req.params.id)
  .then(landmark => {
    if (!landmark) {
      res.status(404).json(landmark)
    }else{
      res.status(200).json(landmark)
    }
  })
  .catch(err => res.json(err));
});

router.put('/:id', (req, res, next) =>{
  const {address, year, architect, description} = req.body;
  Landmark.findByIdAndUpdate(
    req.params.id,
    {address, year, architect, description},
    {new: true}
  )
  .then(landmark => {
    res.status(200).json(landmark);
  })
  .catch(err => res.json(err));
});

router.delete('/:id', (req, res, next) =>{
  Landmark.findByIdAndDelete(req.params.id)
  .then(() => {
    res.status(200).json({message: 'landmark deleted'});
  })
});


module.exports = router;