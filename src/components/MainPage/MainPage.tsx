import styles from "./MainPage.module.scss";
import {
  Navbar,
  VoteTable,
  ClaimModal,
  VoteModal,
} from "components";
import { useModal } from "hooks/useModal";
import { useEffect, useState } from "react";
import { useClaim } from "hooks/useClaim";
import { useSelector } from "react-redux";
enum WHICHMODAL {
  "CLAIM",
  "VOTE",
}

const MainPage = () => {
  const modal = useModal();
  const [whichModal, setWhichModal] = useState<WHICHMODAL>(WHICHMODAL.CLAIM);
  const [opening, setOpening] = useState(true);
  const { balanceOf } = useClaim();
  const voteModalDatas = useSelector(
    (state: any) => state.account.voteModalDatas
  );
  const account = useSelector(
    (state: any) => state.account.account
  );
  useEffect(() => {
    const fetchData = async () => {
      const result = await balanceOf(voteModalDatas.index);
      if (result) {
        setWhichModal(WHICHMODAL.VOTE);
      } else {
        setWhichModal(WHICHMODAL.CLAIM);
      }
    };

    fetchData().catch((err: any) => {
      console.log(err);
    });
  }, [modal.isOpen]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await balanceOf(voteModalDatas.index);
      if (result) {
        setWhichModal(WHICHMODAL.VOTE);
      } else {
        setWhichModal(WHICHMODAL.CLAIM);
      }
    };

    fetchData().catch((err: any) => {
      console.log(err);
    });
  }, [account]);

  useEffect(() => {
    setTimeout(() => {
      setOpening(false);
    }, 5000);
  }, []);
  return (
    <>
      <div className={styles.wrapper}>
        <Navbar />
        <VoteTable openModal={modal.open} />
        {whichModal === WHICHMODAL.CLAIM ? (
          <ClaimModal modal={modal} />
        ) : (
          <VoteModal modal={modal} changer={setWhichModal}/>
        )}
      </div>
    </>
  );
};

export { MainPage };