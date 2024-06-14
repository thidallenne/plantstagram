import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { collection, where, orderBy, query, limit, getDocs } from "firebase/firestore";

export default function useGetSuggestedUsers(numberSuggested){
    const [isLoading,setIsLoading]= useState(true);
    const [suggestedUsers, setSuggestedUsers]= useState([]);
    const authUser= useAuthStore(state => state.user);
    const showToast = useShowToast();
    useEffect(() => {
        const getSuggestedUsers = async () => {
            setIsLoading(true);
            try {
                const usersRef = collection(firestore, "users");
                const q = query(
					usersRef,
					where("uid", "not-in", [authUser.uid, ...authUser.following]),
					orderBy("uid"),
					limit(numberSuggested)
				);

                const querySnapshot = await getDocs(q);
                const users = [];

				querySnapshot.forEach((doc) => {
					users.push({ ...doc.data(), id: doc.id });
				});

				setSuggestedUsers(users);
                
            } catch (error) {
                showToast("Erreur", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        }
        if (authUser) getSuggestedUsers();
    },[authUser, showToast, numberSuggested]);
    return { isLoading, suggestedUsers };
};