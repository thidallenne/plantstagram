import { Flex, Text } from "@chakra-ui/react";

export default function NoPostsFound() {
    return(
        <>
        <Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Text fontSize={"2xl"}>Pas encore de publications</Text>
		</Flex>
        </>
    )
}