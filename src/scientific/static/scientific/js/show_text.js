var quill = null;

function show_text(data) {
      main = document.querySelector("main")
      main.innerHTML = '';

      text = document.createElement('div')
      text.classList.add('part')
      text.setAttribute('id', data['label'])
      text.setAttribute('data-id', data['id'])
      text.setAttribute('data-category', data['category'])

      main.appendChild(text)

      // cells = document.querySelector('.cells')
      // include_part(cells, 8)


      quill = new Quill(text, {
		modules: {
		    toolbar: "#text-toolbar"
		  },
		theme: 'snow'
		});

      quill.setContents(JSON.parse(data['content']));
}