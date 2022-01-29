import { getDocs, query, collection } from "firebase/firestore";
import { db } from "../base";
export default async function getEverything(dataBaseCollection, whereClause, whereClause2) {
    var q;
    if (typeof whereClause != "undefined") {
        if (typeof whereClause2 != "undefined") {
            q = query(collection(db, dataBaseCollection), whereClause, whereClause2);
        } else {
            q = query(collection(db, dataBaseCollection), whereClause);
        }
    } else {
        q = collection(db, dataBaseCollection);
    }
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs);
    var contentArray = []
    querySnapshot.forEach(doc => {
        contentArray.push(doc);
    });
    return contentArray;
}