<!-- Template  -->
<template>

    <!-- Create new service button -->
    <div class="form-style">
        
        <div v-if="documents && documents.length==0" class="single">
           <h5>אין לך ליגות פעילות עדיין</h5>
           <h6>לחץ כאן ליצור תחרות חדשה</h6>
        </div>
        <button class="create-btn" @click="handleClick" disabled>חדש</button>

    </div>
    
    <!-- If error exists show error details -->
    <div v-if="error" class="error">
        <p> {{ error }}</p>
    </div>

    

    <!-- Else - create 'ListView' component with services documents -->
    <div v-else>
        <ListView :services="documents" />
    </div>
    
</template>

<!-- Script  -->
<script>
// Imports
import ListView from '@/components/ListView.vue'
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'


// Export default
export default {
  name: 'Search',
  components: {ListView},

  // Setup
  setup() {

      // Get current user
      const { user } = getUser()

      // Get router
      const router = useRouter()

      // Get collection funciton for using all services documents where current user own's the services
      const { error, documents} = getCollection('services',null, null, ['userId', '==', user.value.uid])

      // Handle click for 'Create' button
      const handleClick = () => {
          router.push({name: 'ServiceOption'})
      }

      // Return necessary attributes and functions
      return { error, documents, handleClick }
  }
}
</script>

<style scoped>
    .create-btn {
        display: flex;
        max-width: 60px;
        align-items: center;
        padding: 5px;
        margin: 0 auto;
    }
    .form-style {
        max-width: 600px;
        margin: 0 auto;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
        border: 1px solid  var(--secondary);
        background: white;
  }
    .single {
        text-align: center;
        padding: 20px;
        border-radius: 10px;
        background: white;
        max-width: 600px;
        border-bottom: 1px dotted #bbb;
        transition: all ease 0.2s;

    }
</style>