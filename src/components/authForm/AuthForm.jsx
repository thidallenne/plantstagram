import { Box, VStack, Image, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import GoogleAuth from "./GoogleAuth";

export default function AuthForm(){

    const [isLogin, setIsLogin] = useState(true);

  return (
    <>
        <Box border={"1px solid #93B1A6"} borderRadius={4} padding={5}>
            <VStack spacing={4}>
                <Image src="/logo.png" w={200} alt="plantstagram" cursor={"pointer"}/>

                { isLogin ? <Login /> : <Signup/>}

                <Flex alignItems={'center'} justifyContent={'center'} my={4} gape={1} width={'full'}>
                    <Box flex={2} h={'1px'} bg={'gray'}/>
                    <Text mx={2}>
                        OU
                    </Text>
                    <Box flex={2} h={'1px'} bg={'gray'}/>
                </Flex>
                <GoogleAuth prefix={isLogin ? "Se connecter" : "S'inscrire"}/>
            </VStack>
        </Box>
        <Box border={'1px solid #93B1A6'} borderRadius={4} padding={5}>
            <Flex alignItems={"center"} justifyContent={'center'}>
                <Box mx={2} fontSize={14}>
                    {isLogin ? "Pas de compte ?" : "Inscrit ?"}
                </Box>
                <Box onClick={() => setIsLogin(!isLogin)} fontSize={14} color={'#DFBC60'} _hover={{color: 'white'}} cursor={"pointer"} >
                    {isLogin ? "S'inscrire" : "Se connecter"}
                </Box>
            </Flex>
        </Box>
    </>
  )
}
