<template>
  
  <div class="form-style">
    <h5>Hello {{ user.displayName }}</h5>
    <h6>Your email: {{ user.email }}</h6>
    <button @click="handleClick">Logout</button>
  </div>

</template>


<script>
// Imports
import getUser from '@/composables/getUser'
import useLogout from '@/composables/useLogout'
import { useRouter } from 'vue-router'


export default {
  
  // Setup function
  setup() {

    // Get current user
    const { user } = getUser()

    // Initialize logout function
    const { logout, error, isPending } = useLogout()

    // Initialize router
     const router = useRouter()

    // Handle click function for logout bottun
    const handleClick = async () => {
        // Logout the current user
        await logout()
        
        // Route to login page
        router.push({ name: 'Login'})
    }

    return { user, handleClick }
  }
}
</script>

<style>
    .form-style {
        max-width: 600px;
        margin: 0 auto;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
        border: 1px solid  var(--secondary);
        background: white;
  }
</style>