	/*	
		05-06-2015
	*/
	
	(
		function(){
			
			var
			ev ,
			fs ,
			scroll ,
			gototop ,
			display ,
			kbc ,
			charsac ,
			corrchars ;
			
			// break
			
			corrchars=function(el, s, bool){
				
				el.innerHTML=s
					.split('E').join('e')
					.split('\xb7').join('.')
					.split('%').join('<small>%</small>')
					.split('-').join('&minus;')
					.split('open (').join('(')
					.split('close )').join(')')
				;
			} ;
			
			charsac={
				'C':function(primaryoutput, secondaryoutput, button){
					
					if(button['C'].style.fontStyle){
						
						var
						expr=primaryoutput.textContent ,
						ln=expr.length-(eval2('errorat('+expr+')')*1) ,
						a=0 ;
						
						for(; a<ln; a++) this['\u2190'](primaryoutput) ;
						
						button['C'].style.fontStyle='' ;
						this['\xbb'](primaryoutput) ;
						
						return
					}
					/* reset */
					primaryoutput.style.right=primaryoutput.innerHTML=this.ib='' 
				} ,
				'\u2190':function(primaryoutput){
				
					var
					ar=primaryoutput.textContent.split('') ;
					ar.pop() ;
					
					primaryoutput.innerHTML=ar.join('') ;
					corrchars(primaryoutput, primaryoutput.textContent) ;
					
					this.ib='' 
				} ,
				'=':function(primaryoutput, secondaryoutput, button){
					
					var
					expr ,
					r ,
					er={} ;
					
					if(!(expr=primaryoutput.textContent).length) return ;
					
					r=eval2('('+expr+')') ;
					
					er['sE']="syntax<br/>ERROR" ;
					er['cE']="char<br/>ERROR" ;
					er['dE']="division<br/>ERROR" ;
					er['uE']="unmatch<br/>ERROR" ;
					
					if(er[r]){
						
						this.write(secondaryoutput, er[r], 500) ;
						button['C'].style.fontStyle=(expr.length-(eval2('errorat('+expr+')')*1)<=0)? '': 'italic' ;
						
						return
					}
					
					r=eval2('length('+expr+')') ;
					
					if(this.ib){
						
						if(r!=1) this.ib='' ;
						
						if(er[r=eval2('('+expr+'+'+this.ib+')')]) return ;
						
						if(this.ib){
							
							this.write(primaryoutput, r) ;
							
							this['\xab'](primaryoutput, secondaryoutput, button) ;
							return
						}
					}
					
					if(r==2) this.ib=eval2('increase('+expr+')') ;
					
					this.write(primaryoutput, eval2('('+expr+')')) ;
					button['C'].style.fontStyle='' ;
					
					corrchars(primaryoutput, primaryoutput.textContent) ;
					this['\xab'](primaryoutput, secondaryoutput, button)
				} ,
				'\xa0':function(){/* &nbsp; */} ,
				'\xab':function(primaryoutput, secondaryoutput, button){
					/* &laquo; */
					
					var
					t=500 ,
					w=button['\xa0'].clientWidth ;
					
					primaryoutput.style.transition="right ."+t+"s ease" ;
					setTimeout(function(){primaryoutput.style.transition=''}, t) ;
					
					if(primaryoutput.clientWidth>primaryoutput.parentNode.clientWidth){
						
						var
						r=parseFloat(primaryoutput.style.right || 0) ;
						primaryoutput.style.right=r-((primaryoutput.clientWidth+r)-primaryoutput.parentNode.clientWidth)-w+"px" ;
						return 
					}
					
					primaryoutput.style.right=''
				} ,
				'\xbb':function(primaryoutput){
					/* &raquo; */
					
					var
					t=500 ;
					
					primaryoutput.style.transition="right ."+t+"s ease" ;
					setTimeout(function(){primaryoutput.style.transition=''}, t) ;
					
					primaryoutput.style.right='' 
				} ,
				'write':function(el, text, delay){
					
					el.innerHTML=text ;
					if(delay) setTimeout(function(){el.innerHTML=''}, delay) ;
				}
			} ;
				
			kbc=function(primaryoutputelement, secondaryoutputelement, characteraction){
				
				var
				write ,
				overflowchk ,
				hasValue ,
				indicator ,
				enfn ,
				resfn ;
				
				var
				writebutton=document.getElementsByTagName('button') ,
				ln=writebutton.length ,
				a=0 ;
				
				var
				readbutton={} ;
				
				indicator=function(buttonchar, newchar){
				
					readbutton[buttonchar].innerHTML=newchar
				} ;
				
				enfn=function(){
					
					/* force css focus declarations */
					this.focus() ;
					gototop(1) ;
					
					var
					c ;
					
					if(characteraction[c=this.textContent]){
						
						characteraction[c](primaryoutputelement, secondaryoutputelement, readbutton) ;
						overflowchk() ;
						return
					}
					
					write(c) ;
					overflowchk()
				} ;
				
				for(; a<ln; a++){
					
					if(writebutton[a].textContent in characteraction) readbutton[writebutton[a].textContent]=writebutton[a] ;
					assignEvent('touchend', enfn, writebutton[a]) 
				}
				
				write=function(value){
					
					primaryoutputelement.innerHTML+=value ;
					corrchars(primaryoutputelement, primaryoutputelement.textContent)
				} ;
				
				overflowchk=function(){
					
					var
					take=parseFloat(primaryoutputelement.style.right || 0) ,
					c ;
					
					if((c=take<0) || primaryoutputelement.clientWidth>primaryoutputelement.parentNode.clientWidth-take){
					
						indicator('\xa0', c? '\xbb' : '\xab') ;
						return
					}
					
					indicator('\xa0', '\xa0') ;
				} ;
				
				hasValue=function(){
					
					return !!primaryoutputelement.innerHTML.length
				} ;
				
				var
				move={
					left: function(length){
						primaryoutputelement.style.right=(parseFloat(primaryoutputelement.style.right) || 0)-length+"px"
					} ,
					right: function(length){
						primaryoutputelement.style.right=(parseFloat(primaryoutputelement.style.right) || 0)+length+"px"			
					}
				} ;
				
				joy(function(swipe){
					
					if(swipe.restrictId('opaque') && move[swipe.hdir] && hasValue()){
						
						move[swipe.hdir](4) ;
						overflowchk() 
					}
				}) ;
				
				resfn=function(){
				
					overflowchk()
				} ;
				
				window.addEventListener('resize', resfn, false)
			} ;
			
			display=function(elem1, elem2, bool){
				
				if(bool){
					
					elem1.style.visibility="hidden" ;
					elem2.style.visibility="visible" 
					return
				}
				elem1.style.visibility="visible" ;
				elem2.style.visibility="hidden" 
			} ;
		
			gototop=function(bool){
				
				if(bool) opaque.scrollTop=0 ;
			} ;
		
			scroll=function(){
				
				return opaque.scrollTop
			} ;
		
			fs=function(r){
				
				var
				n=document.body.clientHeight/(r || 1) ;
				
				document.body.style.fontSize=n+'px' ;
				return n
			} ;
			
			ev=function(e){
				
				if(e.type=="load" || e.type=="resize") fs(7) ;
				
				if(e.type=="load"){
					
					opaque.addEventListener('scroll', ev, false) ;
					kbc(po, so, charsac)
				}
				
				if(e.type=="scroll") display(s1, s2, scroll()) ;
			} ;
			
			// break
			
			window.addEventListener('load', ev, false)
			window.addEventListener('resize', ev, false)
		}()
	)
