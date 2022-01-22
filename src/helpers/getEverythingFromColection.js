import { getDocs, query, collection } from "firebase/firestore";
import { db } from "../base";
export default async function getEverything(dataBaseCollection, whereClause) {
    const q = query(collection(db, dataBaseCollection), whereClause);
    const querySnapshot = await getDocs(q);
    var contentArray = []
    querySnapshot.forEach(doc => {
        contentArray.push(doc.data());
    });
    return contentArray;
}