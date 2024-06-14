import { Flex, VStack, Text, Box, Link } from "@chakra-ui/react";
import SuggestedHeader from "../../components/suggestedUsers/SuggestedHeader"
import SuggestedUser from "../../components/suggestedUsers/SuggestedUser"
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
import useAuthStore from "../../store/authStore";

export default function SuggestedUsers(){
    const authUser= useAuthStore(state => state.user);
    const {isLoading, suggestedUsers} = useGetSuggestedUsers(3);
    if (isLoading) return null;
    return (
        <VStack py={8} px={6} gap={4}>
            <SuggestedHeader />
            {/* N'afficher que s'il y a des suggestions */}
            {authUser.following.length !== 0 && suggestedUsers.length !== 0  && (
                <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
                    <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
                                Suggestions pour vous
                    </Text>
                </Flex>
            )}
            {/* {suggestedUsers.map((user) => (
                <SuggestedUser user={user} key={user.id} />
            ))} */}
            {authUser.following.length !== 0 && suggestedUsers.map((user) => (
                <SuggestedUser user={user} key={user.id} />
            ))}
        
            {/* {CREDIT} */}
            <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
                © 2024 Codé par{" "}
                <Link href='https://thibauld-dallenne.com/' target='_blank' color='#DFBC60' fontSize={12} _hover={{textDecoration:"none"}}>
					Thibauld DALLENNE
				</Link>
            </Box>
        </VStack>
    )
}