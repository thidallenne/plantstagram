import { Input, InputGroup, InputRightElement, Button, Alert, AlertIcon } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import useSignUpWithEMailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

export default function Signup() {
    const [inputs, setInputs] = useState({
        email:'',
        password:'',
        fullName:"",
        username:"",
       });
    const [showPassword, setShowPassword] = useState(false);
    const {loading, error, signup } = useSignUpWithEMailAndPassword()
    return (
        <>
                <Input 
                    placeholder='Adresse email'
                    fontSize={14}
                    type='email'
                    size={'sm'}
                    value={inputs.email}
                    onChange={(e) => setInputs({...inputs, email:e.target.value})}
                    _focusVisible={{borderColor:'#fff'}}
                />
                <Input 
                    placeholder="Nom d'utilisateur"
                    fontSize={14}
                    type='text'
                    size={'sm'} 
                    value={inputs.username}
                    onChange={(e) => setInputs({...inputs, username:e.target.value})}
                    _focusVisible={{borderColor:'#fff'}}
                />
                <Input 
                    placeholder='Nom complet'
                    fontSize={14}
                    type='text'
                    size={'sm'} 
                    value={inputs.fullName}
                    onChange={(e) => setInputs({...inputs, fullName:e.target.value})}
                    _focusVisible={{borderColor:'#fff'}}
                />

                <InputGroup>
                    <Input 
                        placeholder='Mot de passe'
                        fontSize={14}
                        type={showPassword ? 'text' :  "password"}  
                        value={inputs.password}
                        size={'sm'}
                        onChange={(e) => setInputs({...inputs, password:e.target.value})}
                        _focusVisible={{borderColor:'#fff'}}
                    />
                    <InputRightElement h='full'>
                        <Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                    </InputRightElement>
                </InputGroup>

                {error && (
                    <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                        <AlertIcon fontSize={12} />
                        {error.message}
                    </Alert>
                )}
                <Button w={"full"} bg={'#DFBC60'} color={'#102626'} _hover={{bg: 'white'}} size={"sm"} fontSize={14}
                isLoading={loading} 
                onClick= {() => signup(inputs)}> 
                    S'inscrire
                </Button>
        </>
    )
}