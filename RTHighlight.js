var s, RTHighlight = {
	
	settings: {
		tab: '<tb></tb>',/*'&nbsp;&nbsp;',*/
		nl: ["input", "br", "h1"],	// ends on the same line
		endNodes: ["input", "br"],	// ends with / in same line
	},
	content: '',
	
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
			this.linesLoop(el[a], a);
			//$(el).after( '<div class="btn-toolbar"><h4>Voorbeeld:</h4><div class="btn-group">'+$(el).html()+'</div></div>' );
			$(el[a]).html( this.content );
		}
	},
	linesLoop: function(el, index){
		ln 		= el.localName;
		
		if(el.children.length > 0){
			// has child(s)
			for (var i = 0; i < el.children.length; i++) {
				els 		= el.children[i];
				ln 			= el.children[i].localName;
				adds		= '';
				newLines	= '';
				var tabs = '', text ='';

				if(!this.inar(ln, s.nl)){
					newLines = '<br>';
				}
				//adds	+= this.getAttr(el.children[i].style);

				// attributes
				// for each ids
				adds	+= this.getAttributes(els);
				// tabs before element
				if(els.attributes.rthtext)								text			= els.getAttribute('rthtext', 2);
				// tabs before element
				if(els.attributes.rthtabs)								tabs			= this.rep(s.tab, els.getAttribute('rthtabs', 2));
				// if element should be in 1 line and ends there
				if(this.inar(ln, s.endNodes))							adds			+= '/';
				
				// open de tag
				this.content		+= tabs+'<span class="RTH-el">&lt;'+el.children[i].localName+adds+'&gt;</span>'+newLines;
				
				if(!this.inar(el.children[i].localName, s.nl))			this.content	+= tabs+s.tab+text+'<br>';
				if(this.inar(el.children[i].localName, s.nl))			this.content	+= text;
				// loops for inner elements
				this.linesLoop(el.children[i], i);

				if(this.inar(el.children[i].localName, s.endNodes))		this.content 	+= '<br>';
				if(!this.inar(el.children[i].localName, s.nl))			this.content 	+= tabs;
				if(!this.inar(el.children[i].localName, s.endNodes))	this.content 	+= '<span class="RTH-el">&lt;/'+el.children[i].localName+'&gt;</span><br>';
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
		var content = '';for (var i = 0; i < n; i++) { content += string; };
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