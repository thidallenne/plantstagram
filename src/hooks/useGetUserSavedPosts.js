import { useEffect, useState } from "react";
//import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
//import useAuthStore from "../store/authStore";
//import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, getFirestore} from "firebase/firestore";
//import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";

export default function useGetSavedUserPosts(){
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();
    console.log(savedPosts);
    useEffect(() => {
        const getSavedPosts = async() =>{
            try {
                const db = getFirestore();

                // Référence à la sous-collection savedPosts pour l'utilisateur spécifique
                const savedPostsRef = collection(db, `users/${authUser.id}/savedPosts`);
              
                // Récupérer tous les documents dans la sous-collection
                const querySnapshot = await getDocs(savedPostsRef);
              
                // Traiter les documents récupérés
                const savedPosts = querySnapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data()
                }));
                return savedPosts;
            } catch (error) {
                showToast("Erreur", error.message, "error");
            }
        }
    },[authUser, showToast]);
    console.log(savedPosts);
    return { savedPosts };
}