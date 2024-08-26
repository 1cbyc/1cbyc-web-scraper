#!/bin/bash

# will check if 'data' directory exists, if not, create it
if [ ! -d "data" ]; then
    mkdir data
    echo "Created 'data' directory."
else
    echo "'data' directory already exists."
fi

# will set the necessary permissions for the folder
chmod 755 data
