#!/bin/bash
CALL .\env.bat

CALL docker build --no-cache -t "%PP_IMAGE_NAME%" .
.\run.bat

pause
