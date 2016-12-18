from collections import defaultdict
import web
from jinja2 import Environment
from jinja2.loaders import DictLoader
env = Environment(loader=DictLoader({
'child.html': open("child.html").read(),
'align.js' : open("align.js").read(),
'jquery.js' : open("jquery.js").read(),
'bootstrap.js': open("bootstrap.min.js").read(),
'bootstrap.css' : open("bootstrap.min.css").read()

}))

#hello
tmpl = env.get_template("child.html")
jsscript = env.get_template("align.js")
jquery = env.get_template("jquery.js")

VERSION = "0.0.1"

urls = (
    r'/', 'Index',
    r'/align.js', 'AlignJS',
    r'/jquery.js','JqueryJS',
    r'/bootstrap','Bootstrap'
    )

data = open("alignment.aln").readlines()
current_line = 0

app = web.application(urls, globals())

class Index:
    #http://localhost:8080/?id=John
    def GET(self):
        user_data = web.input(line=0)
        lineno = int(user_data.line)
        src,trg,aln = data[lineno].split("\t")
        return tmpl.render({"src" : src, "trg" : trg, "aln" : aln, "line" : lineno})

class AlignJS:
    def GET(self):
        return jsscript.render()

class JqueryJS:
    def GET(self):
        return jquery.render()

class Bootstrap:
    def GET(self):
        _get = web.input(path="")
        if _get.path == "css":
            return env.get_template("bootstrap.css").render()
        elif _get.path == "js":
            return env.get_template("bootstrap.js").render()

application = app.wsgifunc()
if __name__ == "__main__":
    app.run()
