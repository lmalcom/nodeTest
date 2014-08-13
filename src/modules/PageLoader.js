define(['io','create', 'query'], function(io, create, query){ 
	//takes the state JSON and creates a page collection  
    var loadPage = function( settings ){ 
        //adds all of the classes from the settings.classes list, prefixes it with require so we can call them later 
        var controller = this; 
        return new Promise(function(resolve, reject){
         
            if(typeof settings === 'string'){ //check to see if the first arg is json or a reference to the json  
                require(['json!'+ settings], load); 
            }else{ 
                load(settings); 
            } 

            //load it and then call the callback 
            function load(json){ 
                if(!json) return new Error('Cannot load a page without settings'); 
                if(!json.content) json.content = {}; 

                //create a reference to all of the classes in the function so we can create objects
                io.loadClasses(['Block', 'Container', 'Page'].concat(json.classes || []))
                .then(function(classes){

                    //create Page block 
                    create.createBlock.call(controller, {
                        blockClass: json.content.blockClass || 'Page',
                        settings: json.content.settings, 
                        children: json.content.children
                    })
                    .then(function(page){ 
    
                        //start page, if async loading is used then render immediately 
                        page.originalSettings = json; 
                        page.render(); 

                        //cache page and create collection if it doesn't exist 
                        (controller.collection)? 
                            controller.pages.add(page): 
                            controller.pages = new Backbone.Collection([page]);   
                        
                        resolve(page);  
                    }); 
                });
            }
        })
    }; 
    return { 
        loadPage: loadPage
	}
}); 