const express = require("express")
var mysql = require('mysql2');
var app = express()


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));

var con = mysql.createConnection({
    host: "bookapp-db.cc0gr0xh7wq6.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "admin123",
    database: "bookdata"
});

//con.connect(function(err) {
//    if (err) throw err;
//    console.log("Connected!");
//});


app.get('/', (req, res) => { 
    res.sendFile(__dirname + '/index.html');
}); 
   
app.post('/submit', (req, res) => { 
    const id = req.body.id; 
    const name = req.body.name;
    var sql = "INSERT INTO books (id, name) VALUES ('"+id+"', '"+name+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
    res.send("Order placed");
}); 

app.get('/orders', (req,res) => {
    con.query("SELECT * FROM books", function (err, result, fields) {
        if (err) throw err;
        console.log("Final list");
        res.send(result);
    });
    
});





app.listen(10000, function () {
console.log("Started application on port %d", 10000)
});
