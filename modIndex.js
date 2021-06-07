const parser = require('node-html-parser');
const fs = require('fs')

const HTML_PATH = "./dist/index.html"
const root = parser.parse( fs.readFileSync (HTML_PATH));
const script = parser.parse (`
<script>
    (function () {
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect != location.href) {
        history.replaceState(null, null, redirect);
    }
    })();
</script>
`)
root.querySelector('head').appendChild(script);


fs.writeFileSync(HTML_PATH, root.toString())