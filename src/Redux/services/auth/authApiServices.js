import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../../Firebase/firebase";
import {  collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { apiServices } from "../Apisl/SpiltApi";



export const apiServicesTag = apiServices.enhanceEndpoints({
    addTagTypes: ["auth", "Users"]
})

export const authServices = apiServicesTag.injectEndpoints({
    endpoints:(builder) => ({
        login:builder.mutation({
            queryFn: async (data) => {
                try{
                      const {email,password} = data

                      await signInWithEmailAndPassword(auth,email,password)
                        
                      return {data:"ok"}
                }catch(error){
                    return {error}
                }
            }
        }),
        signup: builder.mutation({
            queryFn: async (data) => {
                try {
                    const { email, password, name } = data;
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const userId = userCredential.user.uid;

                    const userDocRef = doc(db, "users", userId);
                    const userObject = {
                        name,
                        email,
                        role: "user",
                    };
                    await setDoc(userDocRef, userObject);

                    return { data: "ok" };
                } catch (error) {
                    return { error };
                }
            }
        }),
        googleAuth:builder.mutation({
            queryFn: async () => {
            try {
          await signInWithPopup(auth, provider);
          return { data: "ok" };
        } catch (error) {
          return { error };
        }
            }
        }),
        getAuthUser:builder.query({
            queryFn: async (user) => {
                try{
                 const provider = user.providerData[0].providerId;

          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);

          const userData = userDoc.data();

          if (userData) {
            return { data: userData };
          } else if (provider === "google.com" && !userData) {
            const userDore = {
              fullname: user.displayName ? user.displayName  : "user" ,
              email: user.email,
              id: user.uid,
              role: "user",
            };
            await setDoc(userRef,userDore)
            return {data:userDore}
          }
                }catch(error){
                    return {error}
                }
            }
        }),
        getUsers: builder.query({
            queryFn: async () => {
                try {
                    const usersCollectionRef = collection(db, "users");

                    const querySnapshot = await getDocs(usersCollectionRef);

                    const usersList = querySnapshot?.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    return { data: usersList };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: ["Users"],
        }),
    })
})

export const {useLoginMutation, useSignupMutation, useGoogleAuthMutation,useGetAuthUserQuery, useGetUsersQuery} = authServices