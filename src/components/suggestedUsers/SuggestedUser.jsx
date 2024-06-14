import {Avatar, Flex, VStack, Text, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";

export default function SuggestedUser({user, setUser}){
    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
    const authUser = useAuthStore(state => state.user)

    const onFollowUser = async () => {
		await handleFollowUser();
		setUser({
			...user,
			followers: isFollowing
				? user.followers.filter((follower) => follower.uid !== authUser.uid)
				: [...user.followers, authUser],
		});
	};
    return (
        <>
            <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
                 
                <Flex alignItems={"center"} gap={2}>
                    <Link to={`/${user.username}`}>
                        <Avatar size={"md"} src={user.profilePicURL} />
                    </Link>
                    <VStack spacing={2} alignItems={"flex-start"}>
                        <Link to={`/${user.username}`}>
                            <Box fontSize={12} fontWeight={"bold"}>
                            {user.fullName}
                            </Box>
                        </Link>
                        <Text fontSize={11} color={"gray.500"}>
                            {user.followers.length} abonné·es
                        </Text>
                    </VStack>
                </Flex>
                {authUser.uid !== user.uid && (
                    <Button
                            fontSize={12}
                            bg={"transparent"}
                            p={0}
                            h={"max-content"}
                            fontWeight={"medium"}
                            color={"#DFBC60"}
                            cursor={"pointer"}
                            _hover={{ color: "white" }}
                            onClick={onFollowUser}
                            isLoading={isUpdating}
                        >
                            {!isFollowing ? "S'abonner" : "Se désabonner"}
                    </Button>
                )}
            </Flex>
        </>
    )
}