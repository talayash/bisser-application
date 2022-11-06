import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

// Use decument for delete, edit etc a single document
const useDocument = (collection, id, collection2, id2) => {

    // Initialize error and isPending attributes
    const error = ref(null)
    const isPending = ref(false)

    // Initialize document reference to the collection and document id parameters
    let docRef = projectFirestore.collection(collection).doc(id)

    if(collection2 && id2) {
        docRef = projectFirestore.collection(collection).doc(id).collection(collection2).doc(id2)
    }

    // Delete documnet function
    const deleteDoc = async () => {
        // Set isPending true and error null
        isPending.value = true
        error.value = null 
        
        // Try to delete the document
        try{
            const res = await docRef.delete()
            isPending.value = false
            return res

        }
        // Catch error
        catch(err){
            console.log(err.message)
            isPending.value = false
            error.value = 'Could not delete the document'
        }
    }

    // Update document
    const updateDoc = async (updates) => {
        // Set isPending true and error null
        isPending.value = true
        error.value = null 
        
        // Try to update the document
        try{
            const res = await docRef.update(updates)
            isPending.value = false
            return res

        }
        // Catch error
        catch(err){
            console.log(err.message)
            isPending.value = false
            error.value = 'Could not update the document'
        }
    }

    // Return necessary attributes and functions
    return { error, isPending, deleteDoc, updateDoc }
}

// Export default
export default useDocument