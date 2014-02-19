var s, RTHighlight = {
	
	settings: {
		tab: '<tb></tb>',/*'&nbsp;&nbsp;',*/
		nl: [/*"input", "br", "img", */"h1", "h2", "a", "label", "span"],	// ends on the same line
		endNodes: ["input", "img", "br"],	// ends with / in same line
	},
	content: '',
	content2: '',
	
	init: function(options){
		s 			= this.settings;
		s.name		= options.name || 'hoi';

		this.countLines();
	},


	countLines: function(){
		el = document.getElementsByClassName('RTCode');
		//console.log('r: '+elements.length);
		var a,b,c,d,e,f,g,h,i,y,z,
			content = '';
		for(a=0; a < el.length; a++){
			this.content = '';
			this.content2 = '';
			this.linesLoop(el[a], a);
			el[a].innerHTML = this.content;
			//console.log(this.content);
		}
	},
	linesLoop: function(el, index){
		//ln 		= el.localName;
		//console.log(el);
//		console.log(this.gtabs(0));
		if(el.children.length > 0){
			// has child(s)
			for (var i = 0; i < el.children.length; i++) {
				els 		= el.children[i];
				//ln 			= el.children[i].localName;
				adds		= '';
				newLines	= '';
				var els 			= el.children[i],
					ln 				= el.children[i].localName,
					tabs			= '',
					fnl				= '',
					text 			= '',
					oneLine			= false,	// moet eindigen op dezelfde regel inNewLine om te forceren
					endSlash		= false,	// sluiten van de regel moet in dezelfde tag
					tabCount 		= 0,		// tabs voor de tag
					tabCountEnd		= 0,		// tabs voor het sluiten van de tag
					sameLine		= false,	// in 1 regel
					inNewLine		= false,	// in een nieuwe regel forceren
					newLineAft		= '',
					elText			= '',
					elTB 			= false;

				if(this.inar(el.children[i].localName, s.endNodes)) endSlash = true; // eindigt op zelfde lijn met een />
				//if(this.inar(ln, s.nl))				oneLine		= true;	// eindigt op zelfde lijn
				if(els.getAttribute('rthtabs', 1)){	tabCount	= els.getAttribute('rthtabs', 1); }
				if(els.getAttribute('RTHLine', 1) == 'true' || this.inar(ln, s.nl)){	sameLine	= true; }

				if(els.getAttribute('rthnline',1)){	inNewLine	= true; }
				if(els.getAttribute('rthtext', 1)){	elText		= els.getAttribute('rthtext', 1); }
				else { elTB = false }
				var inChilds		= (els.children.length>0) ? true : false;

				if(sameLine == false){
					endNewLine = '<br>'; newLine = '<br>';
				} else {
					endNewLine = ''; newLine = '';
				}
				//endNewLine			= (sameLine == true) ? '' : '<br>';
				//newLine				= (sameLine == true) ? '' : '<br>';
				//tabCountEnd			= (sameLine == true) ? 0 : tabCount;
				if(inChilds == false){
					newLine		= '';
				} else {
					newLine		= '<br>';
				}
				//console.log(newLine, inChilds, els);
				// als het 1 line moet zijn en het blijft 
				if(els.getAttribute('rthtabs', 1))	tabCount	= els.getAttribute('rthtabs', 1);
				//if(elText) tabCount += 1;
				adds				+= this.getAttributes(els);
				
				if(endSlash) adds	+= '/';
				// nieuwe lijn is als er geen kinderen in zitten null
				newLine				= (inChilds == false) ? '' : newLine;
				//tabCount 			= (inChilds == false) ? '' : tabCount;
				this.content 		+= (inChilds == false) ? '' : this.gtabs(tabCount);
				console.log(inChilds, els)
				// open de tag
				this.content 		+= this.genSpan('RTH-el', '&lt;'+ln);
				this.content 		+= adds;
				this.content 		+= this.genSpan('RTH-el', '&gt;');
				this.content		+= newLine;
				// tekst van het element
				//if(elText && inChilds == false && sameLine == false) this.content += this.gtabs(tabCount);
				this.content 		+= (inChilds == false) ? '' : this.gtabs(tabCount);
				console.log(inChilds, els)
				this.content 		+= (elTB == false && inChilds == false) ? '' : this.gtabs(tabCount);
				console.log(elText, inChilds, els);
				//this.content 		+= (inChilds == false) ? '' : this.gtabs(tabCount);
				this.content 		+= elText;
				// elementen binnen het element
				this.linesLoop(el.children[i], i);

				//endNewLine			= (sameLine == false) ? '<br>' : '';
				newLineAft			= '<br>';
				if(elTB == false || el.children[i].children.length > 0){
					endNewLine		= endNewLine;
				} else {
					endNewLine		= '{<br>}';
				}
				endNewLine			= (elTB == false) ? '' : '<br>';
				endNewLine			= (el.children[i].children.length == 0) ? '' : '<br>';
				// sltui het element af
				this.content 		+= (el.children[i].children.length > 0) ? '' : endNewLine;
				this.content 		+= (el.children[i].children.length == 0 && elTB == false) ? '' : this.gtabs(tabCount);
				//this.content 		+= (elTB == false) ? this.gtabs(tabCount) : 'L';

				this.content 		+= this.genSpan('RTH-el', '&lt;/'+el.children[i].localName+'&gt;');
				this.content 		+= newLineAft;

			};
		} else {
			// no more childs
		}
	},

	getAttributes: function(el) {
		var attributes = '';

		if(el.id)				attributes			+= ' '+this.genSpan('RTH-a', 'id=')+this.genSpan('RTH-at', '"'+el.id+'"');
		// for each classes
		if(el.className)		attributes			+= ' '+this.genSpan('RTH-a', 'class=')+this.genSpan('RTH-at', '"'+el.className+'"');
		// for each data tag
		if(el.dataset){
			for (var x in el.dataset) attributes 	+= ' '+this.genSpan('RTH-a', 'data-'+x+'=')+this.genSpan('RTH-at', '"'+el.dataset[x]+'"');
		}
		if(el.type)				attributes 			+= ' '+this.genSpan('RTH-a', 'type=')+this.genSpan('RTH-at', '"'+el.type+'"');
		// if value
		if(el.value) 			attributes 			+= ' '+this.genSpan('RTH-a', 'value=')+this.genSpan('RTH-at', '"'+el.type+'"');
		// if name
		if(el.name) 			attributes 			+= ' '+this.genSpan('RTH-a', 'name=')+this.genSpan('RTH-at', '"'+el.name+'"');
		// if alt
		if(el.alt) 				attributes 			+= ' '+this.genSpan('RTH-a', 'alt=')+this.genSpan('RTH-at', '"'+el.alt+'"');
		// if for
		if(el.htmlFor) 			attributes 			+= ' '+this.genSpan('RTH-a', 'for=')+this.genSpan('RTH-at', '"'+el.htmlFor+'"');
		// if src (source)
		if(el.src) 				attributes 			+= ' '+this.genSpan('RTH-a', 'src=')+this.genSpan('RTH-at', '"'+el.src+'"');
		if(el.getAttribute('RTH-src', 2)){
								attributes 			+= ' '+this.genSpan('RTH-a', 'src=')+this.genSpan('RTH-at', '"'+el.getAttribute('RTH-src', 2)+'"');
		}
		// if href
		if(el.href) 			attributes 			+= ' '+this.genSpan('RTH-a', 'href=')+this.genSpan('RTH-at', '"'+el.href+'"');
		// if method
		if(el.method) 			attributes 			+= ' '+this.genSpan('RTH-a', 'method=')+this.genSpan('RTH-at', '"'+el.method+'"');
		// if action
		if(el.action) 			attributes 			+= ' '+this.genSpan('RTH-a', 'action=')+this.genSpan('RTH-at', '"'+el.action+'"');
		if(el.getAttribute('RTH-action', 2)){
								attributes 			+= ' '+this.genSpan('RTH-a', 'action=')+this.genSpan('RTH-at', '"'+el.getAttribute('RTH-action', 2)+'"');
		}
		// if title
		if(el.title) 			attributes 			+= ' '+this.genSpan('RTH-a', 'titel=')+this.genSpan('RTH-at', '"'+el.title+'"');
		// if title
		if(el.download) 		attributes 			+= ' '+this.genSpan('RTH-a', 'download=')+this.genSpan('RTH-at', '"'+el.download+'"');
		// if title
		if(el.hidden) 			attributes 			+= ' '+this.genSpan('RTH-a', 'hidden=')+this.genSpan('RTH-at', '"'+el.hidden+'"');
		// if title
		if(el.target) 			attributes 			+= ' '+this.genSpan('RTH-a', 'target=')+this.genSpan('RTH-at', '"'+el.target+'"');
		// if title
		if(el.rel) 				attributes 			+= ' '+this.genSpan('RTH-a', 'rel=')+this.genSpan('RTH-at', '"'+el.rel+'"');
		// for each style attr
		if(el.style[0])			attributes			+= ' '+this.getStyles(el)+'';

		return attributes;
	},

	getClasses: function(el) {
		//if(el.className)
	},

	getStyles: function(el){
		var content = '';
		if(el.style[0]){
			content					+= '<span class="RTH-a">style=</span>';
			var style = '', stylelist = [];
			for (var l = 0; l < el.style.length; l++) {
				style 				+= el.style[l]+': '+el.style[el.style[l]]+';';
			}
			content					+= this.genSpan('RTH-at', '"'+style+'"');//<span class="RTH-at">'+'"'+style+'"'+'</span>';
		}
		return content;
	},

	rep: function(string, n){
		if(n >= 0){
			var content = '';for (var i = 0; i < n; i++) { content += string; };
			return content;
		}
	},

	gtabs: function(times){
		//console.log(times);
		var content = '';
		for (var i = 0; i < times; i++) {
			content += s.tab;
		};
		return content;
	},

	inar: function(ned, ar){
		return (ar.indexOf(ned) > -1);
	},

	genSpan: function(cn, txt){
		return '<span class="'+cn+'">'+txt+'</span>';
	}
}
RTHighlight.init({
	//name: 100,
	item: 'hoi'
});