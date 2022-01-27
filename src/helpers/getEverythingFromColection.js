import { getDocs, query, collection } from "firebase/firestore";
import { db } from "../base";
export default async function getEverything(dataBaseCollection, whereClause) {
    var q;
    if (typeof whereClause != "undefined") {
        q = query(collection(db, dataBaseCollection), whereClause);
    } else {
        q = collection(db, dataBaseCollection);
    }
    const querySnapshot = await getDocs(q);
    var contentArray = []
    querySnapshot.forEach(doc => {
        contentArray.push(doc);
    });
    return contentArray;
}