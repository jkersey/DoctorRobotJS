#!/bin/sh
mkdir export
mkdir export/js
mkdir export/images
mkdir export/maps

cp *.html export/
cp -r images/* export/images/
cp -r maps/* export/maps/
cp js/html5.js export/js/
cp js/game_lib.js export/js/
cp js/factories.js export/js/

#~/bin/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js js/html5.js > export/js/html5_min.js
#~/bin/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js js/editor.js > export/js/editor_min.js

#scp -r export/* root@scoab.com:/var/www/html/play/doctor-robot/
cp -r export/* /Library/WebServer/Documents/play/doctor-robot/
