
	/*	
		05-06-2015
	*/
	
	(
		function(){
			
			var
			lodfn ,
			togfn ,
			autofs ;
			
			var
			charsac ,
			kbc ;
			
			togfn=function(){
				
				var
				c={
					'0':1 ,
					'1':0
				} ;
				
				b1.style.zIndex=c[b1.style.zIndex || 1] ;
				b2.style.zIndex=c[b2.style.zIndex || 0] 
			} ;
			
			autofs=function(row){
				
				document.body.style.fontSize=(document.body.clientHeight || document.documentElement.clientHeight || window.innerHeight)/row+"px" 
			} ;
			
			charsac={
				'C':function(primaryoutput, secondaryoutput, button){
					
					if(button['C'].style.fontStyle){
						
						/* crop expr. */
						var
						expr=primaryoutput.textContent ,
						ln=expr.length-(ans(expr, 'errorat')*1) ,
						a=0 ;
						
						for(; a<ln; a++) this['\u2190'](primaryoutput) ;
						
						button['C'].style.fontStyle='' ;
						
						this['\xbb'](primaryoutput)
						return 
					}
					
					/* reset */
					primaryoutput.style.right=primaryoutput.innerHTML=this.ib='' 
				} ,
				'\u2190':function(primaryoutput){
				
					var
					ar=primaryoutput.textContent.split('') ;
					ar.pop() ;
					
					/* correcting */
					primaryoutput.innerHTML=ar.join('') 
						.split('E').join('<small>E</small>')
						.split('%').join('<small>%</small>') 
					;
				} ,
				'=':function(primaryoutput, secondaryoutput, button){
					
					var
					expr ;
					
					if(!(expr=primaryoutput.textContent).length) return ;
					
					var
					r=ans(expr) ;
					
					var
					er={} ;
					er['syntax ERROR']=er['char ERROR']=er['division ERROR']=1 ;
					
					if(er[r]){
						
						this.write(secondaryoutput, r, 500) ;
						
						/* infinity bail */
						
						button['C'].style.fontStyle=(expr.length-(ans(expr, 'errorat')*1)<=0)? '': "italic" ;
						return
					}
					
					r=ans(expr, 'length') ;
					
					if(this.ib){
						if(r!=1) this.ib='' ;
						
						if(er[r=ans(expr+this.ib)]) return ;
						
						if(this.ib){
							
							this.write(primaryoutput, r) ;
							this.conv(primaryoutput) ;
							
							this['\xab'](primaryoutput, secondaryoutput, button) ;
							return
						}
					}
					
					if(r==2) this.ib=ans(expr, 'increase') ;
					
					this.write(primaryoutput, ans(expr)) ;
					button['C'].style.fontStyle='' ;
					this.conv(primaryoutput) ;
					
					this['\xab'](primaryoutput, secondaryoutput, button)
					
				} ,
				'\xa0':function(){/* &nbsp; */} ,
				'\xab':function(primaryoutput, secondaryoutput, button){
					/* &laquo; */
					
					var
					t=500 ,
					w=button['\xa0'].clientWidth/2 ;
					
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
				'toRad':function(value){
					
					return value*1*Math.PI/180 
				} ,
				'write':function(el, text, delay){
					
					el.innerHTML=text ;
					if(delay) setTimeout(function(){el.innerHTML=''}, delay) ;
				} ,
				'conv':function(el){
					
					el.innerHTML=el.textContent
						.split('E').join('<small>E</small>')
						.split('e').join('<small>E</small>')
						.split('%').join('<small>%</small>')
						.split('-').join('&minus;')
					;
				} ,
				'cube':function(primaryoutput){
					
					this.operation(primaryoutput, 'pow', 3) ;
					togfn()
				} ,
				'square':function(primaryoutput){
					
					this.operation(primaryoutput, 'pow', 2) ;
					togfn()
				} ,
				'square-root':function(primaryoutput){
					
					this.operation(primaryoutput, 'sqrt') ;
					togfn()
				} ,
				'log':function(primaryoutput){
					
					this.operation(primaryoutput, 'log10') ;
					togfn()
				} ,
				'sin':function(primaryoutput){
					
					this.operation(primaryoutput, 'sin') ;
					togfn()
				} ,
				'cos':function(primaryoutput){
					
					this.operation(primaryoutput, 'cos') ;
					togfn()
				} ,
				'tan':function(primaryoutput){
					
					this.operation(primaryoutput, 'tan') ;
					togfn()
				} ,
				'sinh':function(primaryoutput){
					
					this.operation(primaryoutput, 'sinh') ;
					togfn()
				} ,
				'cosh':function(primaryoutput){
					
					this.operation(primaryoutput, 'cosh') ;
					togfn()
				} ,
				'tanh':function(primaryoutput){
					
					this.operation(primaryoutput, 'tanh') ;
					togfn()
				} ,
				'ln':function(primaryoutput){
					
					this.operation(primaryoutput, 'log') ;
					togfn()
				} ,
				'pi':function(primaryoutput){
					
					if(Math.abs){
						
						var
						expr=primaryoutput.textContent ;
						
						primaryoutput.innerHTML=isNaN(expr.charAt(expr.length-1))? expr+Math.PI: expr+'&times;'+Math.PI ;
						this.conv(primaryoutput) 
					}
					
					togfn() ;
					this['\xbb'](primaryoutput)
				} ,
				'E':function(primaryoutput){
					
					var
					er={} ;
					er['syntax ERROR']=er['char ERROR']=er['division ERROR']=er['Infinity']=er['-Infinity']=er['NaN']=1 ;
					
					var
					expr=primaryoutput.textContent ,
					r ,
					ln ,
					t ;
					
					r=ans(expr, 'finish') ;
					
					if(er[r]) return ;
					
					if(r.split('E').length==1) r=r+'E-0' ;
					
					ln=r.split('E')[0].length ;
					r=r.split('') ;
					
					t={
						'-': '+' ,
						'+': '-'
					}
					
					r.splice(ln, 2, 'E', t[r[ln+1]]) ;
					r=r.join('') ;
					
					r=ans(expr, 'unfinish')+r ;
					
					if(r.charAt(0)=='+'){
						
						(r=r.split('')).shift() ;
						r=r.join('')
					}
					
					this.write(primaryoutput, r) ;
					this.conv(primaryoutput) ;
					this['\xbb'](primaryoutput) ;
					
					this.ib=''
				} ,
				'operation':function(primaryoutput, type, superscript){
					
					if(Math.abs){
						
						var
						er={} ;
						er['syntax ERROR']=er['char ERROR']=er['division ERROR']=er['Infinity']=er['-Infinity']=er['NaN']=1 ;
						
						var
						expr=primaryoutput.textContent ;
						
						var
						ln=ans(expr, 'length') ,
						r=ans(expr, (ln!=1)? 'finish': 'increase') ,
						a={} ;
						
						/* angles, arcangles */
						a.sin=a.cos=a.tan=a.asin=a.acos=a.atan=this.toRad(r) ;
						
						if(type in a) r=a[type] ;
						
						/* fearful math second arg */
						if(er[r] || er[r=Math[type](r, superscript || '')]) return ;
						
						r=(ln!=1)? ans(expr, 'unfinish')+r: r ;
						
						if((''+r).charAt(0)=='+'){
						
							(r=r.split('')).shift() ;
							r=r.join('')
						}
						
						this.write(primaryoutput, r) ;
						this.conv(primaryoutput) ;
						this['\xbb'](primaryoutput) 
					} 
				} 
			} ;
			
			kbc=function(primaryoutputelement, secondaryoutputelement, characteraction, togglefunc){
				
				assignEvent('touchend', togglefunc, primaryoutputelement) ;
				
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
					
					var
					c={
						'%': '<small>%</small>' ,
						'E': '<small>E</small>+' ,
						'\xb7': '.'
					} ;
					
					primaryoutputelement.innerHTML+=c[value] || value
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
					
					if(move[swipe.hdir] && hasValue()){
						
						move[swipe.hdir](5) ;
						overflowchk() 
					}
				}) ;
				
				resfn=function(){
				
					autofs(7) ;
					overflowchk()
				} ;
				
				window.addEventListener('resize', resfn, false)
			} ;
			
			lodfn=function(){
				
				autofs(7) ;
				kbc(po, so, charsac, togfn)
			} ;
			
			window.addEventListener('load', lodfn, false)
			
		}()
	) ;