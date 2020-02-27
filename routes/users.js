var express = require('express');
var router = express.Router();
const connection = require('../config/db.js');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', function (req, res, next) {

  let sql = 'SELECT * FROM user ';
  connection.query(sql, (error, user) => {

    res.render('user', { user: user })
    console.log(user);
  });

});

// router.post('/', function (req, res, next) {
//   console.log(req.body)

  // let name = req.body.name;
  // let lastname = req.body.lastname;
  // let email = req.body.email;
  // let pass = req.body.pass;
  // let is_Admin = req.body.is_Admin;
  //Destructuring
  //En los corchetes escribes literalmente los atributos que destructuras
//   let { name, lastname, email, pass, is_Admin } = req.body;
//   let sql = `INSERT INTO user name = '${name}',
//   lastname='${lastname}',
//   email= ${email},
//   pass = ${pass},
//   is_Admin = ${is_Admin};`


//   connection.query(sql, (error, user) => {
//     console.log(user)


//   });
// });

router.get('/edit/:id_user', (req, res) => {
  let id = req.params.id_user;
  //PASO 1
  //hacemos una query con el id del employed que recogemos del params
  connection.query("SELECT * FROM user  WHERE id_user = ?", [id_user], (err, resultsuser) => {
    //PASO 2
    //recoger el id del emplyed del resultado de la primera query
   
      //enviamos a la vista employedIndividual los datos de los dos resultados de las dos querys
      res.render('usuario', {
        //este es el resultado de la primera tabla
        resultsuser: resultsuser[0],
        
      })
    })
  });


router.post('/', function (req, res, next) {
  console.log(req.body)
  let name = req.body.name;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let pass = req.body.pass;
  let is_Admin = req.body.is_Admin

  let sql = "INSERT INTO user set? ";

  connection.query(sql, { name, lastname, email, pass, is_Admin },
    (error, user) => {
    // if(error ) throw error;
    console.log(user)
    res.redirect('/users')

  });
});

router.get('/delete/:id_user', (req, res) => {
  console.log(req.params.id_user)
  let id_user = req.params.id_user;
  connection.query("DELETE FROM user WHERE id_user = " + id_user, (error, user) => {



    res.redirect('/users')
  })
})


router.post('/update/:id_user', function (req, res) {
  let name = req.body.name;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let pass = req.body.pass;
  let is_Admin = req.body.is_Admin
  let sql = "UPDATE user set? WHERE id = " + id_user;

  connection.query(sql, { name, lastname, email, pass, is_Admin }, (error, user) => {
    console.log(user)

    res.send('ok')
  })
})


module.exports = router;
