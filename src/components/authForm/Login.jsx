import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

export default function Login() {

    const [inputs, setInputs] = useState({
        email:'',
        password:'',
       });

       const { loading, error, login } = useLogin();

    return (
        <>
                <Input 
                    placeholder='Adresse Email'
                    fontSize={14}
                    size={'sm'} 
                    value={inputs.email}
                    onChange={(e) => setInputs({...inputs, email:e.target.value})}
                    _focusVisible={{borderColor:'#fff'}}
                />
                <Input 
                    placeholder='Mot de passe'
                    fontSize={14}
                    size={'sm'}
                    type="password"  
                    value={inputs.password}
                    onChange={(e) => setInputs({...inputs, password:e.target.value})}
                    _focusVisible={{borderColor:'#fff'}}
                />
                {error && (
                    <Alert status='error' fontSize={13} p={2} maxW={300} borderRadius={4}>
                        <AlertIcon fontSize={12} />
                        {error.message}
                    </Alert>
                )}
                <Button w={"full"} bg={'#DFBC60'} color={'#102626'} _hover={{bg: 'white'}} size={"sm"} fontSize={14} isLoading={loading} onClick={() => login(inputs)}> 
                    Se connecter
                </Button>
        </>
    )
}