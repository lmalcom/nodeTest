define(['HTMLContainer', 'postal'], function(HTMLContainer, postal){
    var Visualizer = HTMLContainer.extend({
        blockClass:"Visualizer",
        skeleton: { 
            view: {
                "css":{ 
                  "background":"rgba(0,0,0,.7)"
                }
            }, 
            "children":[
              {
                  "blockClass":"Dropdown", 
                  "view":{
                      "name":"blocklist",
                      "inputs":[
                          {
                              "text":"somethin!", 
                              "value":"oh heeeey"
                          }, 
                          {
                              "value":"color", 
                              "text":"ohhhowiejf"
                          }
                      ],
                      "css":{
                          "width":"200px", 
                          "height":"200px", 
                          "overflow-y":"auto", 
                          "float":"left"
                      }
                  }
              }, 
              {
                  "blockClass":"HTMLContainer", 
                  "view":{
                      "className":"vizArea", 
                      "css":{
                          "width":"e('calc(100% - 200px)')", 
                          "background":"rgba(0,0,0,.5)", 
                          "float":"right"
                      }
                  }
              }
            ]
        }, 
        initialize: function(attrs){
            window.vis = this; 
            HTMLContainer.prototype.initialize.call(this, attrs); 
            this.in('test', '*', 'form'); 
        }, 
        test: function(dat){
            var vis = this; 
            console
            vis.children.getByIndex(0).createBlock(dat.slice(0, -3), function(block){
                console.log('just made a block...'); 
                console.log(block); 
                //$('.visArea').html(block.view.render().el); 
            }); 
        }
    }); 
    return Visualizer; 
}); 