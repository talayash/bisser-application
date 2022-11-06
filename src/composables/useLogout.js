import { ref } from "vue"
import { projectAuth } from "../firebase/config"

// Error attributes
const error = ref(null)
const isPending = ref(false)

// logout function
const logout = async () => {
    
    // Reset the error 
    error.value = null
    isPending.value = true

    // Try to logout the user
    try {
        // Logout using build-in firebase function uding project auth
        await projectAuth.signOut()
        isPending.value = false
    }

    // Catch error
    catch(err) {
        // Print error to console and set error value
        console.log(err.message)
        error.value = err.message
        isPending.value = false
    }

}

// useLogout class function
// return the error object and the logout function
const useLogout = () => {
    return {logout, error, isPending}
}

// Export default
export default useLogout