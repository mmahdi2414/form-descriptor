const express = require('express');
const log = require('../logger/logger');
const service = require('./service');
const {check, validationResult} = require('express-validator');

const router = express.Router();
const errorFormatter = ({ location, msg, param}) => {
    return ` ${param} -> ${msg} `;
  };

router.use(function(req, res, next) {
    log('info' , `new ${req.method} request on ${req.originalUrl}`);
    if(req.method.toString() !== "POST" && req.method.toString() !== "GET"){     
        log('error' , `${req.method} is not correct for ${req.originalUrl}`);
        return res.status(400).json({message: "Bad Request (request method error)"});
    }
    next();
});

router.get('/' , (req , res)=>{
    return res.status(200).json(service.getForms());
});

router.post('/' , (req , res)=> {
    const form = req.body;
    if (service.addForm(form) === false){
        return res.status(500).json({message: "Internal Server Error (write error)"});
    }
    return res.status(200).json(service.getForms());
});

router.get('/:id' , (req , res) => {
    const id = req.params.id;
    const form = service.getForm(id);
    console.log(form);
    if (form){
        return res.status(200).json(form);
    }
    return res.status(400).json({message: "Bad Request (not found)"});
});

router.post('/:id' , (req , res) => {
    const id = req.params.id;
    const form = req.body;
    log('info' , form);
    return res.status(200).json({message: `successful submit form with id = ${id}`});
});

module.exports = router;