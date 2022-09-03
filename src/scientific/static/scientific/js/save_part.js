function save_part() {
	part = document.querySelector("main .part")

    const fd = new FormData()
    fd.append('id', part.getAttribute('data-id'))
    fd.append('content', JSON.stringify(quill.getContents()))
    // fd.append('_method', "PUT")


	fetch('/scientific/put_part', {
		method: 'POST',
	    body: fd
	})
	.then(r => r.json())
	.then(data => {
		console.log(data)
	});
}
