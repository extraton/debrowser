#!/bin/bash
set -e

DEBOT_NAME=demoBot
function compile {
    tondev sol compile $1.sol
}
function get_address {
echo $(cat log.log | grep "Raw address:" | cut -d ' ' -f 3)
}
function genaddr {
tonos-cli genaddr $1.tvc $1.abi.json --genkey $1.keys.json > log.log
}

NETWORK=https://net.ton.dev

echo COMPILE
compile $DEBOT_NAME

echo GENADDR DEBOT
genaddr $DEBOT_NAME
DEBOT_ADDRESS=$(get_address)
echo $DEBOT_ADDRESS

read -p "...Send coins and press enter to continue..."

DEBOT_ABI=$(cat $DEBOT_NAME.abi.json | xxd -ps -c 20000)
ICON=$(cat demo.png | xxd -ps -c 20000)

echo DEPLOY DEBOT
tonos-cli --url $NETWORK deploy $DEBOT_NAME.tvc "{}" --sign $DEBOT_NAME.keys.json --abi $DEBOT_NAME.abi.json
tonos-cli --url $NETWORK call $DEBOT_ADDRESS setABI "{\"dabi\":\"$DEBOT_ABI\"}" --sign $DEBOT_NAME.keys.json --abi $DEBOT_NAME.abi.json
tonos-cli --url $NETWORK call $DEBOT_ADDRESS setIcon "{\"icon\":\"$ICON\"}" --sign $DEBOT_NAME.keys.json --abi $DEBOT_NAME.abi.json

echo DONE
echo $DEBOT_ADDRESS > address.log
echo debot $NETWORK/$DEBOT_ADDRESS
