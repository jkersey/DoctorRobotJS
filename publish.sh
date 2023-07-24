#!/bin/sh
#TODO Gulp or Makefile?

mkdir export
mkdir export/js
mkdir export/images
mkdir export/maps

cp *.html export/
cp -r images/* export/images/
cp -r maps/* export/maps/
# cp js/html5.js export/js/
# cp js/game_lib.js export/js/
# cp js/factories.js export/js/

# closure-compiler --compilation_level ADVANCED_OPTIMIZATIONS --js js/html5.js --js js/game_lib.js --js js/factories.js > export/js/html5_min.js

java -jar ~/Downloads/closure-compiler-v20230502.jar --compilation_level ADVANCED_OPTIMIZATIONS --js js/html5.js --js js/game_lib.js --js js/factories.js > export/js/html5_min.js

# cp -r export/* /var/www/html/doctor_robot/
