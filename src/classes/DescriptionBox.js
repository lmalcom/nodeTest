define(['HTMLContainer', 'Image', 'Text'], function(HTMLContainer){ 
	var DescriptionBox = HTMLContainer.extend({ 
		blockClass: 'DescriptionBox', 
		superClass: 'HTMLContainer', 
		super: HTMLContainer.prototype, 
        defaultCSS: _.extend({}, HTMLContainer.prototype.defaultCSS, {
            'width':'auto', 
            'height':'auto', 
            '& > *': {
                'float':'left'
            },
            ".Image":{
                'width':'25%'
            }, 
            '.Text':{
                'width':'75%'
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
                        css: 'settings.css', 
                        text: 'settings.text', 
                        type: 'settings.type', 
                        inputs: 'settings.inputs'
                    }
                }
            ]
		}, 
	});	
	return DescriptionBox; 
}); 