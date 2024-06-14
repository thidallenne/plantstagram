import { Flex, Text, Box, Avatar } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { timeAgo } from "../../utils/timeAgo"
import useUserProfileStore from "../../store/userProfileStore";

export default function Caption({post}){
    const userProfile = useUserProfileStore((state) => state.userProfile);
    return (
        <Flex gap={4} alignItems={'center'}>
            <Link to={`/${userProfile.username}`}>
                <Avatar src={userProfile.profilePicURL} size={"sm"}/>
            </Link>
            <Flex  direction={'column'}>
                <Flex  gap={2}>
                    <Link to={`/${userProfile.username}`}>
                        <Text fontSize={12} fontWeight={"bold"}>
                            {userProfile.username}
                        </Text>
                    </Link>
                    <Text color={"gray.500"} fontSize={12}>
                        {/*     {createdAt} */}
                        • {timeAgo(post.createdAt)}
                    </Text>
                </Flex>
                {post.caption &&  
                    <Box>
                        <Text fontSize={14}>
                            {/* {comment} */}
                            {post.caption}
                        </Text>
                    </Box>
                }
            </Flex>
    </Flex>
    )
}