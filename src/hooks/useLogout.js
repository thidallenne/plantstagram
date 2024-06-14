import { auth } from "../firebase/firebase";
import {useSignOut} from 'react-firebase-hooks/auth'
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

export default function useLogout() {
    const [signOut, isLoggingOut, error] = useSignOut(auth);
    const showToast = useShowToast()
    const logoutUser= useAuthStore((state) => state.logout);
    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem('user-info');
            logoutUser();
        } catch (error) {
            showToast("Erreur", error.message, "error");
        }
    }

    return {handleLogout, isLoggingOut, error};
}