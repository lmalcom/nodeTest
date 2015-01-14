define(['HTMLContainer', 'Image', 'Text'], function(HTMLContainer){ 
	var DescriptionBox2 = HTMLContainer.extend({ 
		blockClass: 'DescriptionBox2', 
		superClass: 'HTMLContainer', 
		super: HTMLContainer.prototype, 
        defaultCSS: _.extend({}, HTMLContainer.prototype.defaultCSS, { 
            'width':'auto', 
            'height':'auto', 
            'position':'relative', 
            '.Text':{ 
                'height':'auto', 
                'min-height':'40px', 
                'position':'absolute', 
                'bottom':0, 
                'padding':'5px', 
                'color':'rgb(200,200,200)', 
                'background-color':'rgba(0,0,0,.9)', 
                '*':{ 
                    'margin':0 
                } 
            } 
        }), 
		skeleton: { 
			view: { 
				ins:'settings.ins', 
				css: 'settings.css'
			}, 
			"children":[ 
                { 
                    "blockClass":"Image", 
                    "settings":{
                        img: 'settings.img'
                    }
                }, 
                {
                    'blockClass': 'Text', 
                    'settings':{ 
                        css: 'settings.textCSS', 
                        text: 'settings.text', 
                        type: 'settings.type', 
                        inputs: 'settings.inputs'
                    } 
                } 
            ] 
		}, 
        initialize: function(attributes){
            HTMLContainer.prototype.initialize.call(this, attributes); 
            console.log('starting off with...', attributes, this); 
        }
	});	
	return DescriptionBox2; 
}); 