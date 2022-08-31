// https://gist.github.com/tranduongms1/584d43ec7d8ddeab458f087adbeef950

const SectionBlockEmbed = Quill.import('blots/block/embed');

class SectionBlot extends SectionBlockEmbed {
  static blotName = 'section';
  static tagName = 'section';

  static create(value) {
    console.log(value)
    let node = super.create();
    if (value.section == 1) {
        node.innerHTML = value.text || 'Section'
        node.classList.add('f1');
    }
    else if (value.section == 2) {
        node.innerHTML = value.text || 'Sub Section'
        node.classList.add('f2');
    }
    else if (value.section == 3) {
        node.innerHTML = value.text || 'Sub Sub Section'
        node.classList.add('f3');
    }
    else if (value.section == 4) {
        node.innerHTML = value.text || 'Sub Sub Section'
        node.classList.add('f4');
    }

    node.setAttribute('data-value', value.section)
    return node;
  }

  static value(node) {
    return {
        text: node.innerHTML,
        section: node.getAttribute('data-value')
    }
  }
}

Quill.register({
    'formats/section': SectionBlot,
}, true);