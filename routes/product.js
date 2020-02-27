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
    res.render('product');
  });




router.post('/', upload.single('myFile'), function (req, res, next) {
  console.log(req.body.name_product)
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  let id_user = req.params.id;
  let name_product = req.body.name_product;
  let brand = req.body.brand;
  let type = req.body.type;
  let price = req.body.price
  let stock = req.body.stock;
  let description = req.body.description;
  let img = req.file.originalname;
//   let img = req.file.originalname;
    console.log(req.file.originalname)

  let sql = "INSERT INTO product set? ";

  connection.query(sql, { name_product, brand, type, description, price, stock, img },
    (error, datas) => {
    // if(error ) throw error;
    
    res.redirect('/vistas')

  });
});

router.post("/vista", function (req, res, next) {
  let sql = "SELECT * FROM product";
  connection.query(sql, (err, datas) => {
      if (err) {
          throw err;
      } else {
          res.render("vistas", { datas: datas });
      }
  });

});
module.exports = router;