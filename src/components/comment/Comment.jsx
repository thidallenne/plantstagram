import { Avatar, Flex, Text ,Box, SkeletonCircle, Skeleton } from "@chakra-ui/react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

export default function Comment({comment}){
    const {userProfile, isLoading} = useGetUserProfileById(comment.createdBy);
    if (isLoading) return <CommentSkeleton />;
    return (
        <>  
            <Flex gap={4}>
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
                            • {timeAgo(comment.createdAt)}
                        </Text>
                    </Flex>
                    <Box>
                        <Text fontSize={14}>
                            {/* {comment} */}
                            {comment.comment}
                        </Text>
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}


const CommentSkeleton = () => {
	return (
		<Flex gap={4} w={"full"} alignItems={"center"}>
			<SkeletonCircle h={10} w='10' startColor='#5C8475' endColor='#113A3A'/>
			<Flex gap={1} flexDir={"column"}>
				<Skeleton height={2} width={100} startColor='#5C8475' endColor='#113A3A'/>
				<Skeleton height={2} width={50} startColor='#5C8475' endColor='#113A3A'/>
			</Flex>
		</Flex>
	);
};