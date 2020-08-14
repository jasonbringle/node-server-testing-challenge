const express = require('express');

const MemsDB = require('./membersModel');

const router = express.Router();

router.get('/', (req,res)=>{
    MemsDB.get()
        .then(mems =>
            res.status(201).json(mems))
        .catch(err =>
            res.status(500).json({ errormessage: 'Could not get all the members'}))
})

router.post('/', (req, res) => {
    const body = req.body
    MemsDB.insert(body)
      .then(mem =>{
        console.log(mem)
          res.status(200).json(mem)})
      .catch(err =>
        res.status(500).json({errormessage: 'Could not create the member.'}))
});

// router.put('/:id',(req,res) => {
//     const { id } = req.params;
//     const body = req.body;
//     MemsDB.update(id, body)
//         .then(mem =>
//             res.status(200).json(mem))
//         .catch(err =>
//             res.status(500).json({errormessage: "Cannot update member"}))
// })

router.delete("/:id", ( req,res)=>{
    const { id } = req.params;
    MemsDB.remove(id)
      .then(num =>
        res.status(200).json({ message:`${num} member was deleted`}))
      .catch(err =>
        res.status(500).json({ errormessage: "This member was not deleted"}))
})


module.exports = router;