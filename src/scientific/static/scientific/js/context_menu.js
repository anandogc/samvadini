$(function() {
    $.contextMenu({
        selector: 'nav.projects .project', 
        callback: function(key, options) {
            console.log(key)
            if (key === 'figure') {
                const fd = new FormData()
                fd.append('label', 'Figure')
                fd.append('content', '')
                fd.append('category', 'figure')
                fd.append('of', '1')


                fetch('/scientific/put_part', {
                    method: 'POST',
                    body: fd
                })
                .then(r => r.json())
                .then(data => {
                    console.log(data)
                });
            }
        },
        items: {
            new: {
                name: "New", 
                items: {
                    section: {name: "Section"},
                    figure: {name: "Figure"},
                    equation: {name: "Equation"},
                    table: {name: "Table"},
                    algorithm: {name: "Algorithm"}
                }
            },
        },
            // "sep1": "---------",
            // "quit": {name: "Quit", icon: function(){
            //     return 'context-menu-icon context-menu-icon-quit';
            // }}
    });

    // $('.context-menu-one').on('click', function(e){
    //     console.log('clicked', this);
    // })    
});
