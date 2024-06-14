import { Flex, GridItem, Image, Text, useDisclosure, Modal, ModalOverlay, ModalBody, ModalContent, ModalCloseButton, Avatar, Button, Divider, VStack } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../comment/Comment";
import PostFooter from "../feedposts/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import usePostStore from "../../store/postStore";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore, storage} from "../../firebase/firebase";
import Caption from "../comment/Caption";
import {v4 as uuidv4} from 'uuid';

export default function ProfilePost({post}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
	const deletePost = usePostStore((state) => state.deletePost);
	const [isDeleting, setIsDeleting] = useState(false);
	const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
	//console.log(comments);

	const handleDeletePost = async() => {
		if (!window.confirm("Êtes-vous certain de supprimer cette publication ?")) return;
		if (isDeleting) return;
		try {
			const imageRef = ref(storage, `posts/${post.id}`);
			await deleteObject(imageRef);
			const userRef = doc(firestore, "users", authUser.uid);
			await deleteDoc(doc(firestore, "posts", post.id));

			await updateDoc(userRef, {
				posts: arrayRemove(post.id),
			});

			deletePost(post.id);
			decrementPostsCount(post.id);
			showToast('Succès', "Publication supprimée", 'success');
			
		} catch (error) {
			showToast('Erreur', error.message, 'error');
		} finally {
			setIsDeleting(false);
		}
	}
    return (
        <>
            <GridItem
				cursor={"pointer"}
				borderRadius={4}
				overflow={"hidden"}
				border={"1px solid"}
				borderColor={"whiteAlpha.300"}
				position={"relative"}
				aspectRatio={1 / 1}
				onClick={onOpen}
			>
                <Flex
					opacity={0}
					_hover={{ opacity: 1}}
					position={"absolute"}
					top={0}
					left={0}
					right={0}
					bottom={0}
					bg={"rgba(16,38,38, 0.7)"}
					transition={"all 0.3s ease"}
					zIndex={1}
					justifyContent={"center"}
				>
                    <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
						<Flex>
							<AiFillHeart size={20} />
							<Text fontWeight={"bold"} ml={2}>
								{post.likes.length}
							</Text>
						</Flex>

						<Flex>
							<FaComment size={20} />
							<Text fontWeight={"bold"} ml={2}>
								{post.comments.length}
							</Text>
						</Flex>
					</Flex>
                </Flex>
                <Image src={post.imageURL} alt='profile post' w={"100%"} h={"100%"} objectFit={"cover"} />
            </GridItem>
			<Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody borderRadius={4} bg={"#0f2626"} p={0}>
						<Flex 
							gap='4'
							w={{ base: "90%", sm: "70%", md: "full" }}
							mx={"auto"}
							//maxH={"10vh"}
							//height={"45vh"}
							maxH={"90vh"}
							minH={"43vh"}
						>
							<Flex
								//borderRadius={4}
								overflow={"hidden"}
								//borderRight={"1px solid"}
								//borderColor={"gray.100"}
								flex={1.5}
								justifyContent={"center"}
								alignItems={"center"}
								cursor={'pointer'}
							>
								<Image src={post.imageURL} alt='profile post' />
							</Flex>
							<Flex flex={1} flexDir={"column"} px={8} py={4} display={{ base: "none", md: "flex" }}>
								<Flex alignItems={"flex-start"} justifyContent={"space-between"}>
									<Caption post={post} />
									{authUser?.uid === userProfile.uid && (
										<Button _hover={{  color: "red.600" }}
												borderRadius={4}
												p={1}
												size={"sm"}
												bg={"transparent"}
												onClick={handleDeletePost}
												isLoading={isDeleting}
										>
											<MdDelete size={20} cursor='pointer'/>
										</Button>
									)}

								</Flex>
								<Divider my={4} bg={"#5C8475"}/>
								<VStack w='full' alignItems={"start"} maxH={"70%"} overflowY={"auto"}>
									{/* CAPTION */}
									{/* {post.caption && (
										<Caption post={post}/>
									)} */}
									{/* COMMENT */}
									{post.comments.map((comment) => (
										<Comment key={uuidv4()} comment={comment}/>
									))}
									{/* {<Comment createdAt={'1j'} username={'username1'} profilePic={'/profilepic.png'} comment={'ceci est un commentaire'}/>} */}
								</VStack>
								
								<PostFooter isProfilePage={'true'} post={post}/>
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
        </>
    )
}