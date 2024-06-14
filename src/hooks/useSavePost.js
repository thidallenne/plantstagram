import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export default function useSavePost(postId){
    const authUser = useAuthStore((state) => state.user);
    const [isSaved, setIsSaved] = useState(authUser.savedPosts?.includes(postId))
    const showToast = useShowToast();

    const handleSavePost = async() =>{
        if(!authUser) return showToast('Erreur', 'Vous devez être connecté pour enregistrer une publication', "error");
        try {
            const currentUserRef = doc(firestore, "users", authUser.uid);
			await updateDoc(currentUserRef, {
				savedPosts: isSaved ? arrayRemove(postId) : arrayUnion(postId),
			});

			setIsSaved(!isSaved);
        } catch (error) {
            showToast('Erreur', error.message,'error');
        }
    }
    useEffect(() => {
        if(authUser){
            //const isSaved = authUser.savedPosts?.includes(postId);
			// setIsSaved(isSaved);
            //console.table(authUser)
        }
    },[authUser, postId]);
    return { isSaved, handleSavePost };
}
