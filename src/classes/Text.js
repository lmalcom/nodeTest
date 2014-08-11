define(['HTMLBlock'], function(HTMLBlock){ 
	//Page View 
	var Text = HTMLBlock.extend({ 
		blockClass: 'Text', 
		superClass: 'HTMLBlock', 
		super: HTMLBlock.prototype, 
        defaults:{
            type: 'p', 
			text: 'You should probably fill this with real text :)', 
        },
        skeleton: { 
			model:{
				text: 'settings.text', 
                type: 'settings.type', 
                inputs: 'settings.inputs'
            }, 
            view: {
                css: 'settings.css', 
            }
		},
		template: function(dat){ 
			var template = '', 
				block 	 = this; 

			//if is array 
			if(dat.inputs && _.isArray(dat.inputs)){ 
				_.each(dat.inputs, function(input){ 
					var type = input.type || block.get('type'), 
						txt  = input.text || block.get('text'); 
					template += '<' + type + '>' + txt + '</' + type + '>'; 
				})

			//else is a single oject 
			}else{ 

				var type = dat.type || block.get('type'), 
					txt  = dat.text || block.get('text'); 
                
				template += '<' + type + '>' + txt + '</' + type + '>'; 
			}

			return _.template(template); 
		}, 

	});  
	return Text; 
}); 