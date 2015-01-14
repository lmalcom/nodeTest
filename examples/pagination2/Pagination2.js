define(['Slider', 'Button', 'RowContainer'], function(Slider){ 
    alert('hello?'); 
    var Pagination = Slider.extend({ 
        blockClass: 'Pagination2', 
        superClass: 'Slider', 
        super: Slider.prototype, 
        defaults: _.extend({}, Slider.prototype.defaults, {
            index: 0
        }), 
        initialize: function(attrs){
            alert('oh hey'); 
            Slider.prototype.initialize.call(this, attrs); 
            window.pag = this; 
            console.log('attrrrssss', attrs); 
        },
        defaults: _.extend({}, Slider.prototype.defaults, {
            ins: [
                ['move', '*', 'button']
            ],
        }), 
        defaultCSS: { 
            'position':'relative', 
            '-webkit-user-select': 'none',
            '-moz-user-select': 'none',  
            '-ms-user-select': 'none',
            'user-select':'none', 
            'height':'100%',
            '& > .Button':{ 
                'width':'60px', 
                'position':'absolute',
                'z-index':2, 
                'box-shadow':'none',
                'height':'60px', 
                'top':'50%', 
                'background-color':'transparent'
            }, 
            '& > .HTMLContainer':{  
                'width':'100%', 
                'overflow':'hidden',
                'position':'relative', 
                '& > *':{
                    'opacity':0, 
                    'pointer-events':'none', 
                    'position':'absolute'
                }, 
                '& > :first-child':{
                    'opacity':1, 
                    'pointer-events':'auto'
                }
            }, 
            '& > .Button:first-child':{
                'left':'0', 
            }, 
            '& > .Button:last-child':{
                'right':'0', 
            }
        }, 
        skeleton: {  
            view: {   
                css: 'settings.css', 
            }, 
            "children": [ 
              { 
                  "blockClass":"Button", 
                  "settings":{ 
                      "text":"<", 
                      "message":"move"
                  } 
              }, 
              {
                  "blockClass":"HTMLContainer", 
                  "settings":{}, 
                  "children":[ 
                      { 
                          "settings.type":{ 
                              "settings":{ 
                                  "text": "settings.text.*", 
                                  "img":"settings.images.*"
                              } 
                          } 
                      }    
                  ] 
              }, 
              {
                  "blockClass":"HTMLContainer", 
                  "settings":{
                      "css":{
                          "height":"60px", 
                          "position":"absolute", 
                          "bottom":0, 
                          "left":0, 
                          "text-align":"center", 
                          "background":"red"
                      }
                  }
              }, 
              { 
                  "blockClass":"Button", 
                  "settings":{ 
                      "text":">", 
                      "message":"move"
                  } 
              }
            ] 
		}, 
        initialize: function(attrs){
           Slider.prototype.initialize.call(this, attrs); 
            this.on('right', this.goRight); 
            this.on('left', this.goLeft); 
//             postal.subscribe({
//                 channel:'button', 
//                 topic: 'leftClick', 
//                 callback: function(dat){
//                     alert('this is from initialize...'); 
//                 }
//             })
            return this; 
        },
        move: function(dat){
            alert('its workin!');
            console.log('data...', dat); 
            //get the index 
            var index = this.get('index'); 
            
            //clear remove active from all buttons (since we don't know which had it); 
            this.children.each(function(child){
                child.el.removeClass('active'); 
            }); 
            
            //set the button at that index to the corrent color 
            
            return this; 
            
        },
        goRight:function(dat){
            console.log('we got somethin!', dat); 
            return this; 
        }, 
        goLeft: function(){
            console.log('going to the left...'); 
            return this; 
        }
	});	
	return Pagination; 
}); 