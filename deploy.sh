FUNCTION_NAME=$1
PATH_NAME=$2
ZIP_PARAMS=$3

if [ -n "$PATH_NAME" ]; then cd $PATH_NAME; fi

npm install && serverless deploy

exit 0