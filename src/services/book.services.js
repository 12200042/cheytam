import { db } from "../firebase-config";

import { collection, getDocs, getDoc,addDoc,updateDoc,deleteDoc, doc } from "firebase/firestore";


const cheytamCollectionRef = collection(db, "Cheytam");
class CheytamDataService {
    addCheytam = (newCheytam) => {
        return addDoc(cheytamCollectionRef, newCheytam);
    };

    updateCheytam = (id, updatedCheytam) => {
        const cheytamDoc =doc(db, "Cheytam", id);
        return updateDoc(cheytamDoc, updateCheytam);
    };

    deleteCheytam = (id) => {
        const cheytamDoc = doc(db, "Cheytam", id);
        return deleteDoc(cheytamDoc);
    };

    getAllCheytams = () => {
        return getDocs(cheytamCollectionRef);
    };

    getCheytam = (id) => {
        const  cheytamDoc = doc(db, "Cheytam" ,id);
        return getDoc(cheytamDoc);
    };
}
export default new CheytamDataService();