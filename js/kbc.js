	
	kbc=function(inputstagname, outputstagname, characteraction){
		
		var
		butt=document.getElementsByTagName(inputstagname) ,
		p=document.getElementsByTagName(outputstagname) ,
		ln=butt.length ,
		a=0 ;
		
		var
		overflowindicator ,
		write ,
		overflowchk ,
		hasValue ;
		
		var
		func=function(){
			
			if(characteraction[this.textContent]){
													  /* self */ 
				characteraction[this.textContent](p[0], this, overflowindicator) ;
				overflowchk(3)
				return
			}
			
			write(this.textContent) ;
			overflowchk(3)
		} ;
		
		for(; a<ln; a++){
		
			butt[a].addEventListener('click', func, false) ;
											/* &laquo; hidden onload */
			if(butt[a].innerHTML=='\xab') (overflowindicator=butt[a]).style.visibility="hidden" ;
		}
		
		write=function(value){
			
			var
			c={
				'%': '<small>%</small>' ,
				'E': '<small>E</small>+' ,
				'\xb7': '.'
			} ;
			
			p[0].innerHTML+=c[value] || value
		} ;
		
		hasValue=function(){
			
			return !!p[0].innerHTML.length
		} ;
		
		overflowchk=function(gutter){
			
			var
			take ;
					/* no leakage */
			take=0>(take=(parseFloat(p[0].style.right) || gutter))? 0: take ;
			
			if(p[0].clientWidth>(p[0].parentNode.clientWidth-take) || !take) overflowindicator.style.visibility="visible" ;
			else overflowindicator.style.visibility="hidden" ;
		} ;
		
		var
		move={
			left: function(length){
				p[0].style.right=(parseFloat(p[0].style.right) || 0)-length+"px"
			} ,
			right: function(length){
				p[0].style.right=(parseFloat(p[0].style.right) || 0)+length+"px"			
			}
		} ;
		
		joy(function(swipe){
		
			if(move[swipe.dir] && swipe.length && hasValue()){
				
				overflowchk(3) ; /* auto notify overflow */
				move[swipe.dir](3) 
			} 
		}) 
		
	} ;
	