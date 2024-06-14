import { Container, Skeleton, SkeletonCircle, VStack, Flex, Box, Text } from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import SuggestedCardsUsers from "../suggestedUsers/SuggestedCardsUsers";

export default function FeedPosts(){
    const { isLoading, posts } = useGetFeedPosts();

    return(
        <Container maxW={"container.sm"} pb={10} px={2}>
            {isLoading && [0,1,2,3].map((_,idx) => (
                <VStack  key={idx} gap={4} alignItems={"flex-start"} mb={10}>
                    <Flex gap='2' alignItems={'center'}>
                        <SkeletonCircle size='10' startColor='#5C8475' endColor='#113A3A' />
                        <VStack gap={2} alignItems={"flex-start"}>
                            <Skeleton height='10px' w={"200px"} startColor='#5C8475' endColor='#113A3A'/>
                        </VStack>
                    </Flex>
                    <Skeleton w={"full"} startColor='#5C8475' endColor='#113A3A'>
                        <Box h={"400px"}>contents wrapped</Box>
                    </Skeleton>
                </VStack>
            )) }
            {!isLoading && posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post} />)}
            {!isLoading && posts.length === 0 && (
				<>
					<Text fontSize={"md"} textAlign={"center"}>
						Il semblerait que vous ne suiviez personne pour l'instant.
					</Text>
					<Text textAlign={"center"}>Il est temps de vous abonner !</Text>
                    <SuggestedCardsUsers/>
				</>
			)}

        </Container>
    )
}