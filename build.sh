#!/usr/bin/env bash

git config core.hooksPath .githooks
FIND=$(command -v gfind find | head -1)

set -ex
cd $(dirname $0)
approot=$(pwd)
templates=$(cd "${approot}/common"; ${FIND} -type f);
packages=$(cd "${approot}/packages"; ls);

for package in $packages; do

  # Render templates
  for template in $templates; do
    mkdir -p $(dirname "${approot}/packages/${package}/${template}")
    "${approot}/tool/template.sh" \
      --config "${approot}/packages/${package}/config.ini" \
      "${approot}/common/${template}" > \
      "${approot}/packages/${package}/${template}"
  done

  # Add dependencies
  "${approot}/tool/ini.sh" "${approot}/packages/${package}/config.ini" | egrep '^dependencies\.' | while read dependency; do
    dependency=${dependency#*.}
    name=${dependency%%=*}
    version=${dependency#*=}
    (
      cd "${approot}/packages/${package}" ;
      npm install --save "${name}@${version}" ;
    )
  done

  # Settle dependency tree
  (
    cd "${approot}/packages/${package}" ;
    npm install ;
  )


  # Run build script
  (
    cd "${approot}/packages/${package}" ;
    npm run build ;
  )

  # Run tests as well
  (
    cd "${approot}/packages/${package}" ;
    npm test ;
  )

done
