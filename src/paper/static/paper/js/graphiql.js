configuration = {}

function projects() {
  fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: "\{\
          projectsSearch(category: 0) {\
              id\
              title\
          }\
        }"})
  })
  .then(r => r.json())
  .then(data => {
    nav = document.querySelector(".projects")
    projects = data["data"]["projectsSearch"]
    for (i in projects) {
      anchor = document.createElement("a")

      anchor.classList.add("project", "pointer", "f5", "fw3", "pa2", "db", "black", "link", "hover-light-purple")

      anchor.setAttribute('data-value', projects[i]["id"])
      anchor.setAttribute('onclick', "load_text(this);")

      anchor.innerHTML = projects[i]["title"]

      nav.appendChild(anchor)
    }
  });
}

function load_text(self) {
  id = self.getAttribute('data-value')
  project_id = parseInt(id)
  fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: `{\
          projectSearch(id: ${id}) {\
              text
              configuration
          }}`})
  })
  .then(r => r.json())
  .then(data => {

    try {
      text = JSON.parse(data["data"]["projectSearch"]["text"])
      quill.setContents(text)
      $("#editor").show();

      buttons = document.querySelector("#properties .buttons")
      buttons.innerHTML = ''

      cancel = document.createElement('button')
      cancel.innerHTML = "Cancel"
      cancel.classList.add('pa2', 'b--near-white', 'mr1', 'mt2')
      cancel.onclick = cancel_configuration

      save = document.createElement('button')
      save.innerHTML = "Save"
      save.classList.add('pa2', 'b--near-white', 'mr1', 'mt2')
      save.onclick = save_configuration

      buttons.appendChild(cancel)
      buttons.appendChild(save)


      configuration = JSON.parse(data["data"]["projectSearch"]["configuration"])

      ui = configuration["project"]["ui"]
      values = configuration["project"]["values"]
      console.log(configuration)

      project_config_div = document.querySelector(".project.configuration")

      project_config_div.innerHTML = ''

      for (key in ui) {
        c = ui[key]
        if (c['cell'] == "dropdown") {

          label = document.createElement("span")
          label.innerHTML = c['label']
          label.classList.add('mt2', 'pt1')

          select = document.createElement("select")
          for (j in c['options']) {
            option = document.createElement("option")
            option.innerHTML = c['options'][j]
            option.setAttribute("value", c['options'][j])

            if (values[c['label']] == c['options'][j]) {
              option.setAttribute('selected', 'true')
            }

            select.appendChild(option)
          }
          select.classList.add('mt2')

          project_config_div.appendChild(label)
          project_config_div.appendChild(select)
        }

        else if (c['cell'] == "text") {

          label = document.createElement("span")
          label.innerHTML = c['label']
          label.classList.add('mt2', 'pt1')

          input = document.createElement("input")
          input.classList.add('mt2')
          input.value = values[c['label']]
          console.log(values[c['label']])

          project_config_div.appendChild(label)
          project_config_div.appendChild(input)
        }

        else if (c['cell'] == "textarea") {

          label = document.createElement("span")
          label.innerHTML = c['label']
          label.classList.add('mt2', 'pt1')

          textarea = document.createElement("textarea")
          textarea.value = values[c['label']].join('\n')
          textarea.classList.add('mt2')


          project_config_div.appendChild(label)
          project_config_div.appendChild(textarea)
        }
      }
    }
    catch {
      quill.setContents('')
    }

  });
}


function save_configuration(){
  childrens = document.querySelector('.project.configuration').children

  project_config = {}

  for (var i=0; i<childrens.length; i+=2) {
    label = childrens[i].innerText
    value = null

    if (childrens[i+1].nodeName == "INPUT") {
      value = childrens[i+1].value
    }

    else if (childrens[i+1].nodeName == "TEXTAREA") {
      value = childrens[i+1].value.split("\n")
    }

    else if (childrens[i+1].nodeName == "SELECT") {
      value = childrens[i+1].options[childrens[i+1].selectedIndex].innerHTML
    }
    

    project_config[label] = value
  }

  configuration["project"]["values"] = project_config

  const csrf = document.getElementsByName('csrfmiddlewaretoken')

  const fd = new FormData()
  fd.append('csrfmiddlewaretoken', csrf[0].value)
  fd.append('id', project_id)
  fd.append('content', JSON.stringify(configuration, null, 4))

  $.ajax({
      type:'POST',
      url: "/scientific/save_config",
      enctype: 'text/plain',
      data: fd,
      success: function(response){
          $("#properties").hide();
          $("#editor").show();
      },
      error: function(error){
          console.log(error)
      },
      cache: false,
      contentType: false,
      processData: false,
  })

}

function cancel_configuration(){
  $("#properties").hide()
  $("#editor").show()
}

projects()
