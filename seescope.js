//
// seescope.js
//

// creates a DOM element
function make(type, par, id) {
	var foo = document.createElement(type);
	if (id) { foo.id = id }
	par.appendChild(foo);
	return document.getElementById(id);
}

// find the worth-while text in the document
function find_text(elm) {
	var ret = [];

	var significant = elm.nodeName === 'P';

	for (var k in elm.childNodes) {
		if (elm.childNodes[k].nodeName === '#text') {
			if (significant) {
				ret.push(elm.childNodes[k].data.trim().match(/[a-z]+|[^a-z]+/gi));
			}
		} else {
			ret = ret.concat(find_text(elm.childNodes[k]));
		}
	}

	return ret;
}

function next_word(l, m, r) {
	good = !!text[texti][textj].match(/[a-z]/);

	if (good) {
		l.innerHTML = text[texti].slice(0, textj).join('');
		m.innerHTML = text[texti][textj];
		r.innerHTML = text[texti].slice(textj + 1).join('');
	}

	textj++;
	if (textj >= text[texti].length) {
		texti++;
		textj = 0;

		if (texti >= text.length) {
			//TODO
		}
	}

	if (!good) {
		next_word();
	}
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
	var bound      = make('div', modal, 'see-scope-bound');
	var content    = make('div', bound, 'see-scope-content');
	var left  = make('span', content, 'see-scope-left');
	var mid   = make('span', content, 'see-scope-focus');
	var right = make('span', content, 'see-scope-right');

	// set event listeners
	see_scope.topd.onclick = function() {
		see_scope.topd.style.display = 'none';
	};

	modal.onclick = function (e) {
		e.stopPropagation();
	};

	// handle moving the word focus
	var wpm = 350;
	next_word(left, mid, right);
	setInterval(function() {
		next_word(left, mid, right);
	}, 60000/wpm);
} else {
	// every click after first
	see_scope.topd.style.display = 'block';
}

