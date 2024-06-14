import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export default function useGetFeedPosts(){
    const [isLoading, setIsLoading] = useState(true);
    const {posts, setPosts} = usePostStore();
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();
    const {setUserProfile} = useUserProfileStore();

    useEffect(() => {
        const getFeedPosts = async() => {
            setIsLoading(true);
			if (authUser.following.length === 0) {
				setIsLoading(false);
				setPosts([]);
				return;
			}
            const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following));
            try {
                const querySnapshot = await getDocs(q);
				const feedPosts = [];

				querySnapshot.forEach((doc) => {
					feedPosts.push({ id: doc.id, ...doc.data() });
				});

				feedPosts.sort((a, b) => b.createdAt - a.createdAt);
				setPosts(feedPosts);
            } catch (error) {
                showToast('Erreur', error.message, 'error');
            } finally {
                setIsLoading(false);
            }
        }
        if (authUser) getFeedPosts();
    },[authUser, showToast, setPosts, setUserProfile]);
    return { isLoading, posts };
}