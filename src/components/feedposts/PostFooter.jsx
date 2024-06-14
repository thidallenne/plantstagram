import { Box, Flex, InputGroup, InputRightElement, Input, Text, Button, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { Link } from "react-router-dom";
import CommentsModal from "../modals/CommentsModal";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import useSavePost from "../../hooks/useSavePost";

export default function PostFooter({post, creatorProfile, isProfilePage}){
    const [comment, setComment] = useState('');
    const {isCommenting, handlePostComment} = usePostComment();
    const authUser = useAuthStore((state) => state.user)
    const commentRef= useRef(null);
    const {isLiked, likes, handleLikePost} = useLikePost(post);
    
    const {isSaved, handleSavePost} = useSavePost(post.id);

    const {isOpen, onOpen, onClose} = useDisclosure()
    
    const handleSubmitComment = async () => {
		await handlePostComment(post.id, comment);
		setComment("");
	};


    return(
        <>
            <Box mt={'auto'}>
                <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
                    <Flex alignItems={"center"} gap={4} w={"full"} pt={0}>
                        <Box onClick={handleLikePost} cursor={'pointer'} fontSize={18}>
                            {!isLiked ? (<NotificationsLogo/>): (<UnlikeLogo/>)}
                        </Box>
                        <Box cursor={'pointer'} fontSize={18} onClick={() => commentRef.current.focus()}>
                            <CommentLogo />
                        </Box>
                    </Flex>
                    <Box onClick={handleSavePost} cursor={'pointer'} fontSize={20} mr={1}>
                        {!isSaved ? <BsBookmark /> : <BsBookmarkFill />}
                    </Box>
                </Flex>
                <Text fontWeight={600} fontSize={"sm"}>
                    {likes} J'aime
                </Text>
                { !isProfilePage && (
                    <>  
                        <Link to={`/${creatorProfile?.username}`}>
                            <Text fontWeight={700} fontSize={"sm"}>
                                {creatorProfile?.username} {" "}
                            </Text>
                        </Link>
                        <Text as="span" fontSize={"sm"} fontWeight={400}>
                            {post?.caption}
                        </Text>
                        {post.comments.length == 1 && 
                            <Text color={"gray"} fontSize={"sm"} cursor={'pointer'} onClick={onOpen}>
                                Voir le commentaire
                            </Text>
                        }
                        {post.comments.length > 1 && 
                            <Text color={"gray"} fontSize={"sm"} cursor={'pointer'} onClick={onOpen}>
                                Voir les {post.comments.length} commentaires
                            </Text>
                        }
                        {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post}/> : null}
                    </>
                )}

                {authUser && (
                    <>
                    <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
                        <InputGroup>
                            <Input variant={"flushed"}
                                    placeholder={"Ajouter un commentaire..."}
                                    fontSize={14}
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                    _focusVisible={{borderColor:'#fff'}}
                                    ref={commentRef}
                                    />
                            <InputRightElement>
                                <Button
                                    fontSize={14}
                                    color={"#DFBC60"}
                                    fontWeight={600}
                                    cursor={"pointer"}
                                    _hover={{ color: "white"}}
                                    
                                    bg={"transparent"}
                                    onClick={handleSubmitComment}
                                    isLoading={isCommenting}
                                    >
                                    Poster
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Flex>
                    </>
                )}

            </Box>
        </>
    )
}