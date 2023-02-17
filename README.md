# Aztec SDK Reference script

## Introduction

Learn more about the SDK on the Aztec documentation site [here](https://docs.aztec.network/sdk/overview):
- https://docs.aztec.network/sdk/overview

SDK setup and examples are in `./src/index.ts`. 

These are configured to work with the Aztec network in two configurations:

- a Mainnet fork Testnet

or

- a [Local development Devnet](https://docs.aztec.network/developers/local-devnet)

Both these contexts are described in this document.

## Requirements

1. Node
2. Yarn
3. To acquire test mainnet fork ETH, use the faucet here: 
    - https://aztec-connect-testnet-faucet.aztec.network/

## Environment - using Testnet

The script can currently run on a version of Aztec connected to a mainnet fork testnet.

The rollup processor endpoint for the testnet is:

```
https://api.aztec.network/aztec-connect-testnet/falafel
```

and for Ethereum mainnet is:

```
https://api.aztec.network/aztec-connect-prod/falafel
```

The `.env.example_testnet` file contains these endpoints as well.

You can check the status of the Aztec rollup provider at this url: 
- https://api.aztec.network/aztec-connect-testnet/falafel/status

And check the testnet block explorer here: 
- https://aztec-connect-testnet-explorer.aztec.network/

It may also be helpful to cross reference data and transaction histories with the testnet version of zk.money: 
- https://aztec-connect-testnet.zk.money/

## Environment - using a local Devnet

It is also possible to set up a local Aztec developer network running with Docker/Docker Compose. 

Follow the documentation for setting up a local Aztec development network here:
- https://docs.aztec.network/developers/local-devnet

This repository has an example local developer environment file, `.env.example_devnet`.

For this SDK Starter, we will create a basic network with Docker:
- https://docs.aztec.network/developers/local-devnet#basic-network

This is a simple, fresh Ethereum network + Aztec sequencer without any bridge contracts. 

To do this run:

```shell=
$ curl -s https://raw.githubusercontent.com/AztecProtocol/dev-rel/main/docker-compose.dev.yml | docker compose -f - up --force-recreate --pull always
```
This should result in the network responding with a listening status similar to the following:

```shell=
. . .

falafel-1    | [2023-02-17T01:04:57.226Z] TxReceiver: Requesting verification keys from ProofGenerator...
falafel-1    | [2023-02-17T01:04:57.226Z] rollup_cli: Serving join split vk...
falafel-1    | [2023-02-17T01:04:57.233Z] rollup_cli: Serving account vk...
falafel-1    | [2023-02-17T01:04:57.235Z] Server: Ready to receive txs.

. . .
```

This is useful for testing basic functionality of the Aztec network like deposits, withdrawals, account registrations, account migrations, account recovery and asset transfers.

## Running the SDK Starter Script

The `./src/index.ts` file contains a script that shows how to do many common operations on the Aztec network such as setting up the SDK, creating Aztec keys from an Ethereum private key, registering a new account, depositing transferring and withdrawing assets (Eth and tokens). 

Examples of interactions with Ethereum L1 defi applications (like Lido and Element) are coming soon.

Install the runtime dependencies as follows:

1. When you are asked for which version of `aztec/bridge-clients` to use, pick the highest version number:

```shell=
$ yarn
```

2. Depending on your environment configuration, create your `.env` file as a copy of either 
- `.env.example_testnet` 

    or 
- `.env.example_devnet` 

    and add your Ethereum private key or mnemonic to your `.env` file

3. Run script, `./src/index.ts`:

```shell=
$ yarn go
```

The resulting output from running the basic SDK setup functionality in the script should look something like this:

```shell=
. . .

  bb:core_sdk storing aliases to db... +14ms
  bb:core_sdk genesis sync complete in 0.02s +3ms
  bb:core_sdk initial tree size set to  1 +1ms
  bb:core_sdk starting sync task... +1ms

. . .
```

At the bottom of `./src/index.ts` is a function named `main` where you can turn the functions in the script on and off.

### Demo web app

For a boilerplate React App frontend that uses the SDK, check out: 
- https://github.com/Globallager/aztec-frontend-boilerplate

## Building Intuition for Aztec Accounts

[The accounts page of the Aztec docs](https://docs.aztec.network/how-aztec-works/accounts) has the most up to date and comprehensive information on accounts.

## Debug

Run in terminal

```shell=
$ export DEBUG=bb:*
```

When debugging in the browser, make sure that the dev tools console logging is set to `verbose`.

Debugging applications in privacy preserving systems like Aztec is difficult--you can't reference the block explorer to verify all transaction and account information. I like to use the [testnet version of zk.money](https://aztec-connect-testnet.zk.money/) to cross reference account and transaction information.

We are in the process of building out better developer tooling in this regard (ie import your privacy key into the block explorer to decrypt your account and transaction histories). If you would like to help build developer tooling for Aztec, reach out to me on twitter [@critesjosh_](https://twitter.com/critesjosh_).
