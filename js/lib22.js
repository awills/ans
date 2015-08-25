
	/*	
		05-06-2015
	*/
	
	(
		function(){
			
			var
			lodfn ,
			autofs ;
			
			var
			charsac ,
			kbc ;
			
			autofs=function(row){
				
				document.body.style.fontSize=(document.body.clientHeight || document.documentElement.clientHeight || window.innerHeight)/row+"px" 
			} ;
			
			charsac={
				'C':function(primaryoutput, secondaryoutput, button){
					
					if(button['C'].style.fontStyle){
						
						var
						expr=primaryoutput.textContent ,
						ln=expr.length-(ans(expr, 'errorat')*1) ,
						a=0 ;
						
						for(; a<ln; a++){
							
							if(this['\u2190'](primaryoutput)) ln-- ;
						}
						
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
					
					var
					c=ar.pop() ,
					b ;
					
					if(b=c!='E') ar=ar.concat(c) ;
					
					primaryoutput.innerHTML=ar.join('') ;
					this.conv(primaryoutput) ;
					
					this.ib='' ;
					return !b 
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
						.split('E+').join('<small>E+</small>') 
						.split('e+').join('<small>E+</small>') 
						.split('E\u2212').join('<small>E\u2212</small>') 
						.split('e-').join('<small>E\u2212</small>') 
						.split('%').join('<small>%</small>')
						.split('-').join('&minus;')
					;
				} ,
				'zTog':function(pattern){
					
					setTimeout(function(){
					
						b1.style.zIndex=pattern[b1.style.zIndex] || 0 ;
						b2.style.zIndex=pattern[b2.style.zIndex] || 1 ;
					}, 1)
				} ,
				'cube':function(primaryoutput){
					
					this.operation(primaryoutput, 'pow', 3) ;
					this.zTog({'0':1, '1':1})
				} ,
				'square':function(primaryoutput){
					
					this.operation(primaryoutput, 'pow', 2) ;
					this.zTog({'0':1, '1':1})
				} ,
				'square-root':function(primaryoutput){
					
					this.operation(primaryoutput, 'sqrt') ;
					this.zTog({'0':1, '1':1})
				} ,
				'log':function(primaryoutput){
					
					this.operation(primaryoutput, 'log10') ;
					this.zTog({'0':1, '1':1})
				} ,
				'sin':function(primaryoutput){
					
					this.operation(primaryoutput, 'sin') ;
					this.zTog({'0':1, '1':1})
				} ,
				'cos':function(primaryoutput){
					
					this.operation(primaryoutput, 'cos') ;
					this.zTog({'0':1, '1':1})
				} ,
				'tan':function(primaryoutput){
					
					this.operation(primaryoutput, 'tan') ;
					this.zTog({'0':1, '1':1})
				} ,
				'sinh':function(primaryoutput){
					
					this.operation(primaryoutput, 'sinh') ;
					this.zTog({'0':1, '1':1})
				} ,
				'cosh':function(primaryoutput){
					
					this.operation(primaryoutput, 'cosh') ;
					this.zTog({'0':1, '1':1})
				} ,
				'tanh':function(primaryoutput){
					
					this.operation(primaryoutput, 'tanh') ;
					this.zTog({'0':1, '1':1})
				} ,
				'ln':function(primaryoutput){
					
					this.operation(primaryoutput, 'log') ;
					this.zTog({'0':1, '1':1})
				} ,
				'pi':function(primaryoutput){
					
					if(Math.abs){
						
						var
						expr=primaryoutput.textContent ;
						
						primaryoutput.innerHTML=isNaN(expr.charAt(expr.length-1))? expr+Math.PI: expr+'&times;'+Math.PI ;
						this.conv(primaryoutput) 
					}
					
					this.zTog({'0':1, '1':1})
					this['\xbb'](primaryoutput)
				} ,
				'E':function(primaryoutput){
					
					var
					expr=primaryoutput.textContent ,
					ln=expr.length ,
					c=expr.charAt(ln-2)+expr.charAt(ln-1) ;
					
					/* octal '-' */
					var
					t={
						'E\u2212':'E+' ,
						'E+': 'E\u2212' 
					} ;
					
					if(t[c]){
						
						(expr=expr.split('')).pop() ;
						expr.pop() ;
						
						this.write(primaryoutput, expr.join('')+t[c])
					}
					else primaryoutput.innerHTML+='E+' ;
					
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
			
			kbc=function(primaryoutputelement, secondaryoutputelement, characteraction){
				
				var
				pefn=function(){
					
					characteraction.zTog({'0':1, '1':0})
				} ;
				
				assignEvent('touchend', pefn, primaryoutputelement) ;
				
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
					
					/* force focus */
					this.focus() ;
					
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
					
					if(swipe.restrictId('b2') && move[swipe.hdir] && hasValue()){
						
						move[swipe.hdir](4) ;
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
				kbc(po, so, charsac)
			} ;
			
			window.addEventListener('load', lodfn, false)
		}()
	) ;