define(['HTMLContainer', 'socketio'], function(HTMLContainer, socketio){ 
	var TextImageButtonContainer = HTMLContainer.extend({ 
		blockClass: 'TextImageButtonContainer', 
		superClass: 'HTMLContainer', 
		super: HTMLContainer.prototype, 
        defaultCSS: _.extend({}, HTMLContainer.prototype.defaultCSS, {
            ".TextImageButton":{
                "position":"relative"
            }
        }), 
		skeleton: { 
			view: { 
				distribution: 'settings.distribution', 
				ins:'settings.ins', 
				css: 'settings.css'
			}, 
			"children":[
                {
                    "TextImageButton":{ 
                          "settings":{
                              "img":"settings.img.*", 
                              "text":"settings.text.*"
                          }
                      }
                }
                  ]
		}, 
        initialize: function(attrs){ 
            var con = window.con = this; 
            HTMLContainer.prototype.initialize.call(this, attrs); 
            window.socketio = socketio; 
            window.socketio = socketio = socketio.connect('http://' + window.location.hostname + ':8800'); 
            socketio.on('newBlock', function(dat){ 
                var child = con.children.findByIndex(0); 
                console.log(dat) 
                child.children.findByIndex(0).model.set('text', dat.text);  
                child.children.findByIndex(1).model.set('img', dat.img); 
                child.children.forEach(function(ch){
                    ch.render(); 
                }); 
            })
            if(!window.started){
                $(document).on('click', function(ev){ 
                    socketio.emit('testing'); 
                }); 
                window.started = true; 
            }
            
        }
	});	
	return TextImageButtonContainer; 
}); 