import { Flex, VStack, Text, AvatarGroup, Avatar, Button, useDisclosure } from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";
import FollowingModal from "../modals/FollowingModal";
import FollowersModal from "../modals/FollowersModal";

export default function ProfileHeader() {
	const {userProfile} = useUserProfileStore();
	const authUser = useAuthStore(state => state.user);
	const {isFollowing, isUpdating, handleFollowUser} = useFollowUser(userProfile?.uid);

	const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
	const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;
	
	// Modal Edition Profil
	const { isOpen, onOpen, onClose } = useDisclosure();
		// Modal Abonnement
	const { isOpen: followersModalIsOpen, onOpen: followersModalOnOpen, onClose: followersModalOnClose } = useDisclosure();
	// Modal Abonnement
	const { isOpen: followingModalIsOpen, onOpen: followingModalOnOpen, onClose: followingModalOnClose } = useDisclosure();

    return (
        <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
        <AvatarGroup size={{ base: "xl", md: "2xl" }} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
			<Avatar src={userProfile.profilePicURL} alt={userProfile.username} />
		</AvatarGroup>
        <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
				<Flex
					gap={4}
					direction={{ base: "column", sm: "row" }}
					justifyContent={{ base: "center", sm: "flex-start" }}
					alignItems={"center"}
					w={"full"}
				>
					<Text fontSize={{ base: "sm", md: "lg" }}>
					{userProfile.username}
                    </Text>
					{visitingOwnProfileAndAuth && (
							<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
							<Button
									bg={"#DFBC60"}
									color={"#102626"}
									_hover={{ bg: "white" }}
									size={{ base: "xs", md: "sm" }}
									onClick={onOpen}
								>
									Modifier le profil
							</Button>
						</Flex>
						)
					}
					{visitingAnotherProfileAndAuth && (
							<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
																
								<Button
										bg={isFollowing ?  "transparent" : "#DFBC60" }
										border={ isFollowing ?  "1px solid #DFBC60" : "1px solid #DFBC60"}
										color={ isFollowing ? "#DFBC60" : "#102626"}
										_hover={isFollowing ? { bg: "white", color: "#102626", border:'1px solid white' } : { bg: "white", border:'1px solid white' }}
										size={{ base: "xs", md: "sm" }}
										onClick={handleFollowUser}
										isLoading={isUpdating}
									>
										{isFollowing ? "Se désabonner" : "S'abonner"}
								</Button>
						</Flex>
						)
					}
				</Flex>
				<Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
					<Text fontSize={{ base: "xs", md: "sm" }}>
						<Text as='span' fontWeight={"bold"} mr={1}>
						{userProfile.posts.length}
						</Text>
						{ userProfile.posts.length > 1 ? "Publications" : "Publication"}
					</Text>
					<Text fontSize={{ base: "xs", md: "sm" }} onClick={followersModalOnOpen}>
						<Text as='span' fontWeight={"bold"} mr={1}>
						{userProfile.followers.length}
						</Text>
                        {userProfile.followers.length > 1 ? "Abonné·es" :"Abonné·e"}
					</Text>
					<Text fontSize={{ base: "xs", md: "sm" }} onClick={followingModalOnOpen}>
						<Text as='span' fontWeight={"bold"} mr={1}>
						{userProfile.following.length}
						</Text>
						{userProfile.following.length > 1 ? "Abonnements" : "Abonnement"}
					</Text>
				</Flex>
				<Flex alignItems={"center"} gap={4}>
					<Text fontSize={"sm"} fontWeight={"bold"}>
					{userProfile.fullName}
					</Text>
				</Flex>
				<Text fontSize={"sm"}>{userProfile.bio}</Text>
			</VStack>
			{isOpen && <EditProfile isOpen={isOpen} onClose={onClose}/>}
			{followersModalIsOpen && <FollowersModal followersModalIsOpen={followersModalIsOpen} followersModalOnClose={followersModalOnClose} creatorProfile={userProfile}/>}
			{followingModalIsOpen && <FollowingModal followingModalIsOpen={followingModalIsOpen} followingModalOnClose={followingModalOnClose} creatorProfile={userProfile}/>}
    </Flex>
    )
}