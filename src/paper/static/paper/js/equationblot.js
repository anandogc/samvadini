// https://gist.github.com/tranduongms1/584d43ec7d8ddeab458f087adbeef950

const EquationBlockEmbed = Quill.import('blots/block/embed');

class EquationBlot extends EquationBlockEmbed {
  static blotName = 'equation';
  static tagName = 'math';

  static create(value) {
    let node = super.create();
    let output = window.document.createElement('div');

    let latex = value;

    if (value === '-') {
        latex = 'Click\\ to\\ insert';
    }

    try {
        var html = katex.render(latex, output, {
            throwOnError: true,
            displayMode: true
        });
        output.classList.remove('red')
    } catch (e) {
        if (e instanceof katex.ParseError) {
            // KaTeX can't parse the expression
            html = ("Error in LaTeX '" + e.message)
                .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            output.classList.add('red')
        } else {
            throw e;  // other error
        }
        output.innerHTML = html;
    }
    output.classList.add('output');
    output.classList.add('bl', 'bw2', 'b--gray');

    let input = window.document.createElement('textarea')
    if (value === '-') {
        latex = '\\begin{align}\n\\end{align}';
    }
    input.innerHTML =latex;
    input.classList.add('input', 'dn');
    input.classList.add('w-100', 'h4');

    node.appendChild(input);
    node.appendChild(output);

    node.setAttribute('contenteditable', 'false');
    node.setAttribute('tabindex','0');
    node.classList.add('ql-equation', 'pointer');
    return node;
  }

  constructor(node) {
    super(node);
    $(node).focus(function() {
        $(node).find('.output').hide();
        $(node).find('.input').show().focus();
    });
    $($(node).find('.input')).blur(function() {
        $(node).find('.input').hide();
        $(node).find('.output').show();

        try {
            var html = katex.render($(node).find('.input')[0].value, $(node).find('.output')[0], {
                throwOnError: true,
                displayMode: true
            });
            $(node).find('.output').removeClass('red')

        } catch (e) {
            if (e instanceof katex.ParseError) {
                // KaTeX can't parse the expression
                html = ("Error in LaTeX '" + e.message)
                    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                $(node).find('.output').addClass('red')
            } else {
                throw e;  // other error
            }
            $(node).find('.output').html(html);
        }
    })
  }

  static value(node) {
    let input = node.querySelector('.input');
    return input.value || null;
  }
}

Quill.register({
    'formats/equation': EquationBlot,
}, true);