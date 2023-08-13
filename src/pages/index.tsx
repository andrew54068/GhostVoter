// import Header from "./header";
import {
  Client as UrqlClient,
  Provider as UrqlProvider,
  fetchExchange,
} from "urql";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import { MainPage } from "components";
import { useInitialTheme } from "../hooks/useInitialTheme";
import styles from "../App.module.scss";

const client = new UrqlClient({
  // TODO: set env file for graphql endpoint
  url: "https://easscan.org/graphql/playground",
  exchanges: [fetchExchange],
  requestPolicy: "network-only", // disable cache
});

function App() {
  useInitialTheme();
  return (
    <div className={styles.wrapper}>
      <ChakraProvider>
        <UrqlProvider value={client}>
          <MainPage />
        </UrqlProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
