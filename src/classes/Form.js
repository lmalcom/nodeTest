define(['HTMLBlock'], function(Block){
    var Form = {}; 

    //Page View
    Form = Block.extend({ 
        blockClass: 'Form',  
        events: { 
            'change input[type=file]':'setImage', 
            'change input[type=number]':'setNumber', 
            'mousedown input[type=number]':'dragNumber', 
            'click .formImg': 'changeFile', 
            'submit form': 'submit', 
            'keyup input,textarea' : 'toggleSubmit', 
            'blur input, textarea': 'toggleSubmit',
            'blur input[type=color]':'submit', 
            'click .deletebtn': 'deleteInput', 
            'click .header' : 'toggleActive', 
            'setFormData': 'setFormData'
        }, 
		defaultCSS: _.extend({}, Block.prototype.defaultCSS, { 
			'width'	: '100%', 
			'max-width':'400px', 
			'height'	: 'auto', 
			//'padding' : '15px', 
			'color': 'rgb(200,200,200)', 
			'background':'rgba(0,0,0,.75)', 
			'-moz-box-shadow': '0px 1px 10px 0px rgba(0,0,0, .3)', 
			'-webkit-box-shadow': '0px 1px 10px 0px rgba(0,0,0, .3)', 
			'box-shadow': '0px 1px 10px 0px rgba(0,0,0, .3)', 
			'overflow':'hidden',
			'transition':'all .5s', 
			'-webkit-transition':'all .5s', 
			'-moz-transition':'all .5s', 			
// 			'form':{ 
// 				'max-height':'0', 
// 				'opacity':'0',
// 				'overflow':'hidden',
// 			}, 
			'input' : { 
				'width':'33%', 
				'display':'inline-block', 
				'float':'left',
				//'margin':'10px auto', 
				'transition':'all .5s', 
				'-webkit-transition':'all .5s', 
				'-moz-transition':'all .5s'
			}, 
			'.header': { 
				'text-align':'center', 
				'margin':'10px 0', 
				'cursor':'pointer', 
				'height':'25px',
			}, 
			'label' : {
				'padding':'0 10%',
				'display':'inline-block', 
				'margin':'10px auto',
				'width':'66%', 
				'float':'left', 
				'text-align':'right'
			}, 
			'.FormImg':{ 
				'display':'block', 
				'min-width':'200px', 
				'min-height':'200px', 
				'text-align':'center' 
			}, 
			'input[type=submit]':{ 
				'position': 'relative' 
			}, 
			'input[type=number]':{
				'cursor':'move', 
				'user-select':'none',
				'-webkit-user-select':'none',
				'-moz-user-select':'none',
			}
		}), 
		initialize: function( options ){ 
			Block.prototype.initialize.call(this, options); 
			this.el.action = this.model.get('action') || null; 
			this.el.enctype = "multipart/form-data"; 
			this.listenTo(this.page, 'change:target', this.setFormData); 
		}, 
		template: function(dat){ 
			var text, form; 
			text = '', 
			form = this; 
			if(!this.inputs) return _.template('<i>this form has no inputs</i>'); 

			//header is default header for the class, or the header suggested by the model or the default 
			text += '<h3 class="header">' + (dat.header || this.get('header') ||'Header') + '</h3>'; 
			text += '<form class="inactive">'; 
			
			//create labels and inputs for all of the inputs in the array
            var inputs = this.get('inputs'); 
            console.log('inputs....', inputs); 
			_.each(inputs || [], function(input){ 
				//wrap each input in a div if toggle state is set 
				//this is so that we can put a +/x button on the right of the input 
				if(input.label) text +=		'<label>' + input.label + '</label>'; 
				if(form.allowToggleState || input.type === 'color') text+= '<div>'; 						
					text +=		input.type == 'textarea' ? '<textarea ': '<input type="' + (input.type || 'text') + '"'; 
					text +=		'name = "' + (input.name || '') + '"'; 
					text +=		'placeholder="' + (input.placeholder || '') + '"'; 
					if(input.type == 'text' || input.type == 'textarea') text += 'value="' + (input.value || '') + '"'; 
					if(input.type == 'number') text += 'min="-9999" max="9999" value="' + (input.value || 0) + '"';
					text +=		input.type == 'file' ? 'style="display:none">' : '>'; 
					if(input.type == 'textarea') text += '</textarea>'; 
					if(input.type =='file') text += '<a class="formImg" style="background-image:url(' + "'" + input.src +"'" + ')"></a>'; 
					if(input.type === 'color') text += '<label> R: </label><input type="number" min="0" max="255" ' + 'name = "' + (input.name || '') + '-r"><label> G: </label><input type="number" min="0" max="255" ' + 'name = "' + (input.name || '') + '-g"><label> B: </label><input type="number" min="0" max="255" ' + 'name = "' + (input.name || '') + '-b"><label> Alpha: </label><input type="number" value="0" ' + 'name = "' + (input.name || '') + '-alpha" min="0" max="1" step=".01"> ';
					if(form.allowToggleState) text += '<a class="deletebtn">X</a>'; 
				if(form.allowToggleState || input.type === 'color') text+= '</div>'; 
			}); 

			//submit button
			text+= '<input type="submit" class="Button" disabled="disabled" value="' + (this.submitVal || this.model.get('submitVal') || 'Submit') + '"></input>'; 
			text += '</form>'; 
			return _.template(text); 
		}, 
		//collection of standard editing things 
		allowToggleState: false, 
		changeFile: function(ev){ 
			var input = this.$el.find('input[type=file]'); 
			input.trigger('click'); 
			return this; 
		}, 
		setImage: function(ev){ 
			var input, file; 
			input = ev.target; 
			file = input.files[0]; 

			//create a url from the img 
			this.$el.find('.formImg').css('background-image', 'url("' + URL.createObjectURL(file) + '")'); 
			this.toggleSubmit(); 
			return this; 
		}, 
		toggleState: function(targ, len){ 
			var del; 
			del = $(targ).siblings('.deletebtn'); 

			//toggle 
			if(len > 0) { // zero-length string AFTER a trim 
		        del.fadeIn(); 
		    }else{
		    	del.fadeOut(); 
		    }
			return this; 
		}, 
		toggleActive: function(ev){
			var form = this.$el.find('form'); 
			(form.css('max-height') == '9999px')? form.css({'max-height':0, 'opacity':0}): form.css({'max-height':'9999px', 'opacity':1}); 
			return this; 
		},
		toggleSubmit: function(){
			var form, submit, inputs, hasValue;
			form = this; 				
			submit = this.$el.find('input[type=submit]'); 
			inputs = this.$el.find('input[type!=submit], textarea'); 
			hasValue = false; 

			_.each(inputs, function(input){
				var len; 
				len  = $.trim(input.value).length; 

				// zero-length string AFTER a trim
				if(len !== 0) hasValue = true; 
			    form.toggleState(input, len); 
			}); 

			if(!hasValue){
				submit.addClass('disabled');
			    submit.attr('disabled', true); 
			}else{
				submit.removeClass('disabled');
			    submit.attr('disabled', false); 
			}
			return this; 
		},
		deleteInput: function(ev){
			var input, btn, submit; 
			btn = $(ev.target); 				
			btn.siblings('input, textarea').val(''); 
			btn.fadeOut(); 
			this.toggleSubmit(); 
			return this; 
		},
		/*****************/
		/*SETTING AND GETTING DATA: 
		/*setFormData, getFormData, and send should be specified for every form class
		/*This is because their data might be of different types and needs to be collected/sent in different ways
		/*Ex: CSS will alter css objects, content will alter the data on the model etc
		/*Default: CSS, simply because there are more CSS values to modify 
		/*****************/
		getFormData: function(ev){
			var ret = {}; 

			//get reference to current view from edit target 
			_.each(this.$el.find('input[type!=submit]'), function(input){
				//get the name 
				var name, val; 
				name = input.name,

				//get value
				val = input.value || null; 

				//put in into the return object 
				ret[name] = val; 

			})
			return ret; 
		},
		setFormData: function(ev, view){
			var form = this; 
			if(!view) view = this.page.target; 

			//by default checks CSS values
			_.each(this.$el.find('input[type!=submit]'), function(input){
				//get the name
				var name, val = null, pseudoClass; 
				if(pseudoclass = form.parent.pseudoClass) pseudoClass = '&:' + pseudoclass;			
				name = input.name;

				//find that value in the css object of the view
				if(pseudoclass = view.css.get(pseudoClass)){
					val = pseudoclass[name]; 
				}else{
					val = view.css.get(name);
				}
				
				//set that value on the input or none (we dont want to accidentally set values on the objects)
				input.value = val; 
			}) 
			return this; 
		}, 
		setNumber: function(ev){ 
			console.log(ev); 
			return this; 
		}, 
		dragNumber: function(ev){ 
			var initialX = ev.pageX; 
			var target = ev.target; 
			var viewTarget = this.page.target; 
			var step = (step = ev.target.step)? step: 1; 
			console.log('step', step); 
			viewTarget.$el.css({
				'-webkit-transition': 'none', 
				'-moz-transition': 'none', 
				'transition': 'none', 
			}); 
			function drag(newEv){ 
				var newX = newEv.pageX; 
				var diffX = newX - initialX; 
				var newVal = target.valueAsNumber + diffX*step; 
				initialX = newX; 
				console.log(diffX); 
				if(newVal <= target.max && newVal >= target.min) target.valueAsNumber = newVal
				$(target).trigger('input'); 
			}
			$(document).on('mousemove', drag)
			$(document).one('mouseup', function(){
				viewTarget.page.renderCSS(); 
				$(document).off('mousemove', drag); 
			})
			return this; 
		},
		setColor: function(name, view){ 
			var form = this; 
			if(!view) view = this.page.target; 

			//check text-color, background-color, background-image 
			var val, pseudoClass; 
			if(pseudoclass = form.parent.pseudoClass) pseudoClass = '&:' + pseudoclass;	

			//find that value in the css object of the view 
			if(pseudoclass = view.css.get(pseudoClass)){ 
				val = pseudoclass[name]; 
			}else{ 
				val = view.$el.css(name); 
			} 
			//rgba 
			if( val ){ 
				if(val.slice(0, 4) === 'rgba'){ 
					val = val.slice(5, val.length - 1); 
					var vals = val.split(","); 
					var hex = form.rgbToHex(parseInt(vals[0]), parseInt(vals[1]), parseInt(vals[2])); 

					//colors 
					form.$el.find('input[name=' + name + ']').val(hex); 
					form.$el.find('input[name=' + name + '-r]').val(parseInt(vals[0])); 
					form.$el.find('input[name=' + name + '-g]').val(parseInt(vals[1])); 
					form.$el.find('input[name=' + name + '-b]').val(parseInt(vals[2])); 
					form.$el.find('input[name=' + name + '-alpha]').val(parseFloat(vals[3])); 

				//rgb 
				}else if(val.slice(0, 3) === 'rgb'){ 
					val = val.slice(4, val.length - 1); 
					var vals = val.split(","); 
					var hex = form.rgbToHex(parseInt(vals[0]), parseInt(vals[1]), parseInt(vals[2])); 

					//colors 
					form.$el.find('input[name=' + name + ']').val(hex); 
					form.$el.find('input[name=' + name + '-r]').val(parseInt(vals[0])); 
					form.$el.find('input[name=' + name + '-g]').val(parseInt(vals[1])); 
					form.$el.find('input[name=' + name + '-b]').val(parseInt(vals[2])); 
					form.$el.find('input[name=' + name + '-alpha]').val(1); 

				//hex
				}else if(val[0] === '#'){
					console.log('hex!', val); 
					var color = form.hexToRgb(val); 
					form.$el.find('input[name=' + name + '-r]').val(color.r);
					form.$el.find('input[name=' + name + '-g]').val(color.g);
					form.$el.find('input[name=' + name + '-b]').val(color.b);
					form.$el.find('input[name=' + name + '-alpha]').val(1); 
				}
			}else{				
				form.$el.find('input[name=' + name + '-r]').val(0); 
				form.$el.find('input[name=' + name + '-g]').val(0); 
				form.$el.find('input[name=' + name + '-b]').val(0); 
				form.$el.find('input[name=' + name + '-alpha]').val(1); 
			}
			
			return this; 
		},
		hexToRgb: function(hex) {
		    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
		        return r + r + g + g + b + b;
		    });

		    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		    return result ? {
		        r: parseInt(result[1], 16),
		        g: parseInt(result[2], 16),
		        b: parseInt(result[3], 16)
		    } : null;
		},
		rgbToHex: function(r, g, b) {
		    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
		},
		send: function(dat){
			var target = this.page.target, 
				pageView = this.page.model.get('page').get('page').view; 

			if(this.model.has('pseudoClass')){
				var dummy = {}; 
				dummy['&:'+ this.model.get('pseudoClass')] = dat; 
				target.css.set(dummy); 
			}else{
				target.css.set(dat); 
				target.$el.css(dat); 
			}

			pageView.renderCSS(); 
			
			return this; 
		},
		submit: function(ev){ 
			var formData; 
			ev.preventDefault(); 

			//get form data 
			formData = this.getFormData(); 

			//send to action or alternative 
			this.send(formData); 
		}
	});  
	return Form; 
}); 