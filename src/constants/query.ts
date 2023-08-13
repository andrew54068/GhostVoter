import { gql } from 'urql';

export const TOPIC_SCHEMA_UID = '0x064bfe0ed910a24461d4ab8b7258227479115c908efd944e869b9d7cc1fde417';

export const VOTE_SCHEMA_UID = '0x302ae32a648ad1211352a9cd45b78ef95a5935595b338208e8b49843e87088e6';

export const queryTopicData = () => gql`
query Attestation {
    attestations(
      where: {
        schemaId: {
          equals: "${TOPIC_SCHEMA_UID}"
        }
      }
    ) {
      id
      attester
      recipient
      refUID
      revocable
      revocationTime
      expirationTime
      data
      schemaId
      decodedDataJson
    }
  }
`;

export const queryVoteData = (topicId: string) => gql`
query Attestation {
    attestations(
      where: {
        schemaId: {
          equals: "${VOTE_SCHEMA_UID}"
        } 
        decodedDataJson: {
          contains: "${topicId}"
        }
      }
    ) {
      id
      attester
      recipient
      refUID
      revocable
      revocationTime
      expirationTime
      data
      schemaId
      decodedDataJson
    }
  }
`;