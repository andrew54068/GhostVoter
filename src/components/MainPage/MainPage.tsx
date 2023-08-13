import styles from "./MainPage.module.scss";
import { Navbar, VoteTable, CreateSection, VoteModal } from "components";
import { useModal } from "hooks/useModal";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "ui/Button/Button";
import styled from "styled-components";


const MainPage = () => {
  const modal = useModal();
  // const [whichModal, setWhichModal] = useState<WHICHMODAL>(WHICHMODAL.CLAIM);
  const [opening, setOpening] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    setTimeout(() => {
      setOpening(false);
    }, 5000);
  }, []);
  return (
    <>
      <div className={styles.wrapper}>
        <Navbar />
        {!session && <CreateSection/>}
        {session?.user && <CreateSection/>}
        <VoteTable openModal={modal.open} />
        {/* {whichModal === WHICHMODAL.CLAIM ? (
          <ClaimModal modal={modal} />
        ) : (
          <VoteModal modal={modal} changer={setWhichModal} />
        )} */}
      </div>
    </>
  );
};

export { MainPage };
