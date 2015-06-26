
	/*
		date: 26-01-15
	*/

	/*
	   Copyright 2015 Abraham Williams

	   Licensed under the Apache License, Version 2.0 (the "License");
	   you may not use this file except in compliance with the License.
	   You may obtain a copy of the License at

		   http://www.apache.org/licenses/LICENSE-2.0

	   Unless required by applicable law or agreed to in writing, software
	   distributed under the License is distributed on an "AS IS" BASIS,
	   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	   See the License for the specific language governing permissions and
	   limitations under the License.
	*/
	
	(
		function(){

			var
			bring=function(string, char){
				
				/*
					
					parameters
					string -> a string value e.g '1200-/12'
					char -> a numeric or non-numeric character e.g '0', '.' respectively
					
					function
					filter-out characters in a string, returns a numeric or non-numeric char array e.g ['1200', '12'], ['--', '/'] respectively

					array values are strings.
					scientific notation is erraoeous typeSplit should be used in such cases.
					is implementated in typeSplit function please, include to work with typeSplit.
					
				*/

				var
				ar=[''] ,
				b ,
				c ,
				ln=string.length ,
				a=0 ;
				
				for(; a<ln; a++){
					
					/* treat '.' as number */
					if(isNaN((b=(c=string.charAt(a))=='.')? 0: c)==isNaN(char)) ar[ar.length-1]+=c ;
					else{
					
						if(!b) ar.push('') ;
					}
				}
				
				var
				g=[] ;
				
				ln=ar.length ;
				
				for(a=0; a<ln; a++){
				
					if(ar[a]!='') g.push(ar[a]) ;
				}
				
				return g 
			} ;
		
			var
			typeSplit=function(string, char){

				/*
					parameters
					string -> a string value e.g '1200--19e-7/12'
					char -> a numeric or non-numeric character e.g '0', '.' respectively
					
					function
					filters numeric and scientific notation, non-numeric characters in a string, returns a numeric or non-numeric char array e.g ['1200', '19e-7', '12'], ['--', '/'] respectively. 
					
					array values are strings
				*/
				
				/* '+' must be appended at beginning of string */
				
				var
				oo=bring(string, '.') ,
				e={} ;
				
				/* 'e' may proceed with an operator */
				e['E']=e['E+']=e['E-']=e['e']=e['e+']=e['e-']=1 ;
				
				if(isNaN(char)){
					
					var
					ln=oo.length ,
					a=0 ;
					
					for(; a<ln; a++){
						
						if(e[oo[a]]) oo.splice(a, 1) ;
					}
					
					return oo ;
				} 
				
				var
				o=bring(string, '0') ,
				ln=oo.length ,
				ar=[] ,
				a=0 ;
				
				for(; a<oo.length; a++){
					
					if(e[oo[a]]){
						
								 /* test for array undefinition */
						ar[a-1]+=(oo[a] || '')+(o[a] || '') ;
						oo.splice(a, 1) ;
						o.splice(a, 1)
					}
					ar[a]=o[a]
				}
				
				return ar
			} ;
			
			var
			evop=function(string){
				
				/*
					parameter
					string -> a string e.g '--+-'
					
					function
					evaluate operators, returns a string 'sE' (syntax ERROR) if unsuccessful in evaluation
					
					'--+-' = '-'
					'/--' = '/+'
					'/--+*' = 'sE'
				*/
				
				string=string.split('') ;
				
				var
				ln=string.length ;
				
				/* recursive function enter once */
				if(!arguments[1]){
					
					var
					a=0 ,
					b=a ;
					
					for(; a<ln; a++){
						
						/* state single high pred. op. */
						if(string[a]=='/' || string[a]=='*' || string[a]=='%') b++ ;
						if(b>1) return 'sE' ;
					}
				}
				
				/* single op. table */
				/* '+' appended to high pred. ops. (value) not (property)*/
				var
				stb={
					'%': '%+' ,
					'/': '/+' ,
					'*': '*+' ,
					'-': '-' ,
					'+': '+'
				} ;
				
				stb['++']=stb['+'] ;
				stb['+-']=stb['-'] ;
				stb['-+']=stb['-'] ;
				stb['--']=stb['+'] ;
				
				if(ln<=2){
					
					/* dual op. table */
					/* '+' or '-' appended to high pred. ops. (property) and (value) */
					var
					alt={
						'%+': stb['%'] ,
						'%-': '%-' ,
						'/+': stb['/'] ,
						'/-': '/-' ,
						'*+': stb['*'] ,
						'*-': '*-'
					} ;
						   /* single or dual */                /* dual */
					return stb[string[0]+(string[1] || '')] || alt[string[0]+string[1]] || 'sE' ;
				} 
				
				var
				c ,
				r ;
				
				/* R-L evaluation */
				if(!(c=stb[string[ln-1]+string[ln-2]])) return 'sE' ;
				
				string.pop() ;
				string.pop() ;
				
				if(r=evop(string.join('')+c, true)) return r ;
			} ;
			
			var
			evex=function(array, char){
				
				/*
					parameters
					array -> an array of mathematical chars e.g ['+500', '/20']
					char -> a high predesence operator e.g '/'
					
					function
					evaluate an array of mathematical characters, returns a javascript number e.g 21, 2.3e-23
				*/
				
				var
				ln ,
				c ,
				a=0 ,
				n=array[0]*1 ;
				
				array.shift() ;
				ln=array.length ;
				
				for(; a<ln; a++){
					
					if(char || (c=array[a].charAt(0))) ;
					
					if(c){
						
						var
						bk=array[a].split('') ;
						bk.shift() ;
						array[a]=bk.join('') ;
					}
					
					/* test for char arg undefinition */
					switch(char || c){
						
						case '%':
							n%=array[a]*1
						break ;
						case '/':
							n/=array[a]*1
						break ;
						case '*':
							n*=array[a]*1
						break ;
						case '-':
							n-=array[a]*1
						break ;
						case '+':
							n+=array[a]*1
						break;
					}
				}
				
				return n
			} ;

			var
			convToNative=function(string){
				
				/*
					parameter
					string-> a string value containing supported operators
					
					function
					converts characters to keyboard natives
				*/
				
				string=string
					.split('\x25').join('%')
					.split('\x2b').join('+')
					.split('\x2f').join('/').split('\xf7').join('/')
					.split('\x2a').join('*').split('\xd7').join('*')
					.split('\x2d').join('-').split('\u2212').join('-')
				;
				
				return string
			} ;
			
			var
			convToSpecial=function(string){
			
				/*
					parameter
					string-> a string value containing supported operators
					
					function
					converts native characters to html special characters
				*/
				
				string=string
					.split('*').join('&times;')
					.split('/').join('&divide;')
					.split('-').join('&minus;')
				;
				
				return string
			} ;
			
			var
			ansii=function(string, isreentry, option){
				
				string='+'+(!isreentry? convToNative(string): string) ;
				
				var
				err={} ;
				
				err.NaN="char ERROR" ;
				err.sE="syntax ERROR" ;
				err.Infinity=err['-Infinity']="division ERROR" ;
				
				var
				oo=typeSplit(string, '.') ,
				o=typeSplit(string, '0') ;
				
				var
				ln=oo.length ,
				a=0 ,
				c ,
				ex=[] ,
				exbk=[] ,
				p={} ,
				snp=[] ;
				
				for(; a<ln; a++){
					
					snp[a]=oo[a]+(o[a] || 0) ;
					
					if(err[c=(o[a]*1)] || err[c=evop(oo[a])]){
						
						/* minus additional '+' */
						p.errorat=''+(snp.join('').length-1) ;
						
						if(option in p) return p[option] ;
						return err[c] ;
					} 
					
					ex[a]=exbk[a]=c+o[a]
				} 
				
				p.length=''+ex.length ;
				p.increase=p.finish=ex[ln-1] ;
				
				c=(p.finish=p.finish.split('')).shift() ;
				p.finish=p.finish.join('') ;
				
				p.unfinish=convToSpecial(ex.splice(0, p.length*1-1).join('')+c) ;
				
				ex=exbk ;
				
				if(option in p) return p[option] ;
				
				var
				braced=[] ,
				other=[] ,
				b ;
				
				/* stepping */
				for(a=0; a<ln-1; a++){
				
					braced[a]="" ;
					other[a]=[] ;
					
					for(b=0; b<ln; b++){
					
						if(b>=a && b<=a+1){
						
							if(b%2) other[a].push(',') ;
							braced[a]+=ex[b] 
						}
						else other[a].push(ex[b]) ;
					}
				}
				
				ln=braced.length ;
				
				for(a=0; a<ln; a++){
					
					oo=typeSplit(braced[a], '.') ;
					
					/* state single high pred. op. */
					if((c=oo[1].charAt(0))=='/' || c=='*' || c=='%'){
						
						o=typeSplit(braced[a], '0') ;
						
						var
						r ;
						
						if(err[''+(r=evex([o[0], oo[1].split(c).join('')+o[1]], c))]) return err[''+r] ;
						if((r=ansii(other[a].join('').split(',').join(oo[0]+r), true))!==undefined) return r ;
					}
				}
				
				var
				r ;
				
				return err[''+(r=evex(ex))] || r
			} ;
			
			this.ans=function(expression, option){
				
				/*
					parameter
					expression-> string mathematical expression
					option-> string operation options 'increase', 'finish', 'unfinish', 'errorat', 'length'
					
					function
					return number or string
				*/
				
				return ansii(expression, false, option) 
			} ;
			
		}()
	) ;
