import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export default function useFollowUser(userId){
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
    const { userProfile, setUserProfile } = useUserProfileStore();
    const showToast = useShowToast();

    const handleFollowUser = async () => {
        try {
            const currentUserRef = doc(firestore, "users", authUser.uid);
			const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

            //MAJ Firebase
            //Ajoute ou supprime le profil aux abonnements sur firebase   
            await updateDoc(currentUserRef, {
				following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
			});
            //Ajoute ou supprime le profil aux abonnées sur firebase
            await updateDoc(userToFollowOrUnfollowRef, {
				followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
			});

            //MAJ State
            if (isFollowing){
                //Désabonnement
                setAuthUser({
					...authUser,
					following: authUser.following.filter((uid) => uid !== userId),
				});
                if (userProfile){
                    setUserProfile({
                        ...userProfile,
                        followers: userProfile.followers.filter((uid) => uid !== authUser.uid),
                    });
                }

                localStorage.setItem(
                    "user-info",
                    JSON.stringify({
                        ...authUser,
                        following: authUser.following.filter((uid) => uid !== userId),
                    })
                );
                setIsFollowing(false);
            } else{
                // Abonnement
				setAuthUser({
					...authUser,
					following: [...authUser.following, userId],
				});

				if (userProfile){
					setUserProfile({
						...userProfile,
						followers: [...userProfile.followers, authUser.uid],
					});
                }

				localStorage.setItem(
					"user-info",
					JSON.stringify({
						...authUser,
						following: [...authUser.following, userId],
					})
				);
				setIsFollowing(true);
            }

            
        } catch (error) {
            showToast("Erreur", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    }

    useEffect(() => {
        if(authUser){
            const isFollowing = authUser.following.includes(userId);
			setIsFollowing(isFollowing);
        }
    },[authUser, userId]);
    return { isUpdating, isFollowing, handleFollowUser };
}