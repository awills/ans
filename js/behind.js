
	initFS=function(columns){
		
		document.body.style.fontSize=innerHeight/columns+"px"
	} ;
	
	charaction={
		'C': function(el, self, indicator){
		
			el.innerHTML="" ;
			el.style.right="3px" /* goto end */
			indicator.innerHTML="&laquo;" /* def. dir */
		} ,
		'\u2190': function(el){
			
			var
			ar=el.textContent.split('') ;
			ar.pop() ;
							/* correcting */
			el.innerHTML=ar.join('')
				.split('E').join('<small>E</small>')
				.split('%').join('<small>%</small>') ;
		} ,
		'\xab': function(el, self){
			/* &laquo; */
		
			var
			t=500 ,
			m=self.clientWidth/2 ;
			
			el.style.transition="right ."+t+"s ease" ;

			setTimeout(function(){
				el.style.transition=""
			}, t) ;
			
			el.style.right=parseFloat(el.style.right || 0)-(el.clientWidth-el.parentNode.clientWidth)-m+"px" ;
			self.innerHTML="&raquo;"
		} ,
		'\xbb': function(el, self){
			/* &raquo; */
		
			var
			t=500 ,
			m=3 ; /* def. margin */
			
			el.style.transition="right ."+t+"s ease" ;

			setTimeout(function(){
				el.style.transition=""
			}, t) ;
			
			el.style.right=m+"px" ;
			self.innerHTML="&laquo;"
		} ,
		'=': function(el, self){
			
			if(!el.innerHTML.length) return;
			
			var
			er={} ;
			er['syntax ERROR']=er['char ERROR']=er['division ERROR']=1 ;
			
			var
			r=ansii(el.textContent) ;
			
			if(er[r]){
				
				var
				bk=el.innerHTML ;
				
				el.innerHTML="<font color='#70BF53'>"+r/*.small()*/+"</font>" ;
				
				setTimeout(function(){
					el.innerHTML=bk
				}, 1000) ;
				
				return
			}
									  /* lowercase 'e' occurs for correcting js scientific notation */
			el.innerHTML=(''+r/*.toPrecision(9)*/).split('e').join('<small>E</small>') ;
		}
	} ;
	
	addEventListener('load', function(){
		
		initFS(7) ;
		kbc("button", "p", charaction)
		
	}, false) ;
	
	addEventListener('resize', function(){
		
		initFS(7) ;
		
	}, false)
	