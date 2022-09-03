var quill = null;

function show_properties(data) {
      console.log(data)
      main = document.querySelector("main")
      main.innerHTML = '';

      properties = document.createElement('pre')
      properties.classList.add('part')
      properties.setAttribute('id', data['label'])
      properties.setAttribute('data-id', data['id'])
      properties.setAttribute('data-category', data['category'])
      properties.setAttribute('contenteditable', true)

      main.appendChild(properties)

      // cells = document.querySelector('.cells')
      // include_part(cells, 8)

      properties.innerHTML = JSON.stringify(JSON.parse(data['content']), null, 4)
}