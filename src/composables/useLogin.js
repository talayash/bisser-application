import { ref } from "vue"
import { projectAuth } from "../firebase/config"

// Error & isPending attributes
const error = ref(null)
const isPending = ref(false)

// Login function
const login = async (email, password) => {
    // Set error as null and isPending true
    error.value = null
    isPending.value = true

    // Try to login using firebase build-in function with email and password
    try{
       // Initialize response object 'res' and do the login check
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
        
        // If the login success st the error null again
        error.value = null
        isPending.value = false
        
        // Return the response
        return res

    }
    // Catch error
    catch(err){
        // Print the error to console and set an error message
        console.log(err.value)
        error.value = 'Incorrect login credentials'
        isPending.value = false
    }

}

// useLogin class function
// return the error object and the login function
const useLogin = () => {
    return { error, login, isPending } 
}

// Export default
export default useLogin