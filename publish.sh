#!/bin/sh
mkdir export
mkdir export/js
mkdir export/images
mkdir export/maps

cp *.html export/
cp *.php export/
cp -r images/* export/images/
cp -r maps/* export/maps/
cp -r js/html5.js export/js/
cp -r js/game_lib.js export/js/

#java -jar ~/bin/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js js/html5.js > export/js/html5_min.js
#java -jar ~/bin/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js js/editor.js > export/js/editor_min.js

#scp -r export/* serveradmin@scoab.com@scoab.com:~/domains/badbattery.com/html/play/doctor-robot/
cp -r export/* /var/www/badbattery/html/play/doctor-robot/
