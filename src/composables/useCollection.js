import { ref } from "vue"
import { projectFirestore } from "../firebase/config"

// Use collection from adding document function - must get collection name

// add User CK - Delete Me

const useCollection = (collection, id, collection2) => {

    // Initialize 'error' attribute
    const error = ref(null)
    const isPending = ref(false)

    // Add Doctument function - must gets document object
    const addDoc = async (doc) => {
        
        // Reset error vlue to null
        error.value = null
        isPending.value = true

        // Try to add the document to the collection
        try{
            // If doc id and inside collection parameter exist
            if(id && collection2) {
                const res = await projectFirestore.collection(collection).doc(id).collection(collection2).add(doc)
                isPending.value = false
                return res
            }
            // if document id exists
            else if(id) {
                const res = await projectFirestore.collection(collection).doc(id).set(doc)
                isPending.value = false
                return res
            }
            // if only a collection parameter exist
            else {
                const res = await projectFirestore.collection(collection).add(doc)
                isPending.value = false
                return res
            }
           
        }
        
        // Catch an error
        catch(err) {
            console.log(err.message)
            error.value = 'Could not send the message'
            isPending.value = false
        }
    }

    // Return the necessary attributes and functions
    return { error, addDoc, isPending }
}

// Export default
export default useCollection
