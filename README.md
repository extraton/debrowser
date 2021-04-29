# ExtraTON.deBrowser
The DeBot browser for Free TON network.

## Demo
[debrowser.extraton.io](https://debrowser.extraton.io)

## Installation
### Docker from prepared image
```
docker run -d --name debrowser-extraton -p=8087:80 docker.pkg.github.com/extraton/debrowser/debrowser-nginx
```
Go to http://localhost:8087/
### Manual docker
```
git clone https://github.com/extraton/debrowser.git
cd debrowser
bash ./deploy/build.sh {tag}
docker run -d --name extraton-debrowser -p=8087:80 extraton-debrowser:{tag}
```
Go to http://localhost:8087/
