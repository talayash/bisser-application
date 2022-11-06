import { ref } from '@vue/reactivity'
import { projectStorage } from '../firebase/config'
import getUser from './getUser'

// Get current user
const { user } = getUser()

// Use storage
const useStorage = () => {
    
    // Attrbiutes
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    // Upload image function
    const uploadImage = async (file) => {
        // Set the filePath on 'covers' folder with current user id and file name
        filePath.value = `covers/${user.value.uid}/${file.name}`
        // Get the reference to the current file path
        const storageRef = projectStorage.ref(filePath.value)
        
        // Try uploading the image and get url
        try{
            // Get response object using storage reference and put the file in
            const res = await storageRef.put(file)
            // Set up the response download url from firebase storage
            url.value = await res.ref.getDownloadURL()

        }
        // Catch error
        catch(err){
            console.log(error.messsage)
            error.value = err.message
        }
    }

    // Delete image function
    const deleteImage = async (path) => {
        // Initialize a storage reference with the image path
        const storageRef = projectStorage.ref(path)
        
        // Try to delete the image from the storage
        try{
            await storageRef.delete()

        }
        // Catch an error
        catch(err){
            console.log(err.message)
            error.value = err.message
        }
    }

    // Return necessary attributes and functions
    return { url, filePath, error, uploadImage, deleteImage }
}

// Export default
export default useStorage