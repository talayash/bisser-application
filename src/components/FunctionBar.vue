<!-- Template  -->
<template>
 <!-- Navbar div class -->
  <div class="navbar-bs">
      <!-- Nav section -->
      <nav>          
          <!-- Links div vlass -->
          <div class="links">
              <!-- If user is logged in show 'Logout' and other buttons -->
              <div v-if="user" >
                  <router-link class=btnrl :to="{ name: 'Home'}">עדכונים</router-link>
                  <router-link :to="{ name: 'MyServices'}">הליגות שלי</router-link>
                  <router-link :to="{ name: 'Search'}">חיפוש</router-link>
              </div>
                            
          </div>
      </nav>
  </div>

</template>

<!-- Script  -->
<script>
// Imports
import getUser from '@/composables/getUser'

// Export default
export default {
    // Setup
    setup() {
        const { user } = getUser()

        const btnChange = (btn) => {

        }

        return { user }
    }
}
</script>

<!-- Style  -->
<style scoped>
    .navbar-bs {
        padding: 16px 10px;
        margin-bottom: 20px;
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
        margin: auto;
        
    }
    nav .links a, button {
        margin-left: 16px;
        font-size: 16px;
    }
    a:focus, a:valid {
        font-weight: bold;
        color: darkblue;
        font-size: 20px;
    }

    .link-sep {
        border-left: 1px solid #eee;
    }
    span {
        font-size: 12px;
        display: inline-block;
        margin-left: 16px;
        padding-left: 16px;
    }
</style>