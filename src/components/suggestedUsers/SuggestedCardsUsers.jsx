import { Flex, VStack, Text, Button } from "@chakra-ui/react";
import SuggestedCardUser from "./SuggestedCardUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export default function SuggestedCardsUsers(){
    const [numberSuggested, setNumberSuggested] = useState(3);
    const [numberOfProfiles, setNumberOfProfiles]=useState();
    const {isLoading, suggestedUsers} = useGetSuggestedUsers(numberSuggested);
    


    useEffect(()=> {
        async function getDocumentCount() {
            const db = getFirestore();
            const collectionRef = collection(db, 'users');
            const querySnapshot = await getDocs(collectionRef);
            setNumberOfProfiles(querySnapshot.size);
        }
        getDocumentCount();
    },[])

    if (isLoading) return null;

    
    const handleSuggestions = () => {
        setNumberSuggested(prev => prev + 3);
    }

    


    
    return (
        <VStack py={8} px={6} gap={4}>
            {suggestedUsers.length !== 0  && (
                <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"} textAlign={'center'} mb={10}>
                    <Text fontSize={20} fontWeight={"bold"} color={"#DFBC60"} m={'0 auto'}>
                                Des profils qui pourraient vous intéresser !
                    </Text>
                </Flex>
            )}
            <Flex justifyContent={"space-between"}  flexWrap={"wrap"} w={"full"}>
                {suggestedUsers.map((user) => (
                    <SuggestedCardUser user={user} key={user.id} />
                ))}
            </Flex>
            { (numberOfProfiles > numberSuggested) && <Button onClick={handleSuggestions}>
                Voir davantage de profils
            </Button>  }
        </VStack>
    )
}