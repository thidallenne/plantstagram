import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import FollowerUser from "../profile/FollowerUser";
import {v4 as uuidv4} from 'uuid'

export default function FollowingModal({followersModalIsOpen, followersModalOnClose,creatorProfile }){
    return (
        <Modal isOpen={followersModalIsOpen} onClose={followersModalOnClose}>
        <ModalOverlay />
        <ModalContent bg={"#0f2626"} border={"1px solid #5C8475"} maxW={"400px"}>
            <ModalHeader>Abonné·es</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <Flex mb={4} gap={4} flexDir={"column"} maxH={"250px"} overflowY={"auto"}>
                    <ul>
                    {creatorProfile.followers.map((followerUser) => (
                                   <FollowerUser key={uuidv4()} followerUser={followerUser} />
                                ))}
                    </ul>
               </Flex>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}