function load_projects() {
  fetch('/scientific/get_projects/paper', {
    method: 'GET'
  })
  .then(r => r.json())
  .then(data => {
    nav = document.querySelector(".projects")
    projects = data
    for (i in projects) {
      anchor = document.createElement("a")

      anchor.classList.add("project", "pointer", "f5", "fw3", "pl2", "pt2", "db", "black", "link", "hover-light-purple")

      anchor.setAttribute('data-value', projects[i]["id"])
      anchor.setAttribute('onclick', `load_project(this, ${projects[i]["id"]});`)

      anchor.innerHTML = projects[i]["title"]

      nav.appendChild(anchor)
    }
  });
}

load_projects();

function load_project(self, id) {
	if (!self.getAttribute('data-loaded') == true) {
		fetch('/scientific/get_project/' + id, {
			method: 'GET'
		})
		.then(r => r.json())
		.then(data => {
		parts = data['parts']
		for (i in parts) {
		  	anchor = document.createElement("a")

		  	anchor.classList.add("pl3", "pointer", "f6", "fw3", "db", "mid-gray", "link", "hover-light-purple")

		  	anchor.setAttribute('data-value', parts[i]["id"])
		  	anchor.setAttribute('onclick', `load_part(this, ${parts[i]['id']});`)

		  	anchor.innerHTML = parts[i]["label"]

		  	nav.appendChild(anchor)
		}
		self.setAttribute('data-loaded', true)
		});
	}
}

function load_part(self, id) {
  fetch('/scientific/get_part/' + id, {
    method: 'GET'
  })
  .then(r => r.json())
  .then(data => {
  	if (data['category'] == 'text') {
	  	show_text(data)
  	}
	  else if (data['category'] == 'properties') {
	  	show_properties(data) 
	  }
	  else if (data['category'] == 'figure') {
	  	show_figure(data) 
	  }
  });
}