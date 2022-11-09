<!-- Template -->
<template>
  <!-- Navbar div class -->
  <div class="navbar-bs">
      <!-- Nav section -->
      <nav>
          <!-- Image logo -->
          <router-link :to="{ name: 'Home' }"><img src="@/assets/icon.png"></router-link> Test
          
          <!-- Links div vlass -->
          <div class="links">
              <!-- If user is logged in show relevance  -->
              <div v-if="user">
                  <Options />
              </div>
              
              <!-- Else - show 'Signup' and 'Login' buttons -->
              <div v-else>
                  <router-link class="btn" :to="{ name: 'Signup'}">הרשם</router-link>
                  <router-link class="btn" :to="{ name: 'Login'}">התחבר</router-link>
              </div>  
          </div>
      </nav>
  </div>

</template>

<!-- Script -->
<script>
// Imports
import getCollection from '@/composables/getCollection.js'
import { useRouter } from 'vue-router'
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import Options from '@/components/Options.vue'


// Export default
export default {

    components: { Options },

    // Setup
    setup() {

        // Initialize attributes
        const router = useRouter()
        const { logout, error, isPending } = useLogout()
        const { user } = getUser()
        
        // Handle click function for logout bottun
        const handleClick = async () => {
            // Logout the current user
            await logout()
            // Route to login page
            router.push({ name: 'Login'})
        }

    
        // Return necessary attributes and functions
        return { error, isPending, handleClick, user }
    }
}
</script>

<!-- Stype (Scoped - for this App.vue use only) -->
<style scoped>
    .navbar-bs {
        padding: 16px 10px;
        margin-bottom: 5px;
        background: white;
    }
    nav {
        display: flex;
        align-items: center;
        max-width: 1600px;
        margin: 0 auto;
    }
    nav h1 {
        margin-left: 20px;
    }
    nav .links {
        margin-left: auto;
    }
    nav .links a, button {
        margin-left: 20px;
        font-size: 14px;
    }
    nav img {
        max-height: 60px;
    }
    span {
        font-size: 14px;
        display: inline-block;
        margin-left: 16px;
        padding-left: 16px;
        border-left: 1px solid #eee;
    }
</style>