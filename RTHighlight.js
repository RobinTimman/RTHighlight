/*
 *	RTHighlight (JS)
 *	v0.0.1
 *	syntax hightligher (simplified)
 *	© 2014, Robin Timman
 */
function RTHighlight(options){
	var host			= options.element						|| 'RTCode';

	//var allTags = $('#codeprev').find("*");
	//var allTags = document.getElementsByClassName('RTCode').getElementsByTagName('*');
	var allTags = document.querySelectorAll('*.RTCode');
	console.log(allTags);
	for (var i = 0, len = allTags.length; i < len; i++) {
		console.log(allTags[i]);
		
		if(allTags[i].id) id = ' id="'+allTags[i].id+'"';
		if(allTags[i].className) classes = ' class="'+allTags[i].className+'"';
		if(allTags[i].dataset) console.log('dataset is not empty'); console.log(allTags[i].dataset);
		
		var nice	= '<span class="RTH-a-el">&lt;'+allTags[i].localName+classes+id+'&rt;'+allTags[i].innerText+'&lt;/'+allTags[i].localName+'&rt;</span>';
		console.log(nice)
	}
}
window.RTH = new RTHighlight({
	element: 'RTCode'
});
