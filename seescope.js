//
// seescope.js
//

function make(type, par, id) {
	var foo = document.createElement(type);
	if (id) { foo.id = id }
	par.appendChild(foo);
	return document.getElementById(id);
}

// FIXME
function find_text(elm) {
	var ret = [];

	for (var k in elm.childNodes) {
		if (elm.childNodes[k].nodeName === '#text') {
			ret.push(elm.childNodes[k].data);
		} else {
			ret = ret.concat(find_text(elm.childNodes[k]));
		}
	}

	return ret;
}

if (typeof see_scope === 'undefined') {
	// first click, only runs once
	see_scope = {};

	// get the text to display
	text = find_text(document.body);
	texti = 0;
	textj = 0;

	// construct the html tags
	see_scope.topd = make('div', document.body, 'see-scope-top');
	var modal      = make('div', see_scope.topd, 'see-scope-modal');
	var content    = make('div', modal, 'see-scope-content');
	var left  = make('span', content);
	var mid   = make('span', content);
	var right = make('span', content);

	console.log(text);

	// set event listeners
	see_scope.topd.onclick = function() {
		see_scope.topd.style.display = 'none';
	};

	modal.onclick = function (e) {
		e.stopPropagation();
	};
} else {
	// every click after first
	see_scope.topd.style.display = 'block';
}

