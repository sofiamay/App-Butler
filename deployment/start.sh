#!/bin/sh
npm run build
sudo PORT=80 forever start /usr/local/projects/AppButler/server/build/server.js