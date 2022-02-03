import { getDocs, query, collection } from "firebase/firestore";
import { db } from "../base";
export default async function getEverything(q) {
    const querySnapshot = await getDocs(q);
    var contentArray = []
    querySnapshot.forEach(doc => {
        contentArray.push(doc);
    });
    return contentArray;
}