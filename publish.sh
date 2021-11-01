#!/usr/bin/env bash

set -ex
cd $(dirname $0)
approot=$(pwd)
packages=$(cd "${approot}/packages"; ls);

for package in $packages; do

  # Run tests
  (
    cd "${approot}/packages/${package}" ;
    npm test ;
  )

  # Publish
  (
    cd "${approot}/packages/${package}" ;
    npm publish --access public || echo "Not published"
  )

done
