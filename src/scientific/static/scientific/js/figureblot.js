// https://gist.github.com/tranduongms1/584d43ec7d8ddeab458f087adbeef950

const FigureBlockEmbed = Quill.import('blots/block/embed');

class FigureBlot extends FigureBlockEmbed {
  static blotName = 'figure';
  static tagName = 'figure';

  static create(value) {
    let node = super.create();
    let img = window.document.createElement('img');
    if (value.alt || value.caption) {
      img.setAttribute('alt', value.alt || value.caption);
    }
    if (value.src || typeof value === 'string') {
      img.setAttribute('src', value.src || value);
    }
    img.style.width = value.width || 'auto';
    img.style.height = value.height || 'auto';
    node.appendChild(img);
    if (value.caption) {
      let caption = window.document.createElement('figcaption');
      caption.innerHTML = value.caption;
      node.appendChild(caption);
    }
    node.className = 'ql-card-editable ql-card-figure';
    $(node).data('width', value.width || 'auto');
    $(node).data('height', value.height);
    $(node).data('caption', value.caption);

    node.setAttribute('contenteditable', 'false');
    node.setAttribute('tabindex','0');
    node.classList.add('pointer');
    return node;
  }

  static value(node) {
    let img = node.querySelector('img');
    let width = $(node).data('width') || 'auto';
    let height = $(node).data('height') || 'auto';
    let figcaption = $(node).data('caption') || '';
    if (!img) return false;

    return {
        width: width,
        height: height,
        alt: img.getAttribute('alt'),
        src: img.getAttribute('src'),
        caption: figcaption ? figcaption : null
    };
  }
}

Quill.register({
    'formats/figure': FigureBlot,
}, true);