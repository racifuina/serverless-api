#!/usr/bin/env bash

set -e

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

echo "Setting up your environment..."

if [ "$(uname)" == "Darwin" ]; then
    echo "detected macOS, continuing..."
else
    echo "unsupported operating system $(uname), you're on your own..."
    exit 1
fi

if ! command -v brew >/dev/null 2>&1; then
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "✅ brew exists, continuing..."
fi

if [[ $(uname -m) == 'arm64' ]];
then
    if [[ "`pkgutil --files com.apple.pkg.RosettaUpdateAuto`" == "" ]]
    then
        echo "rosetta not installed, installing ..."
        /usr/sbin/softwareupdate --install-rosetta --agree-to-license
    else
        echo "✅ rosetta installed, continuing..."
    fi
else
    echo "this is not an apple silicon mac, continuing..."
fi

if ! command -v nvm >/dev/null 2>&1; then
    echo "✅ nvm exists, continuing..."
else
    echo "nvm not installed, installing ..."
    /bin/bash -c "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash"
fi

# Install Node.js
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm install v18.16
nvm use v18.16
nvm alias default v18.16

# Check if Serverless Framework is installed
if ! command -v serverless &> /dev/null; then
    echo "Serverless Framework not found, installing..."
    npm install -g serverless
else
    echo "Serverless Framework already installed, skipping..."
fi

echo "All done! 🚀"
