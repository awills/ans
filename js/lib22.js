
	/*	
		wiedem 05-06-2015
	*/
	
	(
		function(){
			
			var
			setFsByRowCount=function(value){
				
				document.body.style.fontSize=(document.body.clientHeight || document.documentElement.clientHeight || window.innerHeight)/value+"px" 
			} ;
			
			var
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
						
						if(this.ib){
							
							this.write(primaryoutput, ans(expr+this.ib)) ;
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
					
					/* element */
					mo.style.left='100%' ;
					this['\xbb'](primaryoutput)
				} ,
				'square':function(primaryoutput){
					
					this.operation(primaryoutput, 'pow', 2) ;
					
					/* element */
					mo.style.left='100%' ;
					this['\xbb'](primaryoutput)
				} ,
				'square-root':function(primaryoutput){
					
					this.operation(primaryoutput, 'sqrt') ;
					
					/* element */
					mo.style.left='100%' ;
					this['\xbb'](primaryoutput)
				} ,
				'log':function(primaryoutput){
					
					this.operation(primaryoutput, 'log10') ;
					
					/* element */
					mo.style.left='100%' ;
					this['\xbb'](primaryoutput)
				} ,
				'sin':function(primaryoutput){
					
					this.operation(primaryoutput, 'sin') ;
					
					/* element */
					mo.style.left='100%' ;
					this['\xbb'](primaryoutput)
				} ,
				'cos':function(primaryoutput){
					
					this.operation(primaryoutput, 'cos') ;
					
					/* element */
					mo.style.left='100%' ;
					this['\xbb'](primaryoutput)
				} ,
				'tan':function(primaryoutput){
					
					this.operation(primaryoutput, 'tan') ;
					
					/* element */
					mo.style.left='100%' ;
					this['\xbb'](primaryoutput)
				} ,
				'sinh':function(primaryoutput){
					
					this.operation(primaryoutput, 'sinh') ;
					
					/* element */
					mo.style.left='100%' ;
					this['\xbb'](primaryoutput)
				} ,
				'cosh':function(primaryoutput){
					
					this.operation(primaryoutput, 'cosh') ;
					
					/* element */
					mo.style.left='100%' ;
					this['\xbb'](primaryoutput)
				} ,
				'tanh':function(primaryoutput){
					
					this.operation(primaryoutput, 'tanh') ;
					
					/* element */
					mo.style.left='100%' ;
					this['\xbb'](primaryoutput)
				} ,
				'ln':function(primaryoutput){
					
					this.operation(primaryoutput, 'log') ;
					
					/* element */
					mo.style.left='100%' ;
					this['\xbb'](primaryoutput)
				} ,
				'pi':function(primaryoutput){
					
					if(Math.abs){
						
						var
						expr=primaryoutput.textContent ;
						
						primaryoutput.innerHTML=isNaN(expr.charAt(expr.length-1))? expr+Math.PI: expr+'&times;'+Math.PI ;
						this.conv(primaryoutput) 
					}
					
					/* element */
					mo.style.left='100%' ;
					this['\xbb'](primaryoutput)
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
						this.conv(primaryoutput) 
					} 
				} 
			} ;
			
			var
			kbc=function(primaryoutputelement, secondaryoutputelement, characteraction){
				
				var
				write ,
				overflowchk ,
				hasValue ;
				
				var
				writebutton=document.getElementsByTagName('button') ,
				ln=writebutton.length ,
				a=0 ;
				
				var
				readbutton={} ;
				
				var
				indicator=function(buttonchar, newchar){
				
					readbutton[buttonchar].innerHTML=newchar
				} ;
				
				var
				fn=function(){
					
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
					writebutton[a].addEventListener('click', fn, false)
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
				
				var
				begin=10 ;
				
				joy(function(swipe){
				
					if(move[swipe.dir] && swipe.length>begin && hasValue()){
						
						overflowchk() ;
						move[swipe.dir](begin/2) 
					} 
				}) 
			} ;
			
			window.addEventListener('load', function(){
				
				setFsByRowCount(7) ;
				kbc(po, so, charsac) ;
				
				po.addEventListener('click', function(){
					
					mo.style.left={'0%': '100%', '100%': '0%'}[mo.style.left] || '0%' ;
				}, false)
				
			}, false) ;
			
			window.addEventListener('resize', function(){
			
				setFsByRowCount(7) 
				
			}, false) ;
			
		}()
	) ;