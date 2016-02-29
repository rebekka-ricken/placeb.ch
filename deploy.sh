#!/bin/sh
rsync -crvz --delete-after --delete-excluded _site/ static_placeb@placeb.ch:~/public_html

