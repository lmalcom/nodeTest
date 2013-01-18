var fs 		= require("fs");
var express = require("express");
var config  = JSON.parse(fs.readFileSync("config.json")); 
var host = config.host; 
var port = config.port; 
var db = require("./db.js");

var app = express(); 
app.use(app.router); 
app.use(express.static(__dirname));  

//homepage
app.get('/', function(request, response){
	response.send('oh hey now, this is your express server!'); 
}); 

//add user to the database
app.get('/add/:user', function(request, response){
	console.log('adding ' + request.params.user + ' to the database!'); 
	db.addUser(request.params.user); 
	response.send('added ' + request.params.user + ' to the database!'); 	
}); 

//find user and print info to the screen
app.get('/users/:user', function(request, response){	
	console.log('You searched for ' + request.params.user); 
	db.findUser(request.params.user, function(person){
		var body = ''; 
		body += '<h1>Username: ' + person.username + '</h1>'; 
		body += '<h1>Email: ' + person.email + '</h1>'; 
		body += '<h1>Id: ' + person.id + '</h1>'; 
		response.send('this is your response ' + body);    
	});
	 
}); 

app.post('/register', function(request,response){
	var body = ''; 
	request.on('data', function(chunk){
		console.log('this is a chunk: ' + chunk);
		body += chunk;  
	}); 
	request.on('end', function(){
		var data = JSON.parse(body); 
		console.log("this is the body: " + data); 
		console.log('this is the username: ' + data.username); 
	});  
	
	response.send({status:'success!'}); 
}); 

/*users
app.get('/users/:id', function(request, response){
	request.params.id
});*/ 


app.listen(port, host);   
