import { CreateVote, VoteButtons, VoteDatas } from "components";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./VoteTable.module.scss";

// interface VoteTable {
//   openModal: () => void;
// }
const VoteTable = ({ openModal }: any) => {
  const { data: session, status } = useSession();
  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.buttons}>
        <VoteButtons />
        <CreateVote />
      </div> */}
      <div className={styles.datas}>
        <VoteDatas openModal={openModal} />
      </div>
    </div>
  );
};

export { VoteTable };
