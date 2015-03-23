	
	/*
		description :
		pass an event object to a queue of defined function containing information about the touchmove direction and its length. e.g
		
		joy(function(swipe){
			
			swipe.dir -> inf. on the swipe direction
			swipe.length -> details the length of swipe.
			
		}) ;
		
		joy(func):
		adds a function to the queue and returns an id. 
		
		unjoy(id):
		removes function with id from queue.
		
		
	*/
	
	(
		function(){
			
			var
			fn=[] ;
			
			/* two exposed */
			joy=function(func){
				
				return (func && typeof func=="function")? fn.push(func)-1: null
			} ;
			
			unjoy=function(id){
				
				if(isNaN(id)) return ;
				fn.splice(id, 1)
			} ;
			
			var
			invokeAssignedWith=function(arg){
				
				var
				ln=fn.length ,
				a=0 ;
				
				for(; a<ln; a++) fn[a](arg) ;
			} ;
			
			var
			getDir=function(x, advanceX, y, advanceY){
				
				var
				d ;
				
				if(x>advanceX) d="right" ;
				if(x<advanceX) d="left" ;
/*				if(y>advanceY) d="top" ;
				if(y<advanceY) d="bottom" ;*/
				
				return d
			} ;
			
			var
			inf={
				length: 0
			} ;
			
			addEventListener('load', function(e){
				
				var
				x=[] ,
				y=[] ;
				
				e.target.body.addEventListener('touchmove', function(e){
								
								/* singie */
					x.push(e.touches[0].clientX) ;
					y.push(e.touches[0].clientY) ;
					
					/* delay once */
					if(x.length<1) return ;
					
					inf.length++ ;
					
								/* remove trail */
					if(x.length>2) x.shift() ;
					if(y.length>2) y.shift() ;
					
					inf.dir=getDir(x[x.length-2], x[x.length-1], y[y.length-2], y[y.length-1]) ;
					
					invokeAssignedWith(inf) 
				}, false) ;
				
				e.target.body.addEventListener('touchend', function(e){
					
					inf.length=0 ;
					invokeAssignedWith(inf) 					
				}, false)
				
			}, false)
			
		}()
	) ;