define(['Slider', 'Button', 'RowContainer'], function(Slider){ 
    var Pagination = Slider.extend({ 
        blockClass: 'Pagination', 
        superClass: 'Slider', 
        super: Slider.prototype, 
        defaults: _.extend({}, Slider.prototype.defaults, {
            index: 0
        }), 
        initialize: function(attrs){
            Slider.prototype.initialize.call(this, attrs); 
            window.pag = this; 
        },
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
                      "text":"<" 
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
                  "blockClass":"Button", 
                  "settings":{ 
                      "text":">" 
                  } 
              }, 
            ] 
		}, 
        left: function(){
            var numBlocks = this.$el.children('.HTMLContainer').children().length; 
               this.index--; 
                //hide old
                this.$el.children('.HTMLContainer').children().css({ 
                    'opacity':0, 
                    'pointer-events':'none'
                });  
                //show new
                this.$el.children('.HTMLContainer').children().eq(this.index%numBlocks).css({ 
                    'opacity':1, 
                    'pointer-events':'auto'
                });  
            return this; 
        }, 
        right: function(){
            var numBlocks = this.$el.children('.HTMLContainer').children().length; 
            this.index++; 
            //hide old
            this.$el.children('.HTMLContainer').children().css({ 
                'opacity':0, 
                'pointer-events':'none'
            });  
            //show new
            this.$el.children('.HTMLContainer').children().eq(this.index%numBlocks).css({ 
                'opacity':1, 
                'pointer-events':'auto'
            }); 
            return this; 
        }
	});	
	return Pagination; 
}); 