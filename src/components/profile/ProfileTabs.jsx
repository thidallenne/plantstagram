import { Box, Flex, Text } from "@chakra-ui/react";
//import { useState } from "react";
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs";

export default function ProfileTabs({showPosts, showSaved, isPostsActive, isSavedActive}) {
    return (
        <Flex
			w={"full"}
			justifyContent={"center"}
			gap={{ base: 4, sm: 10 }}
			textTransform={"uppercase"}
			fontWeight={"bold"}
		>
			<Flex  borderTop={isPostsActive ? "1px solid white" : "0"} alignItems={"center"} p='3' gap={1} cursor={"pointer"}
			onClick={showPosts}
			>
				<Box fontSize={20} mr={1}>
					<BsGrid3X3 />
				</Box>
				<Text fontSize={12} display={{ base: "none", sm: "block" }}>
					Publications
				</Text>
			</Flex>

			<Flex borderTop={isSavedActive ? "1px solid white" : "0"} alignItems={"center"} p='3' gap={1} cursor={"pointer"}
			onClick={showSaved}
			>
				<Box fontSize={20} mr={1}>
					<BsBookmark />
				</Box>
				<Text fontSize={12} display={{ base: "none", sm: "block" }}>
					Enregistrements
				</Text>
			</Flex>
{/* 
			<Flex alignItems={"center"} p='3' gap={1} cursor={"pointer"}>
				<Box fontSize={20} mr={1}>
					<BsSuitHeart fontWeight={"bold"} />
				</Box>
				<Text fontSize={12} display={{ base: "none", sm: "block" }}>
					Likes
				</Text>
			</Flex> */}
		</Flex>
	);
}