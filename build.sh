#!/bin/sh

docker run \
    --rm \
    --volume "$(pwd)/:/src" \
    --workdir "/src/" \
    swift-lambda-builder \
    package.sh SwiftLED