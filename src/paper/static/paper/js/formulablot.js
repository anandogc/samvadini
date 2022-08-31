const FormulaEmbed = Quill.import('blots/embed');

class FormulaBlot extends FormulaEmbed {
  static blotName = 'formula';
  static className = 'ql-formula';
  static tagName = 'SPAN';

  static create(value) {
    // @ts-expect-error
    if (window.katex == null) {
      throw new Error('Formula module requires KaTeX.');
    }
    let node = super.create();

    if (typeof value === 'string') {
      // @ts-expect-error
      window.katex.render(value, node, {
        throwOnError: false,
        errorColor: '#f00',
      });
      node.setAttribute('data-value', value);
    }
    node.classList.add('pointer');
    return node;
  }

  static value(domNode) {
    return domNode.getAttribute('data-value');
  }

  html() {
    const { formula } = this.value();
    return `<span>${formula}</span>`;
  }

  text() {
    return this.getAttribute('data-value');
  }

  constructor(node) {
    super(node);
    $(node).click(function() {
        var latex = prompt("Enter Formula:", node.getAttribute('data-value'));
        latex = latex || node.getAttribute('data-value');
        node.setAttribute('data-value', latex);
        window.katex.render(latex, node, {
          throwOnError: false,
          errorColor: '#f00',
        });
    });
  }
}

Quill.register({
    'formats/formula': FormulaBlot,
}, true);