var fs 		= require("fs"); 
var express = require("express"); 
var app = express(); 

//server for socket
var server = require('http').createServer(app); 
server.listen(process.env.PORT || 8888); 
var io = require('socket.io').listen(8800); 

//basic settings 
app.use(express.static(__dirname));  
app.get('/blockClassList', function(req, res){
    fs.readdir('./blocks/src/classes', function(err, files){
        console.log('files in the classes folder',files); 
        res.send(files); 
    }); 
})

var images = [
    {
        img: "http://www.jrshelpers.com/wp-content/uploads/2013/10/12153821-composition-with-groceries-and-basket-isolated-on-white-vegetables-fruits-wine-and-bread1-1024x693.jpg", 
        text: "Something new!"
    }, 
    {
        img: "http://flavoryoucansavor.com/wp-content/uploads/2013/07/abb6.jpg", 
        text:"The best salad EVER!"
    }, 
    {
        img:"http://stuffpoint.com/food-network/image/169538-food-network-foodnetwork.jpg", 
        text:"A cake"
    }, 
    {
        img:"http://img.foodnetwork.com/FOOD/2013/11/07/ZZSP01_Food-Network-20th-Birthday_s4x3_lg.jpg", 
        text:"Superstar chefs"
    }
    
]
var count = 0; 

io.sockets.on('connection', function(socket){ 
	socket.on('testing', function(dat){
        count++; 
		io.sockets.emit('newBlock', images[count%images.length]); 
	})
});
  