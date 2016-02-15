	
	// 16-9-15
	// Abrahm

	/*
	   Copyright 2015 Abrahm 

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
			rad ,
			isError ,
			mpro ,
			minv ,
			m={} ,
			bring ,
			typeSplit ,
			evop ,
			evex ,
			ansii ,
			parp ;

			rad=function(n){return n*1*Math.PI/180} ;

			isError=function(s){return {sE:1, cE:1, dE:1}[''+s] || 0} ;

			mpro=function(s){ return ((!Math) && (!Math[s]))? s: '('+Math[s]+')'} ; // Math propety

			minv=function(s, a1, a2){ // Math invoke

				if((!Math) && (!Math[s])) return a1 ;

				var
				x=ansii(a1) ,
				ang={} ;

				if(isError(x)) return a1 ;

				ang.sin=ang.cos=ang.tan=rad(x) ; // state other angles

				return Math[s](ang[s] || x, a2)
			} ;

			m.tanh=function(s){return minv('tanh', s)} ;
			m.cosh=function(s){return minv('cosh', s)} ;
			m.sinh=function(s){return minv('sinh', s)} ;
			m.cos=function(s){return minv('cos', s)} ; 
			m.tan=function(s){return minv('tan', s)} ;
			m.sin=function(s){return minv('sin', s)} ;
			m.round=function(s){return minv('round', s)} ;
			m.floor=function(s){return minv('floor', s)} ;
			m.abs=function(s){return minv('abs', s)} ;
			m.log=function(s){return minv('log10', s)} ;
			m.ln=function(s){return minv('log', s)} ;
			m.sqrt=function(s){return minv('sqrt', s)} ;
			m.pow3=function(s){return minv('pow', s, 3)} ;
			m.pow2=function(s){return minv('pow', s, 2)} ;
			m.random=function(s){return minv('random', s)} ; 
			// other math f

			m.unfinish=function(s){
				
				var
				r=ansii(s, 'unfinish') ;
				return {sE:1, cE:1, dE:1}[''+r]? s: r
			} ;

			m.finish=function(s){
				
				var
				r=ansii(s, 'finish') ;
				return {sE:1, cE:1, dE:1}[''+r]? s: r
			} ;

			m.length=function(s){
				
				var
				r=ansii(s, 'length') ;
				return {sE:1, cE:1, dE:1}[''+r]? s: r
			} ;

			m.errorat=function(s){
				
				var
				r=ansii(s, 'errorat') ;
				return {sE:1, cE:1, dE:1}[''+r]? s: r
			} ;

			m.increase=function(s){
				
				var
				r=ansii(s, 'increase') ;
				return {sE:1, cE:1, dE:1}[''+r]? s: r
			} ;
			// other non math f
			
			bring=function(string, char){
				
				var
				ar=[''] ,
				g=[] ,
				b ,
				c ,
				ln=string.length ,
				a=0 ;
				
				for(; a<ln; a++){
					
					if(isNaN((b=(c=string.charAt(a))=='.')? 0: c)==isNaN(char)) ar[ar.length-1]+=c ; // treat '.' as number
					else{
					
						if(!b) ar.push('') ;
					}
				}
				
				ln=ar.length ;
				
				for(a=0; a<ln; a++){
				
					if(ar[a]!='') g.push(ar[a]) ;
				}
				
				return g 
			} ;

			typeSplit=function(string, char){

				// '+' is appended at beginning of string 
				
				var
				oo=bring(string, '.') ,
				e={} ;
				
				e['E']=e['E+']=e['E-']=e['e']=e['e+']=e['e-']=1 ; // 'e' may proceed with an operator
				
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
						
						ar[a-1]+=(oo[a] || '')+(o[a] || '') ; // test for array undefinition
						oo.splice(a, 1) ;
						o.splice(a, 1)
					}
					ar[a]=o[a]
				}
				
				return ar
			} ;

			evop=function(string){
				
				string=string.split('') ;
				
				var
				ln=string.length ;
				
				if(!arguments[1]){ // recursive function enter once
					
					var
					a=b=0 ;

					for(; a<ln; a++){
						
						if(string[a]=='/' || string[a]=='*' || string[a]=='%') b++ ; // state single high pred. op.
						if(b>1) return 'sE' ;
					}
				}

				var
				stb={} , // single op. table
				alt={} ; // dual op. table

				stb['%']='%+' ; // '+' appended to high pred. ops. (value) not (property)
				stb['/']='/+' ;
				stb['*']='*+' ;
				stb['-']= '-' ;
				stb['+']= '+' ;
				stb['++']=stb['+'] ;
				stb['+-']=stb['-'] ;
				stb['-+']=stb['-'] ;
				stb['--']=stb['+'] ;

				alt['%-']='%-' ; // '+' or '-' appended to high pred. ops. (property) and (value)
				alt['/-']='/-' ;
				alt['*-']='*-' ;
				alt['%+']=stb['%'] ;
				alt['/+']=stb['/'] ;
				alt['*+']=stb['*'] ;

				if(ln<=2) return stb[string[0]+(string[1] || '')] || alt[string[0]+string[1]] || 'sE' ;
				//					single or dual						dual

				var
				c ,
				r ;
				
				/* R-L evaluation */
				if(!(c=stb[string[ln-1]+string[ln-2]])) return 'sE' ;
				
				string.pop() ;
				string.pop() ;
				
				if(r=evop(string.join('')+c, true)) return r ;
			} ;

			evex=function(array, char){
				
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
					
					switch(char || c){ // test for char arg undefinition
						
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

			ansii=function(string, option){
				
				string='+'+string ;
				
				var
				err={} ;
				
				err.NaN="cE" ;
				err.sE="sE" ;
				err.Infinity=err['-Infinity']="dE" ;
				
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
						
						p.errorat=''+snp.join('').length-1 ; // minus additional '+'
						
						if(option in p) return p[option] ;
						return err[c] ;
					} 
					
					ex[a]=exbk[a]=c+o[a]
				} 
				
				p.errorat=''+snp.join('').length-1 ;
				p.length=''+ex.length ;
				p.increase=p.finish=ex[ln-1] ;
				
				c=(p.finish=p.finish.split('')).shift() ;

				p.finish=p.finish.join('') ;
				p.unfinish=ex.splice(0, p.length*1-1).join('')+c ;
				
				ex=exbk ;
				
				if(option in p) return p[option] ;
				
				var
				braced=[] ,
				other=[] ,
				b ;
				
				for(a=0; a<ln-1; a++){ // stepping
				
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
					
					if((c=oo[1].charAt(0))=='/' || c=='*' || c=='%'){ // state single high pred. op.
						
						o=typeSplit(braced[a], '0') ;
						
						var
						r ;
						
						if(err[''+(r=evex([o[0], oo[1].split(c).join('')+o[1]], c))]) return err[''+r] ;
						if((r=ansii(other[a].join('').split(',').join(oo[0]+r)))!==undefined) return r ;
					}
				}
				
				var
				r ;
				
				return err[''+(r=evex(ex))] || r
			} ;
			
			var
			parindex=function(s){
				
				var
				l=s.length ,
				x=[] ,
				i=[] ,
				n=[] ,
				c ,
				a=0 ;
				
				for(; a<l; a++){
					
					if((c=s.charAt(a))=='(' || c==')'){
						
						x.push(c) ;
						i.push(a) 
					}
				}
				
				l=x.length ;
				a=0 ;
				c=x.join('').split('()').join(',,') ;
				
				for(; a<l; a++){
					
					if(c.charAt(a)==',') n.push(i[a]) ;
				}
				
				return n
			} ;
			
			parp=function(s){

				var
				n=--s.split('(').length ;

				if(n!=--s.split(')').length) return 'uE' ; // unmatched ERROR
				if(!n) return s ;

				var
				ol ,
				or ,
				n=parindex(s) ,
				c ,
				v ,
				l ,
				i ;
				
				c=s.split('') ;
				
				ol=c[n[0]-1] || '*' ;
				or=c[n[1]+1] || '*' ;
				
				// '.', 'e' as number
				ol=isNaN(ol=='.' || ol=='e'? 1: ol)? '': '*' ;
				or=isNaN(or=='.' || or=='e'? 1: or)? '': '*' ;
				
				c.splice(n[0], 1, ol+c[n[0]]) ; // fro
				c.splice(n[1], 1, c[n[1]]+or) ; // to
				
				n=parindex(c=c.join('')) ;
				
				l=('('+(v=c.slice(n[0]+1, n[1]))+')').length ;
				
				for(i in m){
					
					if(--s.split(i+'('+v+')').length) return parp(s.split(i+'('+v+')').join('('+m[i](v)+')')) ;
				}
				
				if(isError(v=ansii(v))) return v ; // error chk
				
				c=c.split('') ;
				c.splice(n[0], l, v) ;
				
				return parp(c.join('')) ;
			} ;

			eval2=function(s){

				if(!s) return '' ; // no coersion

				var
				c ;

				s=s
					.split('pi').join(mpro('PI'))
					.split('ln10').join(mpro('LN10'))
					.split('ln2').join(mpro('LN2'))
					.split('log2e').join(mpro('LOG2E'))
					.split('log10e').join(mpro('LOG10E'))
					.split('sqrt1_2').join(mpro('SQRT1_2'))
					.split('sqrt2').join(mpro('SQRT2'))
					.split('\x25').join('%')
					.split('\x2b').join('+')
					.split('\x2f').join(c='/').split('\xf7').join(c)
					.split('\x2a').join(c='*').split('\xd7').join(c)
					.split('\x2d').join(c='-').split('\u2212').join(c)
				;

				return parp(s)
			} ;
		}()
	)