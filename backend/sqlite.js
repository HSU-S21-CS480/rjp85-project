//Load modules
var sqlite3 = require('sqlite3').verbose();
var db      = new sqlite3.Database('./db/db.sqlite3');

//Perform SELECT Operation
db.all("SELECT * from users" ,function(err,rows){
      console.log(JSON.stringify(rows,null,2))
});

// //Perform INSERT operation.
// db.run("INSERT into table_name(col1,col2,col3) VALUES (val1,val2,val3)");

// //Perform DELETE operation
// db.run("DELETE * from table_name where condition");

// //Perform UPDATE operation
// db.run("UPDATE table_name where condition");
