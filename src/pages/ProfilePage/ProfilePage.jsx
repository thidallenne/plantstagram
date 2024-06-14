import { Container, Flex, Link, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileTabs from "../../components/profile/ProfileTabs";
import ProfilePosts from "../../components/profile/ProfilePosts";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

export default function ProfilePage() {

	const { username } = useParams();
	const { isLoading, userProfile } = useGetUserProfileByUsername(username);
	const [isPostsActive, setPostsIsActive] = useState(true);
	const [isSavedActive, setSavedIsActive] = useState(false);
	const showPosts = () =>{
		setPostsIsActive(true);
		setSavedIsActive(false);
	}

	const showSaved = () =>{
		setPostsIsActive(false);
		setSavedIsActive(true);
	}

	const userNotFound = !isLoading && !userProfile;
	if (userNotFound) return <UserNotFound />;

    return (
        <Container maxW='container.lg' py={5}>
            <Flex py={10} px={4} pl={{ base: 4, md: 10 }} w={"full"} mx={"auto"} flexDirection={"column"}>
                {isLoading && <ProfileHeaderSkeleton />}
                {!isLoading && userProfile && <ProfileHeader />}
            </Flex>
            <Flex
				px={{ base: 2, sm: 4 }}
				maxW={"full"}
				mx={"auto"}
				borderTop={"1px solid"}
				borderColor={"#5C8475"}
				direction={"column"}
			>
                <ProfileTabs  isPostsActive={isPostsActive} isSavedActive={isSavedActive} showPosts={showPosts} showSaved={showSaved}/>
                <ProfilePosts isPostsActive={isPostsActive} isSavedActive={isSavedActive} />
            </Flex>

        </Container>
    )
}

const ProfileHeaderSkeleton = () => {
	return (
		<Flex
			gap={{ base: 4, sm: 10 }}
			py={10}
			direction={{ base: "column", sm: "row" }}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<SkeletonCircle size='24' startColor='#5C8475' endColor='#113A3A'/>

			<VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
				<Skeleton height='12px' width='150px' startColor='#5C8475' endColor='#113A3A'/>
				<Skeleton height='12px' width='100px' startColor='#5C8475' endColor='#113A3A'/>
			</VStack>
		</Flex>
	);
};

const UserNotFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"}>
			<Text fontSize={"2xl"}>Utilisateur introuvable</Text>
			<Link as={RouterLink} to={"/"} 
            fontSize={12}
            fontWeight={"medium"}
            color={"#DFBC60"} 
            w={"max-content"} 
            mx={"auto"}>
				Retour
			</Link>
		</Flex>
	);
};