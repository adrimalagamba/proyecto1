var express = require('express');
var router = express.Router();
const connection = require('../config/db.js')
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('users', { title: 'Formulario', name: "adri", surname: "malagamba", email: "adrivjp@gmail.com", phone: "666666666", color: "azul" });
// });

 router.get('/', function(req, res, next) {
  let sql = 'SELECT * FROM user';
  connection.query(sql,(err,data) => {
    if(err){
      throw err;
    }else{
      res.render('listauser',{data: data})
    }
    // console.log(data);
  })
});

router.get("/delete/:id_user", function (req, res, next) {

    let id_user = req.params.id_user;

    connection.query("DELETE FROM user WHERE id_user = " + id_user, function (err, result) {
        res.redirect("/listauser");
    });
});

router.get('/edit/:id_user',function(req,res){
    //PASO 1 RECOJO EL ID DEL USUARIO
    let id_user = req.params.id_user;
    //PASO 2 HACEMOS LAQUERY D LA TABLA article DONDE EL id SEA IGUAL A LA VARIABLE QUE HEMOS CREADO ARRIBA
    connection.query("SELECT * FROM user WHERE id_user = ?",[id_user],(err,datas)=>{
      //PASO 3 RENDERIZA LA NUEVA VISTA USER => singular, DONDE LE PASO (result[0]) => 
      //SI TIENE TODOS LOS DATOS DE ESE USUARIO EN CONCRETO 
      res.render('edituser',{datas:datas[0]})
      console.log(datas);
    });
  })

  router.post("/update/:id_user", function (req, res, next) {

    let id = req.params.id_user;
    let name = req.body.name;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let pass = req.body.pass;
    let is_Admin = req.body.is_Admin;
    
console.log(req.body)
    connection.query(
        "UPDATE user set? WHERE id_user =" + id,
        { name, lastname, email, pass, is_Admin},
        (err, result) => {
            res.redirect("/listauser");
        }
    );
});


module.exports = router;