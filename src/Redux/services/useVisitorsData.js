// src/hooks/useVisitorsData.js
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

export default function useVisitorsData() {
  const [online, setOnline] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // 🔹 تتبع عدد الزوار الحاليين (Realtime)
    const unsubVisitors = onSnapshot(collection(db, "visitors"), (snapshot) => {
      setOnline(snapshot.size);
    });

    // 🔹 تتبع العدد الإجمالي (Realtime)
    const unsubStats = onSnapshot(doc(db, "stats", "main"), (docSnap) => {
      if (docSnap.exists()) {
        setTotal(docSnap.data().totalVisitors);
      }
    });

    // تنظيف عند إلغاء الاشتراك
    return () => {
      unsubVisitors();
      unsubStats();
    };
  }, []);

  return { online, total };
}
