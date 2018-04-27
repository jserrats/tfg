#!/bin/bash

if [ $# -le 0 ]; then
  echo Missing dir param...
  exit
fi

echo Cropping $1...
pdfcrop $1 $1
echo Done!
 
