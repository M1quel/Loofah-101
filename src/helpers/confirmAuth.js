import { getAuth } from "firebase/auth";

export default function confirmAuth(callback) {
    const auth = getAuth();
    if (auth.currentUser?.uid) {
        return true;
    } else {
        return false;
    }
}