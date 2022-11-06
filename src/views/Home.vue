<!-- Template  -->
<template>
  
  <!-- Show current user his own appointments if exists -->
  <AppointmentsView /> 

</template>

<!-- Script  -->
<script>
// Imports
import AppointmentsView from '../components/AppointmentsView.vue'
import getCollection from '../composables/getCollection'
import getUser from '@/composables/getUser'

// Export default
export default {
  name: 'Home',
  components: { AppointmentsView },

  setup() {

      // Get current user
      const { user } = getUser()
      // Get current user documents by user id
      const { error, 'documents': appointments } = getCollection('users', user.value.uid, 'appointments')

      return { appointments }
  }

}
</script>



