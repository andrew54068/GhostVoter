import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { Topic } from "components/VoteTable/Vote/TopicBox";
import { ethers } from 'ethers';
import { TOPIC_SCHEMA_UID } from '../constants/query'
import type { SchemaItem, SchemaValue } from '@ethereum-attestation-service/eas-sdk';
require('dotenv').config()

export interface SchemaElement {
    name: string;
    type: string;
}

export const EASContractAddress = "0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587"; // Ethereum mainnet

// Initialize the sdk with the address of the EAS Schema contract address
const eas = new EAS(EASContractAddress);

// Gets a default provider (in production use something else like infura/alchemy)
// const provider = ethers.InfuraProvider( // .providers.getDefaultProvider(
//     "mainnet"
// );

const infuraApiKeys = {
    projectId: "a2c132ffdf6449b8aece22a5bfb4e256",
    projectSecret: "a3367820724c4c04bf81dc34758e859b",
}

const provider = new ethers.InfuraProvider("mainnet", infuraApiKeys.projectId, infuraApiKeys.projectSecret)


// Your private key
const privateKey = process.env.PRIVATEKEY;
if (!privateKey) process.exit()

// Create a wallet instance from the private key
const wallet = new ethers.Wallet(privateKey);

// Connect the wallet to the InfuraProvider
// const signer = wallet.connect(provider);

// Connects an ethers style provider/signingProvider to perform read/write functions.
// MUST be a signer to do write operations!
eas.connect(provider);

const generateTopicEncodeData = (schema: SchemaElement[], topic: Topic): SchemaItem[] => {
    return schema.map(value => {
        return {
            // @ts-expect-error
            value: topic[value.name],
            ...value
        }
    })
}

const exec = async () => {
    // const uid = "0xef516014837cd92a3ab3525df5b04c421096a374726a53f61a62c225f6e1d552";

    // const attestation = await eas.getAttestation(uid);

    // console.log(attestation);
    // process.exit()

    const offchain = await eas.getOffchain();
    // console.log(`offchain success`);

    // Initialize SchemaEncoder with the schema string
    const topicSchema = [
        {
            name: "id",
            type: "string"
        },
        {
            name: "title",
            type: "string"
        },
        {
            name: "desc",
            type: "string"
        },
        {
            name: "timestamp",
            type: "string"
        },
        {
            name: "options",
            type: "string[]"
        }
    ]
    const topicEncoderString = topicSchema.map(value => `${value.type} ${value.name}`).join(', ')
    // const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
    const schemaEncoder = new SchemaEncoder(topicEncoderString);
    const tempTopic: Topic = {
        id: "8b3d3a7d-302f-4fd6-957f-0b23738bff05",
        title: "Who should be the next presiden?",
        desc: "Who do you think the next presiden in crypto?",
        timestamp: "1691907570",
        options: ["Vitalik", "Justin Sun", "CZ"]
    }
    const topicEncodeData = generateTopicEncodeData(topicSchema, tempTopic)
    console.log(`💥 topicEncodeData: ${JSON.stringify(topicEncodeData, null, '  ')}`);

    const encodedData = schemaEncoder.encodeData(topicEncodeData);

    // Signer is an ethers.js Signer instance
    const privateKey = process.env.PRIVATEKEY || ''
    const signer = new ethers.Wallet(privateKey, provider);

    const offchainAttestation = await offchain.signOffchainAttestation({
        recipient: '0x85fD692D2a075908079261F5E351e7fE0267dB02',
        // Unix timestamp of when attestation expires. (0 for no expiration)
        // @ts-expect-error
        expirationTime: 0,
        // Unix timestamp of current time
        // @ts-expect-error
        time: 1691907570,
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        version: 1,
        // nonce: 0,
        schema: TOPIC_SCHEMA_UID,
        refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
        data: encodedData,
    }, signer);
    console.log(offchainAttestation);
    // console.log(`💥 offchainAttestation: ${JSON.stringify(offchainAttestation, null, '  ')}`);
}
exec()
