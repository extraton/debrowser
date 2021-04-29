set -e

rm -rf build
mkdir build
cd ./build
git clone https://github.com/extraton/debrowser.git .
git checkout "${1}"
yarn install
yarn run build
docker build -f ../deploy/Dockerfile -t extraton-debrowser:"${1}" .
cd ../
rm -rf build
