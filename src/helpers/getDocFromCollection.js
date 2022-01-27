import { doc, getDoc} from "firebase/firestore";
import { db } from "../base";


export default async function getDocFromCollection(collection, document) {
    const docRef = doc(db, collection, document);
    var docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return;
    }

};