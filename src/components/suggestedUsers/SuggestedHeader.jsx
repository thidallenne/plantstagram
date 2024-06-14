import { Flex, Avatar, Button, Text } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

export default function SuggestedHeader() {
    const {handleLogout, isLoggingOut } = useLogout();
    const authUser = useAuthStore(state => state.user);

    if (!authUser) return null;
    
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Link to={`${authUser.username}`}>
					<Avatar size={"md"} src={authUser.profilePicURL} />
				</Link>
				<Link to={`${authUser.username}`}>
					<Text fontSize={12} fontWeight={"bold"}>
						{authUser.username}
					</Text>
				</Link>
            </Flex>
            <Button
            _hover={{bg:'transparent'}}
            background={'transparent'}
            fontSize={12}
            fontWeight={"medium"}
            color={"#DFBC60"}
            cursor={'pointer'}
            style={{textDecoration:"none"}}
            onClick={handleLogout}
            isLoading={isLoggingOut}
            >
                Se déconnecter
            </Button>
        </Flex>
    )
}