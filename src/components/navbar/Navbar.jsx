import { Button, Container, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<Container maxW={"container.lg"} my={4}>
			<Flex w={"full"} justifyContent={{ base: "center", sm: "space-between" }} alignItems={"center"}>
				<Image src='/logo.png' h={10} display={{ base: "none", sm: "block" }} cursor={"pointer"} />
				<Flex gap={4}>
					<Link to='/auth'>
						<Button w={"full"} bg={'#DFBC60'} color={'#102626'} _hover={{bg: 'white'}} size={"sm"} fontSize={14}>
							Se connecter
						</Button>
					</Link>
					{/* <Link to='/auth'>
						<Button variant={"outline"} size={"sm"}>
							S'inscrire
						</Button>
					</Link> */}
				</Flex>
			</Flex>
		</Container>
	);
};

export default Navbar;