.\env.sh

docker run -it --rm -p 3000:3000 --volume=%cd%\gitignore\docker-npm-cache:/app/node_modules "%PP_IMAGE_NAME%"
pause
