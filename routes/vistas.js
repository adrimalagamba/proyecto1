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


  
router.get('/', function (req, res, next) {

    let sql = 'SELECT * FROM product';
    connection.query(sql, (error, datas) => {
      var array= [1,2,3,4,5,6,7,7,8,9,4,5,6,8,3]
      console.log( array.slice(0,4))
      res.render('vista', { datas: datas })
    });
      
  });
 
  router.get("/delete/:id_product", function (req, res, next) {

    let id_product = req.params.id_product;

    connection.query("DELETE FROM product WHERE id_product = " + id_product, function (err, result) {
        res.redirect("/vistas");
    });
  });

  router.get("/descripcion/:id_product", function (req, res, next) {
    let id_product = req.params.id_product;
    let sql = "SELECT * FROM product WHERE id_product = ?";
    connection.query(sql, [id_product], (err, datas) => {
        if (err) {
            throw err;
        } else {
            res.render("descripcion", { datas: datas });
        }
    });
  
  });


  router.get("/edit/:id_product", function (req, res, next) {
    let id_product = req.params.id_product;
    let sql = "SELECT * FROM product WHERE id_product = ?";
    connection.query(sql, [id_product], (err, datas) => {
        res.render("editpro", { datas: datas[0] });
    });
});

router.post("/update/:id_product", function (req, res, next) {

  let id_product = req.params.id_product;
  let id_user = req.body.id_user;
  let name_product = req.body.name_product;
  let brand = req.body.brand;
  let type = req.body.type;
  let description = req.body.description;
  let price = req.body.price;
  let stock = req.body.stock;

  connection.query(
      "UPDATE product set? WHERE id_product =" + id_product,
      { id_user, name_product, brand, type, description, price, stock },
      (err, result) => {
          res.redirect("/vistas");
      }
  );
});

  module.exports = router;
 
 
  










