define([], function(){ 
    function load ( classes){ 
        return new Promise(function(resolve, reject){ 
            if(!classes) resolve(); 
            require(['require'].concat(classes || []), function(require){ 
                var cache = _.map(classes, function(klass){  
                    return require(klass);         
                }); 
               
                //send back the array or if there is only one just the one class
                (cache.length === 1)? 
                    resolve(cache[0]): 
                    resolve(cache); 
            }); 
        })
        
    }; 

	return {
		//IO functions 
        getClass: function(name){ 
            return load([name]); 
        }, 

        //returns an array of class prototypes that were asked for 
        loadClasses: load
	}
}); 