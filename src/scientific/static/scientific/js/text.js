//https://codepen.io/umairrazzaq/pen/wmKVRK

var currentEditor; // selected / focused editor
var currentFormats; // save the current formattings

createEditor("#editor1");
createEditor("#editor2");
createEditor("#editor3");
createEditor("#editor4");

function createEditor(selector, ...args) {
	
	var quill = new Quill(selector, {
		modules: {
			toolbar: '#toolbar'
		},
		theme: 'snow',
	});

	quill.on("editor-change", () => {		
		currentEditor = quill;
		
		updateButtons();
	});
}

// get current formattings to style the toolbar buttons
function updateButtons() {
	if (currentEditor.getSelection()) {
		currentFormats = currentEditor.getFormat();
		
		//currentEditor.classList.add("active");

		/*
		if (currentFormats.bold) {
			bold.classList.add("active");
		} else {
			bold.classList.remove("active");
		}
		if (currentFormats.italic) {
			italic.classList.add("active");
		} else {
			italic.classList.remove("active");
		}
		if (currentFormats.underline) {
			underline.classList.add("active");
		} else {
			underline.classList.remove("active");
		}
		
		if (currentFormats.align) {
			align_left.classList.add("active");
		} else {
			align_left.classList.remove("active");
		}
		if (currentFormats.align == 'right') {
			align_right.classList.add("active");
		} else {
			align_right.classList.remove("active");
		}
		*/
	}
}

function onBoldClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	alert(1);

	if (currentFormats.bold) {
		currentEditor.format("bold", false);
	} else {
		currentEditor.format("bold", true);
	}
}
function onItalicClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.italic) {
		currentEditor.format("italic", false);
	} else {
		currentEditor.format("italic", true);
	}
}
function onUnderlineClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.underline) {
		currentEditor.format("underline", false);
	} else {
		currentEditor.format("underline", true);
	}
}
function onStrikeClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.strike) {
		currentEditor.format("strike", false);
	} else {
		currentEditor.format("strike", true);
	}
}

function onAlignLeftClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (!currentFormats.align) {
		currentEditor.format('align', true);
	} else {
		currentEditor.format('align', false);
	}
}
function onAlignRightClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.align == 'right') {
		currentEditor.format('align', 'right', true);
	} else {
		currentEditor.format('align', 'right', false);
	}
}
function onAlignCenterClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.align == 'center') {
		currentEditor.format('align', 'center', true);
	} else {
		currentEditor.format('align', 'center', false);
	}
}
function onAlignJustifyClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.align == 'justify') {
		currentEditor.format('align', 'justify', true);
	} else {
		currentEditor.format('align', 'justify', false);
	}
}

function onListULClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.list == 'bullet') {
		currentEditor.format('list', 'bullet', true);
	} else {
		currentEditor.format('list', 'bullet', false);
	}
}
function onListOLClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.list == 'ordered') {
		currentEditor.format('list', 'ordered', true);
	} else {
		currentEditor.format('list', 'ordered', false);
	}
}

function onBlockquoteClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.blockquote) {
		currentEditor.format("blockquote", false);
	} else {
		currentEditor.format("blockquote", true);
	}
}