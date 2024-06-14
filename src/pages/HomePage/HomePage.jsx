import { Box, Container, Flex } from "@chakra-ui/react"
import FeedPosts from "../../components/feedposts/FeedPosts"
import SuggestedUsers from "../../components/suggestedUsers/SuggestedUsers"

export default function HomePage(){
    return (
        <Container maxW={"100%"} w={'100%'}>
			<Flex gap={20}>
				<Box flex={2} py={10}>
					<FeedPosts />
				</Box>
				<Box flex={3} mr={20} display={{ base: "none", lg: "block" }} maxW={"300px"}>
					<SuggestedUsers />
				</Box>
			</Flex>
        </Container>
    )
}