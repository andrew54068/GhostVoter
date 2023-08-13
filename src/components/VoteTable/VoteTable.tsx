import { CreateVote, VoteButtons, VoteDatas } from "components";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./VoteTable.module.scss";
import { TopicVotes } from "utils/localDataHandler";

interface VoteTableData {
  latestTopic: TopicVotes;
}
const VoteTable = ({ latestTopic }: VoteTableData) => {
  console.log(`💥 latestTopic: ${JSON.stringify(latestTopic, null, '  ')}`);
  const { data: session, status } = useSession();
  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.buttons}>
        <VoteButtons />
        <CreateVote />
      </div> */}
      <div className={styles.datas}>
        <VoteDatas />
      </div>
    </div>
  );
};

export { VoteTable };
