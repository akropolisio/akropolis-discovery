# Akropolis Pension Funds protocol

[![CircleCI](https://circleci.com/gh/akropolisio/akropolis-protocol.svg?style=shield&circle-token=b20b2236f7589a33e07666aa6d73e8467ba41741)](https://circleci.com/gh/akropolisio/akropolis-protocol)
[![Coverage Status](https://coveralls.io/repos/github/akropolisio/akropolis-protocol/badge.svg?t=h5qmcd)](https://coveralls.io/github/akropolisio/akropolis-protocol)

This project is a collection of smart contracts that implements business logic for running a pension fund on blockchain.

### Overview

The Akropolis project is building the largest alternative pensions infrastructure in the world.
We are creating decentralised pensions on the blockchain, built by and for the people, creating a safer financial future for humanity.

### Installation
This project requires [node-js](https://github.com/nodejs/node) runtime and uses [truffle](https://github.com/trufflesuite/truffle) as the Ethereum smart contract development framework.
You will need to have [node](https://github.com/nodejs/node) installed first, in order to use the node package manager (npm).
We also recommend installing [yarn](https://yarnpkg.com/en/docs/install) to effectively manage dependencies.

In order to run the project, install the truffle suite:

    npm install -g truffle

Then install all of the node-js dependencies from within the git directory.

    npm install

The connection to the blockchain node is defined in truffle.js, and as default is configured to be used locally:

    module.exports = {
        networks: {
            development: {
                host: 'localhost',
                port: 8545,
                network_id: '*' // Match any network id
            }
        }
    }

We recommend using popular Ethereum test client [Ganache](https://github.com/trufflesuite/ganache) as a default local testing node:

    npm install -g ganache-cli
    
Note: For Windows users, you may need to change the truffle.js filename in repository to truffle-config.js

### Running tests

To run all of the smart contract tests, execute the testing script:

    yarn test

Alternatively, you may also call the truffle command directly:

    truffle test
    
### Running service

This project uses gulp to serve files. Before calling gulp you can ensure truffle files are compiled if they haven't been already

    truffle compile

Install gulp via command

    sudo npm install --global gulp

Npm Modules of course are installed via

    npm install
    
You can run the service using 

    gulp serve

Note that the output will be by default on port :8080 and index.html page-> e.g. localhost:8080/index.html

You can use the following to inject a secret string in the URL so that it is distinct

    gulp serve:dist

## License

MIT License

Copyright (c) 2018 Akropolis Decentralised Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
