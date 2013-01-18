var mongo = require("mongodb"); 
var host = "127.0.0.1"; 
var port = mongo.Connection.DEFAULT_PORT; 
var DB = new mongo.Db("database", new mongo.Server(host, port, {journal:'true'})); 
var db; 
openDB(); 

function openDB(){
	DB.open(function(error, dbOb){
		if(error){
			console.log('error connecting to the database!'); 
		}else{
			db = dbOb; 
		}
	}); 
}


function addUser(user){
	db.collection('user', function(error,collection){
		collection.insert({
			id 	: '1', 
			username  : user, 
			email : user + '@gmail.com'
		}, function(){
			console.log('you have entered'+ user +'into the database!'); 
		}); 
	});  
}

function findUser(user, callback){
	db.collection('user', function(error, collection){
		if(error){
			console.log('this is the collections error: ' + error); 
		}else{
			collection.find({'username' : user.toString()}, function(error, index){
				if(error){
					console.log('this is the find error: ' + error); 
				}else{
					//return users with that username
					index.toArray(function(error, users){
						if (users.length == 0){
							console.log('user not found'); 
							callback(false); 
						}else{
							//return user object
							console.log('we found ' + users.length + ' entries'); 
							callback(users[0]); 
							console.log('username: ' + users[0].username);
							console.log('email: ' + users[0].email);
							console.log('id: ' + users[0].id);
							console.log('_id: ' + users[0]._id);    
						}
					});  
				}
			}); 
		}
	}); 
}

function verifyUser(user){
	
}

module.exports.addUser = addUser; 
module.exports.findUser = findUser; 
