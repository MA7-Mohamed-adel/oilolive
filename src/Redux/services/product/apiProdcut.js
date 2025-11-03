
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { apiServices } from "../Apisl/SpiltApi";
import { db, storage } from "../../../Firebase/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const producttag = apiServices.enhanceEndpoints({
  addTagTypes: ["product","products"],
});

export const ProductApi = producttag.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      async queryFn({ productData, imageFile }) {
        try {
          const key = doc(collection(db, "products")).id;


          const storageRef = ref(storage, `products/${key}_${imageFile.name}`);

          const snapshot = await uploadBytes(storageRef, imageFile);

          const downloadURL = await getDownloadURL(snapshot.ref);

          const finalProductData = {
            ...productData,
            image: downloadURL,
            createdAt: serverTimestamp(),
          };

          const docRef = doc(db, "products", key);
          await setDoc(docRef, finalProductData);

          return { data: { id: key, ...finalProductData } };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: ["product"],
    }),
    getProducts: builder.query({
      async queryFn() {
        try {
          const productsCollection = collection(db, "products");
          const q = query(productsCollection, orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(q);
          const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          return { data: products };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["product","products"],
    }),
    getProductById: builder.query({
      async queryFn(id) {
        try {
          const docRef = doc(db, "products", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            return { data: { id: docSnap.id, ...docSnap.data() } };
          } else {
            return { error: { message: "No such document!" } };
          }
        } catch (error) {
          return { error };
        }
      },
     providesTags:["product","products"]
     }),
    updateProduct: builder.mutation({
      async queryFn({ id, updatedProduct, newImageFile, oldImageUrl }) {
        try {
          let imageUrl = oldImageUrl;
          if (newImageFile) {
            // Delete old image if it exists
            if (oldImageUrl) {
              const oldImageRef = ref(storage, oldImageUrl);
              await deleteObject(oldImageRef).catch(err => console.warn("Old image deletion failed, may not exist", err));
            }
            // Upload new image
            const newImageRef = ref(storage, `products/${Date.now()}_${newImageFile.name}`);
            const uploadResult = await uploadBytes(newImageRef, newImageFile);
            imageUrl = await getDownloadURL(uploadResult.ref);
          }
          const docRef = doc(db, "products", id);
          await updateDoc(docRef, { ...updatedProduct, image: imageUrl });
          return { data: { id, ...updatedProduct, image: imageUrl } };
        } catch (error) {
          return { error };
        }
      },
     invalidatesTags:["product","products"]
    }),
    deleteProduct: builder.mutation({
      async queryFn({ id, image }) {
        try {
          // 1. Delete image from Firebase Storage
          if (image) {
            const imageRef = ref(storage, image);
            await deleteObject(imageRef);
          }
          // 2. Delete document from Firestore
          await deleteDoc(doc(db, "products", id));
          return { data: { id } };
        } catch (error) {
          return { error };
        }
      },
   invalidatesTags:["product","products"]
    }),
  }),
});

export const { useCreateProductMutation, useGetProductsQuery, useGetProductByIdQuery, useUpdateProductMutation, useDeleteProductMutation } = ProductApi;
