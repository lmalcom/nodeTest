define(['HTMLContainer', 'Button'], function(HTMLContainer){ 
    var Navbar = HTMLContainer.extend({ 
        blockClass: 'Navbar', 
        superClass: 'HTMLContainer', 
        super: HTMLContainer.prototype, 
        defaultCSS: _.extend({}, HTMLContainer.prototype.defaultCSS, {
            '.Button': {
                'border-radius': 0
            },
            "& > .Button":{
                "display":"none", 
                //"max-width":"400px", 
                "height":"60px",
                "@media only screen and (min-width : 200px) and (max-width : 768px)":{
                    "display":"inline-block"
                }
            }, 
            '.HTMLContainer':{
                "width":"100%", 
                "height":"60px", 
                "max-height":window.innerHeight - 60 + 'px', 
                "padding":"10px", 
                "box-sizing":"border-box", 
                "background":"rgba(0,0,0,.5)", 
                "overflow":"hidden", 
                ".Button":{
                    "float":"right", 
                    "width":"auto", 
                    "padding":"0 5px",
                    "margin-right":"10px", 
                    "box-shadow":"transparent"
                }, 
                "@media only screen and (min-width : 200px) and (max-width : 768px)":{
                    "height":"0", 
                    "opacity":"0", 
                    "padding":"0", 
                    ".Button":{
                        "height":"60px", 
                        "width":"100%", 
                        "margin-right":"0", 
                    }
                }
            }
        }), 
        events: {
            'click >.Button': 'toggleList'
        }, 
        skeleton: { 
            settings: {  
                css: 'settings.css'
            }, 
            "children": [
              {
                  "blockClass":"Button", 
                  "className":"settingsbtn", 
                  "settings":{
                      "text":"settings.header"
                  }
              },
              {
                  "blockClass":"HTMLContainer", 
                  "settings":{},
                  "children":[
                      {
                          "Button":{
                             "settings":{
                                  "text": "settings.text"
                              } 
                          } 
                      }    
                  ]
              }
            ]
		}, 
        toggleList: function(ev){
            var nav = this; 
            var numChildren = nav.$el.find('.HTMLContainer').children().length; 
            if(nav.toggled){
                nav.toggled = false; 
                nav.$el.find('.HTMLContainer').attr('style', ''); 
            }else{
                nav.toggled = true; 
                nav.$el.find('.HTMLContainer').css({
                    height:numChildren*60, 
                    opacity:1
                })
            }
            return this; 
        }
	});	
	return Navbar; 
}); 