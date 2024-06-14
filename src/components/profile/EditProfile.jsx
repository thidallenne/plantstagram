import {
	Avatar, Button, Center, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack,
} from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";
import { useState, useRef } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useEditProfile from "../../hooks/useEditProfile";

export default function EditProfile({isOpen, onClose}){
	const authUser = useAuthStore(state => state.user);
	const [inputs, setInputs]= useState({
		fullName:authUser.fullName,
        username:authUser.username,
		bio:authUser.bio,
	});
	const fileRef = useRef(null);

	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
	const { isUpdating, editProfile } = useEditProfile();
	const showToast = useShowToast();
	const handleEditProfile = async () => {
		try {
			await editProfile(inputs, selectedFile);
			setSelectedFile(null);
			onClose();
		} catch (error) {
			showToast("Erreur", error.message, "error");
		}
	};
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg={"#0f2626"} boxShadow={"xl"} border={"1px solid #5C8475"} mx={3}>
					<ModalHeader />
					<ModalCloseButton />
					<ModalBody>
						{/* Container Flex */}
						<Flex bg={"black"}>
							<Stack spacing={4} w={"full"} maxW={"md"} bg={"#0f2626"} p={6} my={0}>
								<Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
									Modifier le profil
								</Heading>
								<FormControl>
									<Stack direction={["column", "row"]} spacing={6}>
										<Center>
											<Avatar size='xl' src={selectedFile || authUser.profilePicURL} />
										</Center>
										<Center w='full'>
											<Button w='full' onClick={() => fileRef.current.click()}>Photo de profil </Button>
										</Center>
										<Input type="file" hidden ref={fileRef} onChange={handleImageChange}/>
										
									</Stack>
								</FormControl>

								<FormControl>
									<FormLabel fontSize={"sm"}>Nom complet</FormLabel>
									<Input placeholder={"Nom complet"} size={"sm"} type={"text"} 
									value={inputs.fullName} 
									onChange={(e) => setInputs({...inputs, fullName : e.target.value})}/>
								</FormControl>

								<FormControl>
									<FormLabel fontSize={"sm"}>Nom d'utilisateur</FormLabel>
									<Input placeholder={"Nom d'utilisateur"} size={"sm"} type={"text"} 
									value={inputs.username} 
									onChange={(e) => setInputs({...inputs, username : e.target.value})}/>
								</FormControl>

								<FormControl>
									<FormLabel fontSize={"sm"}>Bio</FormLabel>
									<Input placeholder={"Bio"} size={"sm"} type={"text"} 
									value={inputs.bio} 
									onChange={(e) => setInputs({...inputs, bio : e.target.value})}/>
								</FormControl>

								<Stack spacing={6} direction={["column", "row"]}>
									<Button
										bg={"whiteAlpha.200"}
										color={"white"}
										w='full'
										size='sm'
										onClick={onClose}
									>
										Annuler
									</Button>
									<Button
										bg={"#DFBC60"}
										color={"#102626"}
										size='sm'
										w='full'
										_hover={{ bg: "white" }}
										onClick={handleEditProfile}
										isLoading={isUpdating}
									>
										Sauvegarder
									</Button>
								</Stack>
							</Stack>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
