import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import Comment from "../comment/Comment";
import usePostComment from "../../hooks/usePostComment";
import { useEffect, useRef } from "react";
import {v4 as uuidv4} from 'uuid'

export default function CommentsModal({ isOpen, onClose, post }){
	const {isCommenting, handlePostComment} = usePostComment();
	const commentRef= useRef(null);
	const commentsContainerRef = useRef(null);

	const handleSubmitComment = async (e) => {
		e.preventDefault();
		await handlePostComment(post.id, commentRef.current.value);
		commentRef.current.value= '';
	};

	useEffect(() => {
		const scrollToBottom = () => {
			commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
		}
		if(isOpen){
			setTimeout(() =>{
				scrollToBottom();
			},100)
		}
	},[isOpen, post.comments.length])

    return (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
 			<ModalOverlay />
 			<ModalContent bg={"#0f2626"} border={"1px solid #5C8475"} maxW={"400px"}>
 				<ModalHeader>Commentaires</ModalHeader>
 				<ModalCloseButton />
 				<ModalBody pb={6}>
 					<Flex mb={4} gap={4} flexDir={"column"} maxH={"250px"} overflowY={"auto"} ref={commentsContainerRef}>
                     {post.comments.map((comment) => (
										<Comment key={uuidv4()} comment={comment}/>
									))}
                    </Flex>
 					<form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
 						<Input placeholder='Ecrire un commentaire' size={"sm"} ref={commentRef}/>
 						<Flex w={"full"} justifyContent={"flex-end"}>
 							<Button type='submit' ml={"auto"} size={"sm"} my={4}  isLoading={isCommenting}>
 								Publier
 							</Button>
 						</Flex>
 					</form>
 				</ModalBody>
 			</ModalContent>
 		</Modal>
    )
}