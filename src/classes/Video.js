define(['HTMLBlock', "https://www.youtube.com/iframe_api?"], function(HTMLBlock){ 
	
	var Video = HTMLBlock.extend({ 
        blockClass: "Video", 
        superClass: 'HTMLBlock', 
		super: HTMLBlock.prototype, 
		defaultCSS: _.extend({}, HTMLBlock.prototype.defaultCSS, { 
			'& > iframe':{ 
				'width':'100%', 
				'height':'100%' 
			} 
		}), 
		template: _.template('<div frameborder="0" style=";"></div>'), 
		defaults:{ 
			video 	:'7RMQksXpQSk', 
            controls: 1, 
		    allowFullscreen: 1,
		}, 
		createPlayer: function(){ 
			var block, div, vid;
                block = this, 
                div = this.el.firstChild, 
                vid = this.get('video'); 

			//create an empty div for the youtube player to occupy. 
			block.player = new YT.Player(div, { 
				playerVars: {  
					"html5" : 1, 
					"enablejsapi" : 1, 
					"wmode":"transparent", 
					'allowFullscreen': block.allowFullscreen, 
					"controls":block.controls,
						}, 
				events: { 
					'onReady' : block.onReady.bind(block),
					//'onStateChange' : block.onPlayerStateChange.bind(block), 
				}
			}); 
		}, 
		onReady : function(event){ 
            var vid = this.get('video'); 
			event.target.cueVideoById(vid); 
		}, 
		playVideo: function(){ 
			if(this.get('player')){ 
				this.get('player').playVideo(); 
			} 
		}, 
		loadVideo : function(id){ 
			if(id &&  this.get('player')){ 
				this.get('player').loadVideoById(id); 
			}
		}, 
		stopVideo : function(){ 
			if(this.get('player')){ 
				this.get('player').stopVideo(); 
			}	
		}, 
		render: function(){ 
			var block = this; 
			HTMLBlock.prototype.render.call(this); 

			//check to see if it is rendered in order to create the player
			(function check(){ 
				if(window.YT && window.YT.loaded && block.el.parentNode) block.createPlayer(); 
				else setTimeout(check, 500); 	
			})()
	
			return this; 
		}
	});  
	return Video; 
}); 