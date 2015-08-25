	
	/*
		24-06-15
	*/
	
	/*
		exposes functions joy, unjoy and assignEvent
		
		joy(func)
		-----
		adds a function to the queue and returns an id. 
		
		unjoy(id)
		-----
		removes function with id from queue.
		
		assignEvent(type, func, el)
		-----
		assign an event to an element, stops the event when swiped
	*/
	
	(
		function($){
			
			var
			mvfn ,
			endfn ,
			hDir ,
			vDir ;
			
			var
			assign=[] ,
			invokeAssignWith ;
			
			var
			x=[] , 
			y=[] ;
			
			var
			inf={
				length: 0 ,
				keystart: 5 
			} ;
			
			hDir=function(x, advanceX){
				
				return (x>advanceX)? 'right': 'left'
			} ;
			
			vDir=function(y, advanceY){
				
				return (y>advanceY)? 'top': 'bottom'
			} ;
			
			invokeAssignWith=function(arg){
				
				/* start swipe */
				if(inf.length>inf.keystart){
				
					var
					ln=assign.length ,
					a=0 ;
					
					for(; a<ln; a++) assign[a](arg) ;
				}
			} ;
			
			mvfn=function(e){
				
				/* restrictions */
				inf.restrictId=function(id){
					
					var
					t=e.target ;
					
					for(;;){
						
						if({'null':1}[t]) return true;
						if(t.id==id) return false ;
						
						t=t.parentNode ;
					}
				} ;
			
				/* singie */
				x.push(e.touches[0].clientX) ;
				y.push(e.touches[0].clientY) ;
				
				/* delay once */
				if(x.length<1) return ;
				
				inf.length++ ;
				
				/* remove trail */
				if(x.length>2){
				
					x.shift() ;
					y.shift() 
				} 
				
				/* projecting from x to x */
				inf.hdir=hDir(x[x.length-2], x[x.length-1]) ; 
				inf.vdir=vDir(y[y.length-2], y[y.length-1]) ;
				
				invokeAssignWith(inf)
			} ;
			
			endfn=function(e){
				
				inf.length=0 ;
				invokeAssignWith(inf)
			} ;
			
			/* public */
			$.assignEvent=function(type, func, el){
				
				el.addEventListener(type, function(e){
					
					/* stop event */
					if(inf.length>inf.keystart){
					
						el.removeEventListener(type, func, false) ;
						el.addEventListener(type, func, false)
					} 
					
				}, false) ;
				
				el.addEventListener(type, func, false)
			} ;
			
			/* public */
			$.joy=function(func){
				
				return assign.push(func)-1
			} ;
			
			/* public */
			$.unjoy=function(id){
				
				assign.splice(id*1, 1)
			} ;
			
			var
			lodfn=function(){
				
				document.body.addEventListener('touchmove', mvfn, false) ;
				document.body.addEventListener('touchend', endfn, false)
			} ;
			
			window.addEventListener('load', lodfn, false)
			
		}(this)
	)
	