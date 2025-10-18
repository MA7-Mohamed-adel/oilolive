import { useEffect } from "react";
import { doc, setDoc, deleteDoc, getDoc, updateDoc, increment } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../Firebase/firebase";

export default function useVisitor() {
  useEffect(() => {
    // 🔹 تحقق إذا الزائر له ID محفوظ في sessionStorage
    let visitorId = sessionStorage.getItem("visitorId");

    if (!visitorId) {
      visitorId = uuidv4();
      sessionStorage.setItem("visitorId", visitorId);

      // أول مرة يزور الموقع => زائر جديد
      setDoc(doc(db, "visitors", visitorId), {
        enteredAt: new Date(),
      });

      // زود العدد الكلي للزوار
      const statsRef = doc(db, "stats", "main");
      getDoc(statsRef).then((docSnap) => {
        if (docSnap.exists()) {
          updateDoc(statsRef, { totalVisitors: increment(1) });
        } else {
          setDoc(statsRef, { totalVisitors: 1 });
        }
      });
    } else {
      // لو الزائر رجع بعد reload في نفس الجلسة — بس نحدث الوقت
      setDoc(doc(db, "visitors", visitorId), { enteredAt: new Date() }, { merge: true });
    }

    // 🔹 لما يقفل الصفحة نحذفه من قائمة الزوار الحاليين
    const handleUnload = () => {
      deleteDoc(doc(db, "visitors", visitorId));
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      deleteDoc(doc(db, "visitors", visitorId));
    };
  }, []);
}
