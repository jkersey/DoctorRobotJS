#!/bin/sh
#mkdir export
#mkdir export/js
#mkdir export/images
#mkdir export/maps
#mkdir export/sounds

cp *.html export/
cp icon.png export/
#cp -r images/* export/images/
#cp -r maps/* export/maps/
cp -r sounds/* export/sounds/
cp js/html5.js export/js/
cp js/game_lib.js export/js/
cp js/factories.js export/js/

closure-compiler --compilation_level ADVANCED_OPTIMIZATIONS --js js/html5.js js/game_lib.js js/factories.js > export/js/html5_min.js
# closure-compiler --compilation_level ADVANCED_OPTIMIZATIONS --js js/editor.js > export/js/editor_min.js

#scp -r export/* root@scoab.com:/var/www/html/play/doctor-robot/
cp -r export/* /var/www/html/doctor_robot/
