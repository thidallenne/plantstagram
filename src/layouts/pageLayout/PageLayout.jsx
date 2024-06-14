import { Box, Flex, Spinner } from "@chakra-ui/react";
import Sidebar from "../../components/sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/navbar/Navbar";


export default function PageLayout({ children }){
	const { pathname } = useLocation();
	const [user, loading] = useAuthState(auth);
	const canRenderSidebar = pathname !== "/auth" && user;
	const canRenderNavbar = !user && !loading && pathname !== "/auth";

	const checkingUserIsAuth = !user && loading;

	if( checkingUserIsAuth) {
		return <PageLayoutSpinner />
	}


	return (
		<Flex flexDir={canRenderNavbar ? "column" : "row"}>
			{canRenderSidebar ? (
				<Box w={{ base: "50px", md: "240px" }}>
					<Sidebar />
				</Box>
			) : null}
			{canRenderNavbar ? <Navbar /> : null}
			<Box flex={1} w={{ base: "calc(100% - 40px)", md: "calc(100% - 240px)" }} mx={"auto"}>
				{children}
			</Box>
		</Flex>
	);
};

const PageLayoutSpinner = () => {
	return (
		<Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Spinner size='xl' />
		</Flex>
	);
};