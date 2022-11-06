import { ref } from "vue"
import { projectAuth } from "../firebase/config"

// Initialize user value
// If logged in already the its get the current user value
// Else is will be NULL
const user = ref(projectAuth.currentUser)

// A listener for any change with the user auth
projectAuth.onAuthStateChanged(_user => {
    user.value = _user
})

// getUser function to return the user
const getUser = () => {
    return { user }
}

// Export default
export default getUser