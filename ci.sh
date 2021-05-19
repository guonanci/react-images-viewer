#!/bin/bash -e
# daily push, but add all unStaged changes.
commit_msg="$1"
git add .
git commit -m "$commit_msg"
git pull
git push
