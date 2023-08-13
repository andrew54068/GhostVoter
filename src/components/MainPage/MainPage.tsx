import styles from "./MainPage.module.scss";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
  Input,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Navbar, VoteTable, CreateSection, VoteModal } from "components";
import { useModal } from "hooks/useModal";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { OptionInfo, localDataHandler } from "../../utils/localDataHandler";
import styled from "styled-components";

const getUuid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

const MainPage = () => {
  // const modal = useModal();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [newTopic, setNewTopic] = useState()
  const { data: session, status } = useSession();
  const newTopic = useRef({
    id: getUuid(),
    title: "",
    options: [] as OptionInfo[],
    voterIds: [] as string[],
  });
  const [latestTopic, setLatestTopic] = useState(newTopic.current)
  const newOptions = useRef([] as OptionInfo[]);

  const handler = localDataHandler();

  useEffect(() => {
    console.log(`💥 newTopic: ${JSON.stringify(newTopic, null, "  ")}`);
  }, [newTopic]);

  const updateOptions = (index: number, title: string) => {
    if (newOptions.current[index]) {
      newOptions.current[index] = {
        title,
        amount: 0,
      };
    } else {
      newOptions.current.push({
        title,
        amount: 0,
      });
    }
    setLatestTopic({
      id: newTopic.current.id,
      title: newTopic.current.title,
      options: newOptions.current,
      voterIds: []
    })
  };

  const createTopic = () => {
    handler.addNewTopic({
      id: newTopic.current.id,
      title: newTopic.current.title,
      options: newOptions.current.map((value) => value.title),
    });
    onClose();
    setLatestTopic({
      id: getUuid(),
      title: "",
      options: [] as OptionInfo[],
      voterIds: [] as string[],
    })
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Navbar />
        {session?.user && <CreateSection onClick={onOpen} />}
        <VoteTable latestTopic={latestTopic}/>
        <Modal
          blockScrollOnMount={false}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent p="28px" bg="#292229">
            <ModalHeader p="0 0 20px 0px" alignItems="center" color="#FFF3CD">
              Create a Topic
            </ModalHeader>
            <ModalCloseButton m="20px" color="#FFF3CD" />
            <ModalBody p="0">
              <>
                <Box w="100%" m="12px 0">
                  <Text
                    color="#FFF3CD"
                    textAlign="left"
                    fontSize="16px"
                    fontWeight={700}
                  >
                    Title
                  </Text>
                </Box>
                <Input
                  placeholder=""
                  color="#ffffff"
                  onChange={(e) => (newTopic.current.title = e.target.value)}
                />

                <Box w="100%" m="12px 0">
                  <Text
                    color="#FFF3CD"
                    textAlign="left"
                    fontSize="16px"
                    fontWeight={700}
                  >
                    Options
                  </Text>
                </Box>
                <Input
                  placeholder="Option 1"
                  color="#ffffff"
                  onChange={(e) => updateOptions(0, e.target.value)}
                />
                <Input
                  placeholder="Option 2"
                  color="#ffffff"
                  onChange={(e) => updateOptions(1, e.target.value)}
                />
                <Input
                  placeholder="Option 3"
                  color="#ffffff"
                  onChange={(e) => updateOptions(2, e.target.value)}
                />

                <Center mt="24px">
                  <Button
                    isDisabled={
                      latestTopic.title === "" ||
                      latestTopic.options.length < 2
                    }
                    onClick={createTopic}
                  >
                    Create
                  </Button>
                </Center>
              </>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export { MainPage };
