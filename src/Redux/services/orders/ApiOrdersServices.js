import { addDoc, collection, getDocs, serverTimestamp, doc, getDoc  } from "firebase/firestore";
import { apiServices } from "../Apisl/SpiltApi";
import { db } from "../../../Firebase/firebase";

export const ordersTag = apiServices.enhanceEndpoints({
    addTagTypes:["Orders"]
})

export const OrderApi = ordersTag.injectEndpoints({
    endpoints:(builder) => ({
      saveOrders:builder.mutation({
        queryFn: async (order) => {
            const completeOrder = {
                ...order,
                createdAt: serverTimestamp(),
            };
            try {
                   const docRef = collection(db,"orders");
           await addDoc(docRef, completeOrder)
                
           return {data:"ok"}
            }catch(error){
                return {error}
            }
        },
        invalidatesTags: ["Orders"],
      }),
      getOrders:builder.query({
        queryFn:async () => {
                   try{
                const Ref = collection(db,"orders")

                const data = await getDocs(Ref)

                 const product = data?.docs.map((doc) => ({
                  ...doc.data(),
                  id:doc.id
                 }))
                 return {data:product}
        }catch(error){
          return {error}
        }
        },
        providesTags: ["Orders"],
      }),
      getOrderById: builder.query({
        queryFn: async (orderId) => {
            try {
                const docRef = doc(db, "orders", orderId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return { data: { ...docSnap.data(), id: docSnap.id } };
                } else {
                    return { error: { message: "No such document!" } };
                }
            } catch (error) {
                return { error };
            }
        },
        providesTags: (result, error, id) => [{ type: 'Orders', id }],
    }),
  
    })
})

export const {useSaveOrdersMutation, useGetOrdersQuery, useGetOrderByIdQuery} = OrderApi;