import { ref, watchEffect } from "vue"
import { projectFirestore } from "../firebase/config"

// Get collection function - must get a collection name to work with
const getCollection = (collection, id, collection2, quary) => {

    // Initialize document and error attributes
    const documents = ref(null)
    const error = ref(null)

    // Initialize collection reference attribute in order by 'createdAt' value
    let collectionRef = projectFirestore.collection(collection)

    // To get a collection inside a document
    if(id && collection2) {
        if(collection2 == 'notifications'){
            collectionRef = projectFirestore.collection(collection).doc(id).collection(collection2).orderBy('createdAt', 'desc')
        }
        else {
            collectionRef = projectFirestore.collection(collection).doc(id).collection(collection2).orderBy('date')
    
        }
    }

    if(quary) {
        collectionRef = collectionRef.where(...quary)
    }

    // Set a listener to the current collection using onSnapshot 
    const unsub = collectionRef.onSnapshot((snap) => {

        // Initialize result array to store the documents result
        let results = []

        // Loop forEach over the collection 
        snap.docs.forEach(doc => {

            // For each document get the data and check if 'createdAt' value is exists
            // If true add the current doc and its own id to the results array
            let msg = {
                id: doc.id,
                ...doc.data()
            }
            results.push(msg)
        })

        // At the end of the loop store the result in document and error attributes
        documents.value = results
        error.value = null 
    }, 
    
    // If error catched, print the error, reset documents array to null and set an error message value
    (err) => {
        console.log(err.message)
        documents.value = null
        error.value = 'Could not fetch data'
    })

    // Unsubbscribe onSnapshot listener when needed
    watchEffect((onInvalidate) => {
        onInvalidate(() => {
            unsub()
        })
    })

    // Return necessary attributes
    return { error, documents }
}

// Export default
export default getCollection