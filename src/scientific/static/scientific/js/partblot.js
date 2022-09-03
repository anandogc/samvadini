const PartBlockEmbed = Quill.import('blots/block/embed');

class PartBlot extends PartBlockEmbed {
  static blotName = 'part';
  static tagName = 'div';

  static create(id) {
    let node = super.create();

    fetch('/scientific/get_part/' + id, {
        method: 'GET'
    })
    .then(r => r.json())
    .then(data => {
        if (data['category'] == 'text') {
          output.innerHTML = data['content']
        }
        else if (data['category'] == 'figure') {
          let figure = document.createElement('figure')
          var content = JSON.parse(data['content'])
          for (let r in content['rows']) {
            let row = document.createElement('div')
              for (let c in r) {
                let col = document.createElement('div')
                col.classList.add('part')
                col.setAttribute('data-part', content['rows'][r][c])
                row.appendChild(col)
            }
            figure.appendChild(row)
          }

          let figcaption = document.createElement('figcaption')
          figcaption.innerHTML = content['caption']
          figure.appendChild(figcaption)
          figure.classList.add('tc')
          node.appendChild(figure)
        }

        include_all_parts(node, '.part');
    });

    node.setAttribute('data-id', id);
    return node;
  }

   /**
   * Redefine the `update` method to handle the `childList` case.
   * This is necessary to correctly handle "backspace" on Android using Gboard.
   * It behaves differently than other cases and we need to handle the node
   * removal instead of the `characterData`.
   */
  update(mutations, context) {
    // `childList` mutations are not handled on Quill
    // see `update` implementation on:
    // https://github.com/quilljs/quill/blob/master/blots/embed.js

    mutations.forEach(mutation => {
      if (mutation.type != 'childList') return;
      if (mutation.removedNodes.length == 0) return;

      setTimeout(() => this._remove(), 0);
    });

    const unhandledMutations = mutations.filter(m => m.type != 'childList')
    super.update(unhandledMutations, context);
  }

  static value(node) {
    return node.getAttribute('data-id');
  }
}

Quill.register({
    'formats/part': PartBlot,
}, true);