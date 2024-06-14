import { Flex, Container, Box, Link, Image, VStack } from "@chakra-ui/react";
import AuthForm from "../../components/authForm/AuthForm";
import { Link as RouterLink} from "react-router-dom";

export default function Auth(){
  return (
    <>
    <Container pos="absolute" top="15px" left="0">
      <Link to={`https://thibauld-dallenne.com/`} as={RouterLink}>
          <Image src="/thibauld-dallenne.png" h={50} alt="Thibauld DALLENNE" />
      </Link>
    </Container>
      <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>

        <Container maxW={"container.md"} padding={0}>
          <Flex justifyContent={'center'} alignItems={'center'} gap={10}>
            { /* Visuel*/} 
            <Box display={{base:"none", md:"block"}}>
              <Image src="/authphone.png" h={650} alt="phone image" />
            </Box>
          { /* Formulaire*/} 
            <VStack spacing={4} align={"stretch"}>
              <AuthForm />
              <Box textAlign={'center'} >
                Télécharger l'application
              </Box>
              <Flex gap={5} justifyContent={'center'}>
                <Image src="/playstore.png" h={10} alt="playstore logo" />
                <Image src="/microsoft.png" h={10} alt="microsoft logo" />
              </Flex>
            </VStack>
          </Flex>
        </Container>
      </Flex>
    </>
  )
}
