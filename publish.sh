#!/bin/sh
mkdir export
mkdir export/js
#cp *.html export/
#cp *.php export/
java -jar ~/bin/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js js/html5.js > export/js/html5_min.js
java -jar ~/bin/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js js/editor.js > export/js/editor_min.js
scp -r export/* serveradmin@scoab.com@scoab.com:~/domains/badbattery.com/html/play/doctor-robot/
