define(['HTMLBlock'], function(HTMLBlock){ 
	var Image = HTMLBlock.extend({ 
		blockClass: 'Image', 
		superClass: 'HTMLBlock', 
		super: HTMLBlock.prototype, 
        defaultCSS: _.extend({}, HTMLBlock.prototype.defaultCSS, {	
			'img':{
				"display":"block", 
                "margin":"auto auto", 
                "height":"100%"
			}
		}), 
		defaults:{
			img: 'http://www.caraputzrath.com/yahoo_site_admin/assets/images/hula_hoop11.30553148_std.gif', 
            alt: 'oh heeeey', 
            title: 'oh heeeey'
		}, 
		skeleton: { 
			model:{
				img: 'settings.img'
			}			
		}, 
		template: 	function(dat){ 
			return _.template('<img alt="<%= data.alt %>" title= "<%= data.title %>" src= <%= data.img %> />', dat, {variable: 'data'}); 
		}
	});	
	return Image; 
}); 