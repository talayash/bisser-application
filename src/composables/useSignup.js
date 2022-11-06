import { ref } from "vue"
import { projectAuth } from "../firebase/config"

// Error attributes
const error = ref(null)
const isPending = ref(false)

// Sign up function, gets email, password and display name and create the user auth
const signup = async (email, password, displayName) => {
    // Set error to null
    error.value = null
    isPending.value = true

    // Try to create a new user auth
    try{
        // create a response with build-in function to create new user auth and wait until it end
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)

        // Check if there is error by check the 'res' object value
        if(!res){
            // If and error exists throw new error
            throw new Error('Could not compltete the signup.')
        }
        
        // Finnaly - add the another user attributes to the current user and reset the error to null
        await res.user.updateProfile({ displayName })
        error.value = null
        isPending.value = false

        // Return response 'res' object
        return res
    }
    
    // Catch if there is an error
    catch(err){
        console.log(err.message)
        error.value = err.message
        isPending.value = false
    }
}

// useSignup function that return the errur value and the signup function
const useSignup = () => {
    return { error, signup, isPending } 
}

export default useSignup