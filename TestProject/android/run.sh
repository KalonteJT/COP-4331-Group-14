#!/bin/bash

./gradlew ${1:-installDevDebug} --stacktrace && adb shell am start -n com.Group14.QUp/host.exp.exponent.MainActivity
