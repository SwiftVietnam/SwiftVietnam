#!/bin/sh

## Add custom domain CNAME
echo "swiftvietnam.dev" > Output/CNAME

## Add files to git
git add .
git commit -m "Update production"
git push origin master

## Deploy to gh-pages
echo "--> Deploy to live server -->"
#git subtree push --prefix Output origin gh-pages
git push origin `git subtree split --prefix Output master`:gh-pages --force
