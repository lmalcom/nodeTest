define(['HTMLContainer', 'Button', 'RowContainer'], function(HTMLContainer){ 
    var Slider = HTMLContainer.extend({ 
        blockClass: 'Slider', 
        superClass: 'HTMLContainer', 
        super: HTMLContainer.prototype, 
        defaults: _.extend({}, HTMLContainer.prototype.defaults, {
            index: 0
        }), 
        defaultCSS: _.extend({}, HTMLContainer.prototype.defaultCSS, { 
            '-webkit-user-select': 'none',
            '-moz-user-select': 'none',  
            '-ms-user-select': 'none',
            'user-select':'none', 
            'height':'150px', 
            '& > *':{ 
                'float':'left'  
            }, 
            '& > .Button':{ 
                'width':'60px', 
            }, 
            '& > .HTMLContainer':{  
                'overflow':'hidden',  
                "width":"e('-webkit-calc(100% - 120px)')", 
                '.RowContainer':{
                    '.Button':{
                        'border-radius':0
                    }
                    //'width':'1000px'  
                },
            } 
        }), 
        events: { 
            'click >.Button:first-child': 'left', 
            'click >.Button:last-child': 'right' 
        },  
        skeleton: {  
            view: {   
                css: 'settings.css', 
            }, 
            "children": [ 
              { 
                  "blockClass":"Button", 
                  "settings":{ 
                      "text":"<" 
                  } 
              }, 
              {
                  "blockClass":"HTMLContainer", 
                  "settings":{}, 
                  "children":[ 
                      { 
                          "blockClass":"RowContainer",  
                          "settings":{ 
                              "css":{ 
                                  '.Button':{ 
                                      'width':'settings.buttonWidth', 
                                  } 
                              } 
                          }, 
                          "children":[ 
                              { 
                                  "Button":{ 
                                     "settings":{ 
                                          "text": "settings.text.*" 
                                      } 
                                  } 
                              }    
                          ] 
                      }, 
                  ] 
              }, 
              { 
                  "blockClass":"Button", 
                  "settings":{ 
                      "text":">" 
                  } 
              }, 
            ] 
		}, 
        left: function(){ 
            var numBlocks = this.$el.find('.RowContainer .Button').length; 
            if(this.index > (-numBlocks + 1)){ 
               this.index--; 
                this.$el.find('.RowContainer').css({ 
                    '-webkit-transform':'translateX(' + this.index*(100/numBlocks) + '%)'
                });  
            }
            return this; 
        }, 
        right: function(){
            var numBlocks = this.$el.find('.RowContainer .Button').length; 
            if(this.index < 0){
               this.index++; 
                this.$el.find('.RowContainer').css({
                    '-webkit-transform':'translateX(' + this.index*(100/numBlocks) + '%)'   
                });  
            }
            return this; 
        }
	});	
	return Slider; 
}); 