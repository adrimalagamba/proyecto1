var mysql = require('mysql');
// utilizamos el metodo createConection de mysql  para crear la conexion
var connection = mysql.createConnection({
    //host => es el host donde estamos trabajando
    host     : 'localhost',
    //user=> nombre del usuario de base de datos
    user     : 'root',
    //password => contraseña del usuario/ si no tengo contraseña se deja vacio
    password : 'root',
    //database => el nombre de la base de datos que vamos a usar
    database : 'shop'
  });
  //utilizamos la variable connection que tiene la creacion de la conexion y utilizamos el metodo
  // de mysql connect para establecer la conexion
  connection.connect(
    function (error){
        if(error){
            throw error; 
        }else {
            console.log("Conexion a BD correcta");
        }
     });
     module.exports = connection;