#!/bin/sh

## Rebuild build_production
swift build

## Add custom domain CNAME
echo "swiftvietnam.com" > Output/CNAME

## Add files to git
git add .
git commit -m "Update production"
git push origin master

## Deploy to gh-pages
echo "--> Deploy to live server -->"
git subtree push --prefix Output origin gh-pages

