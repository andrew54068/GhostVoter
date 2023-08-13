import styles from "./Navbar.module.scss";
import { Button } from "ui/Button/Button";
// import { IoMdMoon, IoMdSunny } from "react-icons/io";
// import { useTheme } from "hooks/useTheme";
import LOGO from "assets/logo.jpg";
// import { useAccount } from "hooks/useAccount";
// import { RootState } from "store";
// import { useEffect } from "react";
// import { parseAddress } from "utils/parseAddress";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
// import styles from "../header.module.css";

const Navbar = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.app}>
          <div className={styles.logo} onClick={() => {}}>
            <img src={LOGO.src}></img>
          </div>
          <div> 
          {/* className={styles.signedInStatus}> */}
            <p
              className={`nojs-show ${
                !session && loading ? styles.loading : styles.loaded
              }`}
            >
              {!session && (
                <>
                  <span className={styles.notSignedInText}>
                    You are not signed in
                  </span>
                  <a
                    href={`/api/auth/signin`}
                    className={styles.buttonPrimary}
                    onClick={(e) => {
                      e.preventDefault();
                      signIn("worldcoin"); // when worldcoin is the only provider
                      // signIn() // when there are multiple providers
                    }}
                  >
                    Sign in With World id
                  </a>
                </>
              )}
              {session?.user && (
                <>
                  {session.user.image && (
                    <span
                      style={{
                        backgroundImage: `url('${session.user.image}')`,
                      }}
                      className={styles.avatar}
                    />
                  )}
                  <span className={styles.signedInText}>
                    <small>Signed in as</small>
                    <br />
                    <strong>{session.user.email ?? session.user.name}</strong>
                  </span>
                  <a
                    href={`/api/auth/signout`}
                    className={styles.button}
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                  >
                    Sign out
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export { Navbar };
