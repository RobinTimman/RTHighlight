/*!
 * RTHighlight JS
 * Copyright 2014 Robin Timman.
 *
 */
var allTags = $('#codeprev').find("*");
console.log(allTags);
for (var i = 0, len = allTags.length; i < len; i++) {
	console.log(allTags[i]);
	
	if(allTags[i].id) id = ' id="'+allTags[i].id+'"';
	if(allTags[i].className) classes = ' class="'+allTags[i].className+'"';
	if(allTags[i].dataset) console.log('dataset is not empty'); console.log(allTags[i].dataset);
	
	var nice	= '<'+allTags[i].localName+classes+id+'>'+allTags[i].innerText+'</'+allTags[i].localName+'>';
	console.log(nice)
}