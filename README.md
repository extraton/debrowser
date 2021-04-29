# ExtraTON.deBrowser
The DeBot browser for Free TON network.

## Demo
[debrowser.extraton.io](https://debrowser.extraton.io)

## Installation
### Docker from prepared image
```
docker run -d -p=8087:80 extraton/debrowser
```
Go to http://localhost:8087/
### Manual docker
```
git clone https://github.com/extraton/debrowser.git
cd debrowser
bash ./deploy/build.sh {tag}
docker run -d -p=8087:80 extraton-debrowser:{tag}
```
Go to http://localhost:8087/
