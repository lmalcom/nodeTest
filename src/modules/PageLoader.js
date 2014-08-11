define(['io','create', 'query'], function(io, create, query){ 
	//takes the state JSON and creates a page collection  
    var loadPage = function( settings, callback ){ 

        //adds all of the classes from the settings.classes list, prefixes it with require so we can call them later 
        var controller = this; 
        //check to see if the first arg is json or a reference to the json  
        if(typeof settings === 'string'){ 
            require(['json!'+ settings], function(json){ 
                load(json); 
            }); 
        }else{ 
            load(settings); 
        } 

        //load it and then call the callback 
        function load(json){ 
            var child = {settings: json}; 

            //if user requests a synchronous rendering then it will wait until the page is ready to render
            if(json.sync) _loadPageSync.call(controller, child.settings); 

            //create a reference to all of the classes in the function so we can create objects
            io.loadClasses.call(controller, ['Block', 'Container', 'Page'].concat(json.classes || []), function(){

                //create Page block 
                create.createBlock.call(controller, json.content.blockClass || json.content.view.blockClass || 'Page', json.content || {}, function(page){ 

                    alert('oh hey'); 
                    //start page, if async loading is used then render immediately 
                    child.content = page; 
                    if(!settings.sync) page.view.render(); 

                    //cache page and create collection if it doesn't exist 
                    (controller.collection)? 
                        controller.pages.push(child): 
                    controller.pages = [child];   

                    if(typeof callback === 'function') callback(child);  
                }); 
            }); 
        };             
    }; 
    var _loadPageSync = function(json){ 
        var controller = this, 
            numChildren = query.getNumBlocks(json.content.children); 
            var once = false; 

        controller.renderState = _.after(numChildren, function(dat){ 
            if(!once){
                once = true; 
                var page = controller.pages[0].content.view; 
                (function check(){
                    var containsAll = true; 
                    page.children.each(function(block){
                        if(!page.el.contains(block.el)) containsAll = false; 
                    }); 
                    console.log('containsAll...', containsAll); 
                    if(containsAll){
                        $('body').append(page.el); 
			
                        //renderCSS 
                        page.renderCSS(); 

                        //tell everything that is has it rendered 
                        postal.publish('pageRender'); 
                    }else setTimeout(check, 100); 
                })()
            }
        }); 
        return this; 
    }; 
    return { 
        loadPage: loadPage, 
        _loadPageSync: _loadPageSync
	}
}); 