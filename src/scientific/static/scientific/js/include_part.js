document.querySelectorAll('.part').forEach(function(element) {
	
	part_id = element.getAttribute('data-part')

    fetch('/scientific/get_part/' + part_id, {
        method: 'GET'
    })
    .then(r => r.json())
    .then(data => {
        element.innerHTML = data['content']
    });
});


function include_part(element, id) {
    fetch('/scientific/get_part/' + id, {
        method: 'GET'
    })
    .then(r => r.json())
    .then(data => {
        element.innerHTML = data['content']
    }); 
}


function include_all_parts(parent, selector) {
    parent.querySelectorAll('.part').forEach(function(element) {
    console.log(element)
    
    part_id = element.getAttribute('data-part')
    console.log(part_id)

    fetch('/scientific/get_part/' + part_id, {
        method: 'GET'
    })
    .then(r => r.json())
    .then(data => {
        element.innerHTML = data['content']
    });
});
 
}