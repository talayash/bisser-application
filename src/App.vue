<!-- Template  -->
<template>

  <!-- Navigation Bar -->
  <Navbar />

  <!-- Function bar - visible for users only -->
  <FunctionBar v-if="user"/>

  <!-- Router view section -->
  <router-view/>
  
</template>

<!-- Script  -->
<script>
// Imports
import Navbar from '@/components/Navbar.vue'
import FunctionBar from '@/components/FunctionBar.vue'
import getUser from '@/composables/getUser'

// Export default
export default {
  // Components
  components: { Navbar, FunctionBar },

  // Setup
  setup() {
    // Get current user
    const user = getUser()

    // Return necessary attributes and functions
    return { user }
  }

}
</script>

<!-- Style  -->
<style>

</style>
