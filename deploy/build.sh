set -e

rm -rf build
mkdir build
cd ./build
git clone https://github.com/extraton/debrowser.git .
git checkout "${1}"
yarn install
yarn run build
docker build -f ../deploy/Dockerfile -t extraton/extraton-debrowser:"${1}" -t docker.pkg.github.com/extraton/debrowser/debrowser-nginx:${1} .
cd ../
rm -rf build
docker push extraton/extraton-debrowser:1.4.0
docker push docker.pkg.github.com/extraton/debrowser/debrowser-nginx:1.4.0
