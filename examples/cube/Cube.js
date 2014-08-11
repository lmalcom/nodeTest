define(['HTMLContainer'], function(HTMLContainer){ 
	var Cube = HTMLContainer.extend({ 
		blockClass: 'Cube', 
		superClass: 'HTMLContainer', 
		super: HTMLContainer.prototype, 
		defaults:{ 
			x: 0, 
			y: 0, 
			scaleX: 0, 
			scaleY: 0 
		},
        initialize: function(attrs){
            this.super.initialize.call(this, attrs); 
            console.log('oh hey, this is the cube js in the examples folder!'); 
        },
        events:{
            'newBlock': 'test' 
        }, 
        test: function(){
            alert('testing add block!'); 
        },
        defaultCSS: _.extend({}, HTMLContainer.prototype.defaultCSS, {
            "position": "relative",
            "perspective": "800px",
	        "perspective-origin": "50% 100px",
            "width": "200px",
            ".HTMLContainer":{
                "transform-style": "preserve-3d", 
                '@-webkit-keyframes CubeSpin':{
                    "from": { 
                        transform: 'rotate3d(0,0,0, 0deg)'
                    }, 
                    "to": { 
                        transform: 'rotate3d(.25, 1, -.25, 360deg)'
                    }
                },
                //'-webkit-animation': "CubeSpin 5s infinite linear", 
                '&:hover':{
                  '-webkit-animation': "CubeSpin .4s linear",   
                },
                 ".HTMLBlock":{
                    'border-radius':'100%', 
                     'overflow':'hidden', 
                    position: "absolute",
                    width: "200px",
                    height: "200px", 
                    'background-color':'rgba(0,0,0,.3)', 
                    'box-shadow': '0px 1px 10px 0px rgba(0,0,0, .3)',
                }
            }
        }), 
		skeleton: { 
			view: {
				x: 'settings.x', 
				y: 'settings.y', 
			}, 
			children: [
                {
                    "blockClass":"HTMLContainer", 
                    "settings":{
                        
                    }, 
                    "children":[
                        //front
                        {
                            "view":{
                                "blockClass":"settings.type",
                                "z":"100"
                            },
//                             "settings":{
                                
//                             }
                        }, 
                        //back
                        {
                            "view":{
                                "blockClass":"settings.type",
                                "z":"-100", 
                                "rotateY":"180"
                            },
//                             "settings":{
                                
//                             }
                        },
                        //left
                        {
                            "view":{
                                "blockClass":"settings.type",
                                "rotateY":"270", 
                                "x":"-100", 
                            },
//                             "settings":{
                                
//                             }
                        },
                        //right
                        {
                            "view":{
                                "blockClass":"settings.type",
                                "rotateY":"-270", 
                                "x":"100",
                            },
//                             "settings":{
                                
//                             }
                        },
                        //top
                        {
                            "view":{
                                "blockClass":"settings.type",
                                "rotateX":"-90", 
                                "y":"-100",
                            },
//                             "settings":{
                                
//                             }
                        }, 
                        //bottom
                        {
                            "view":{
                                "blockClass":"settings.type",
                                "rotateX":"90", 
                                "y":"100", 
                            },
//                             "settings":{
                                
//                             }
                        }
                    ]
                }
            ]
        }
	});	
	return Cube; 
}); 