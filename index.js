var browserify = require('browserify');
var b = browserify();
var jsfiles = [
]

b.add(jsfiles);
b.bundle().pipe(process.stdout);
