import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Link } from "react-router-dom";

export default function FollowedUser({followingUser}){
    const {userProfile} = useGetUserProfileById(followingUser);
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} >
            <Flex alignItems={"center"} gap={2} my={'5px'}>
                <Link to={`/${userProfile?.username}`}>
                    <Avatar size={"md"} src={userProfile?.profilePicURL} />
                </Link>
                <VStack spacing={1} alignItems={"flex-start"}>
                    <Link to={`/${userProfile?.username}`}>
                        <Box fontSize={14} fontWeight={"bold"}>
                        {userProfile?.fullName}
                        </Box>
                    </Link>
                    <Text fontSize={12} color={"gray.500"}>
                        {userProfile?.followers.length} abonné·es
                    </Text>
                </VStack>
            </Flex>
        </Flex>
    )
}