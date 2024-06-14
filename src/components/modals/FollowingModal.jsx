import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import FollowedUser from "../profile/FollowedUser";
import {v4 as uuidv4} from 'uuid'

export default function FollowingModal({followingModalIsOpen, followingModalOnClose,creatorProfile }){
    return (
        <Modal isOpen={followingModalIsOpen} onClose={followingModalOnClose}>
        <ModalOverlay />
        <ModalContent bg={"#0f2626"} border={"1px solid #5C8475"} maxW={"400px"}>
            <ModalHeader>Abonnements</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <Flex mb={4} gap={4} flexDir={"column"} maxH={"250px"} overflowY={"auto"}>
                    <ul>
                    {creatorProfile.following.map((followingUser) => (
                                   <FollowedUser key={uuidv4()} followingUser={followingUser} />
                                ))}
                    </ul>
               </Flex>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}