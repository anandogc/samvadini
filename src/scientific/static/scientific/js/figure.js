var figure_config = {}

function show_figure(data) {
      main = document.querySelector("main")
      main.innerHTML = '';

      cells = document.querySelector('.cells')
      console.log(cells)
      include_part(cells, 7)

      figure_config = data['content'];
}