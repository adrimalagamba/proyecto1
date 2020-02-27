var express = require('express');
var router = express.Router();
const connection = require('../config/db.js');
var multer = require('multer');
var storage = multer.diskStorage({

destination: function (req, file, cb) {
        cb(null, 'public/uploads')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    })
     var upload = multer({ storage: storage })


     router.get('/', function(req, res, next) {
    res.render('descripcion', { title: 'Express' });
  });
  
 
  
      
  
  
    
  router.get('/', function (req, res, next) {
  
      let sql = 'SELECT * FROM product';
      connection.query(sql, (error, datas) => {
        
        res.render('vistas', { datas: datas })
      });
        
    });
   
  
   
   
    
  
  
  
  
  
  
  
  
  
  
  
  module.exports = router;

module.exports = router;