define(['HTMLContainer'], function(HTMLContainer){ 
    var TextImageButton = HTMLContainer.extend({ 
		blockClass: 'TextImageButton', 
		superClass: 'HTMLContainer', 
		super: HTMLContainer.prototype, 

		defaults: _.extend({}, HTMLContainer.prototype.defaults, {
            text: 'oh heeeeey', 
			img: 'http://www.caraputzrath.com/yahoo_site_admin/assets/images/hula_hoop11.30553148_std.gif', 
		}), 
		skeleton: { 
			view: {
				css: 'settings.css'
			}, 
            "children":[
                      {
                          "blockClass":"Button", 
                          "settings":{
                              "text":"settings.text", 
                              "css":{
                                  "position":"absolute", 
                                  "height":"60px",
                                  "bottom":0, 
                                  "background":"rgba(0,0,0,.9)", 
                                  "z-index":1, 
                                  "border-radius":0, 
                                  "line-height":"60px"
                              }
                          }
                      }, 
                      {
                          "blockClass":"ImageButton", 
                          "settings":{
                              "text":"settings.text", 
                              "img":"settings.img", 
                              "css":{
                                  "position":"absolute", 
                                  "z-index":0, 
                                  "border-radius":0, 
                                  "img":{
                                      "height":"auto", 
                                      "width":"100%"
                                  }
                              }
                          }
                      }
                  ]
		}
	});	
	return TextImageButton; 
}); 