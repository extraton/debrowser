set -e

rm -rf build
mkdir build
cd ./build
git clone https://github.com/extraton/debrowser.git .
git checkout "${1}"
yarn install
yarn run build
docker build -f ../deploy/Dockerfile -t docker.pkg.github.com/extraton/debrowser/debrowser-nginx:${1}  .
docker push docker.pkg.github.com/extraton/debrowser/debrowser-nginx:${1}
cd ../
rm -rf build
