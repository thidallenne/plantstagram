import {Avatar, Flex, VStack, Text, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";

export default function SuggestedCardUser({user, setUser}){
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
            <Flex justifyContent={"space-between"} flexDir={"column"} alignItems={"center"} w={"150px"} border={"1px solid #5C8475"} pt={10} pb={10} m={'0 auto 40px'}>
                 
                <Flex flexDir={"column"} alignItems={"center"} gap={2} mb={5}>
                    <Link to={`/${user.username}`}>
                        <Avatar size={"xl"} src={user.profilePicURL} />
                    </Link>
                    <VStack spacing={2} alignItems={"center"}>
                        <Link to={`/${user.username}`}>
                            <Box fontSize={14} fontWeight={"bold"}>
                            {user.username}
                            </Box>
                        </Link>
                        <Text fontSize={12} color={"gray.200"}>
                            {user.fullName}
                        </Text>
                    </VStack>
                </Flex>
                {authUser.uid !== user.uid && (
                    <Button
                            fontSize={14}
                            p={2}
                            h={"max-content"}
                            fontWeight={"medium"}
                            cursor={"pointer"}
                            bg={"#DFBC60"}
							color={"#102626"}
                            _hover={{ bg: "white" }}
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