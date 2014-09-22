define(['io'], function(io){ 
    //create model and set settings/options 
    function _createModel( settings, options ){ 
        return new Backbone.Model(settings, options); 
    }; 

    //create view 
    function _createView(model, klass, attrs){ 
        var controller = this, view; 
        attrs = attrs || {};  

        //add model  
        _.extend(attrs, {model: model}); 

        //create and return view 
        return new klass(attrs); 
    }; 
    function _createSkeleton(skeleton, settings){ 
        if(!skeleton) return; 
        var ret; 
        //set model, view and blockClass 
        if(skeleton.settings || skeleton.children){
            ret = {}; 
            if(skeletonClass = skeleton.blockClass){
                ret.blockClass = _getSkeletonVals({blockClass: skeletonClass}, settings).blockClass; 
            }
            if(skeletonSettings = skeleton.settings){
                ret.settings = _getSkeletonVals(skeletonSettings, settings)
            }
            if(skeletonChildren = (skeleton.children || skeleton.subcollection)){
                ret.children = _getSkeletonValsCollection(skeletonChildren, settings); 
            }
            
            //else this is one of those crazy things... {blockclass:{settings for many...}}
        }else{
            ret = [];  
            _.each(skeleton, function(val, key){
                var key = key.split('.'),
                    blockClass = (key[0] == 'settings' || key[0] == 'Settings')?
                        _.reduce(key.splice(1), function(memo, val){
                            return memo[val]; 
                        }, settings): 
                        key[0]; 
                
                    numTimes = _.reduce(val.settings, function(memo, subVal){
                        //return the largest 'length' attribute to be used for numTimes
                        return (_.isArray(subVal) && subVal.length > memo)? subVal.length: memo; 
                    }, 0); 
                    _.times(numTimes, function(index){
                        var newSkeleton = {
                            blockClass: blockClass, 
                            settings:{}
                        }; 
                        _.each(val.settings, function(subVal, subKey, list){ 

                            //if it is an array of values use array[0] and shift it off   
                            if(_.isArray(subVal)) newSkeleton.settings[subKey] = subVal[index] || subVal[0]; 
                            else newSkeleton.settings[subKey] = val.settings[subKey][index] || val.settings[subKey][0]; 
                        });  
                        ret.push(newSkeleton);  
                    }); 
            }); 
        }
        return ret; 
    }; 
    //Takes the values from settings and places them into the skeleton of the object, if it declares one 
    function _getSkeletonVals(skeletonSettings, obSettings){ 
        var ret = {}; 
        _.each(skeletonSettings, function(val, key){
            
            //allow for 'settings.property.subproperty. or settings.arr.1, or settings.array
            if(_.isString(val)){
                var keys = val.split('.'); 
                if(keys[0] === 'settings' || keys[0] === 'Settings'){
                    keys.shift(); 
                    if(keys[keys.length - 1] !== '*'){
                        ret[key] =
                            _.reduce(keys, function(memo, subval){
                                return memo[subval]; 
                            }, obSettings);
                    }  
                //else if the key starts with a special operand for blocksJS. ``, math(), etc...
//                 }else if(_isSpecial(key[0])){
                    
//                 //otherwise just use the text
//                 }
                }else{
                    ret[key] = val; 
                }
            }
        });
        return ret; 
    }; 
    function _getSkeletonValsCollection(collection, settingsOb){ 
        if(_.isArray(collection)){
            return _.flatten(_.map(collection, function(child){
                return _createSkeleton(child, settingsOb); 
            }), true); 
            
            //else is of the {'blockclass: {settings for many....}} type of declaration 
        }else{
            //first get the class....
            
        }
    }; 

    /*_SETVALS will use the return array from _EXTRACT VALS 
    and place them on individual objects 
    for example we would have something like...
    model :{
        id: ['woefjwo', '2', '4', 'fjjf'], 
        x: 5, 
        color: 'green' 
    }
    but we need to make sure there are 4 models with those properties based on the 
    largest array (ids). */ 
    function _setVals(props){ 
        var arr = [], 
            numTimes = 1; 

        //find number of times to create models/views based on the array with the greatest length 
        _.each(props, function(prop){ 
            if(_.isArray(prop) && prop.length > numTimes) numTimes = prop.length; 
        }); 

        //create those models/views  
        _.times(numTimes, function(index){ 
            var newModel = {}; 
            _.each(props, function(val, key, list){ 
                //var copy = val.slice(); 

                //if it is an array of values use array[0] and shift it off   
                if(_.isArray(val)) newModel[key] = val[index]; 
                else newModel[key] = val; 
            });  
            arr.push(newModel);  
        }); 

        //return collection 
        return arr; 
    } 

    //takes the array of models and the array of views to put 
    //into an array of model/view pairs for the collection object 
    function _createCollection(blockClass, models, views){ 
        
    } 
    
    function parseProps(args){
        if(arguments.length === 0) return; 
        var blockClass = '', settings = {}, children; 

        //allow ('name', {json})
        if(_.isString(args[0])){ 
            blockClass = args[0]; 
            settings = args[1].settings || {}; 
            children = args[1].children || args[1].subcollection; 

        //options object or json 
        }else if(_.isObject(args[0])){ 
            blockClass = (args[0].blockClass)? args[0].blockClass: 'Block';
            settings = args[0].settings || args[0]; 
            children = args[0].children || args[0].subcollection; 
        } 
        
        
        return {
            blockClass: blockClass, 
            settings: settings, 
            children: children
        }
    }
    
    function createBlock(){ 
        var controller = this, 
            props = parseProps(Array.prototype.slice.call(arguments)); 
        if(props.settings || props.blockClass){
            return new Promise(function(resolve, reject){ 
                io.getClass(props.blockClass) 
                .then(function(klass){ 
                    //skeleton
                    var skel = _createSkeleton(klass.prototype.skeleton || {}, props.settings); 
                    _.extend(props, skel); 
                    
                    var model = _createModel(props.settings); 
                    var view = _createView(model, klass, {parent: controller}); 
                    if(children = (props.subcollection || props.children)){
                        createBlockCollection(children, view)
                        .then(function(results){
                            //also put all of the kids in the view's collection...
                            if(view.children) _.each(results, view.children.add, view.children); 
                            resolve(view); 
                        }); 
                    }
                    else{
                        resolve(view); 
                    }
                }); 
            });
        }else{
            return createBlockCollection(props, controller); 
        }
    }
        
    function createBlockCollection(json, ctx){
        var controller = ctx || this; 
        
        //before we make a Promise.all we need to make sure that all of the children are formatted individually (i.e. get rid of the large collections of blocks)
        if(json) console.log('json kiddddds.....', _getSkeletonValsCollection(json)); 
        
        //then make a Promise.all
        return Promise.all(_.map(json, function(child){
            return createBlock.call(controller, child); 
        }))
    }

    //MODULE DEFINITION 
	return { 
        createBlock: createBlock, 
        _createSkeleton: _createSkeleton, 
        _getSkeletonVals: _getSkeletonVals, 
        _getSkeletonValsCollection: _getSkeletonValsCollection, 
        _setVals: _setVals, 
        _createCollection: _createCollection 
    }
}); 