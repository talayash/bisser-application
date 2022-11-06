<!-- Template -->
<template>
  <!-- Page section -->
  <div class="page">
      <!-- Loop on all of the days collection -->
      <div v-for="day in days" :key="day.id">
        <br>
        <!-- Set a router link for each day, and pass the day document id and collection id -->
        <router-link :to="{ name: 'ServiceDetailsMulti', params: {id: day.id, fid: id}}">
          <div class="single-bs">
            <div class="info-bs">

              <!-- Show for each day necessary details -->
              <h5>{{day.day}} - {{timestampToDate(day.date)}}</h5>
              <p>Start: {{ day.start }} - End: {{ day.end }}</p>
             
            </div>
          </div>
        </router-link>
    </div>

    <!-- If there is an error show relevant message -->
    <p> {{ error }} </p>

    <!-- If current user is the owner of the service - show delete button -->
    <button v-if="ownership" @click="handleDelete" class="delete">Delete</button>
    <p>Created At: {{ timestampToDate(main.createdAt) }}</p>
  </div>
</template>


<!-- Scripts -->
<script>
// Imports
import getCollection from '@/composables/getCollection'
import useCollection from '@/composables/useCollection'
import useDocument from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import getTimestampDate from '@/composables/getTimestampDate'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'
import getUser from '@/composables/getUser'
import { computed } from 'vue'


// Export default
export default {

    // Props: service document id
    props: ['id'],

    // setup
    setup(props) {

      // Current User
      const { user } = getUser()

      // Get service detail
      const { 'document': main } = getDocument('services', props.id)
      // Get all of the working days
      const { error, 'documents':days } = getCollection('services', props.id, 'days')

      // Get timestamp converte function
      const { timestampToDate } = getTimestampDate()

      // Router setup
       const router = useRouter()

      // Computed function to check if the current user owned the current service
      // For allowing function and method on the current service (delete, edit etc)
      const ownership = computed(() => {
          return days.value && user && user.value.uid == main.value.userId
      })

      // Handle Delete function
      const handleDelete = async () => {

        // Run a for each loop over all of the work day in the current services
        days.value.forEach(element => {

          // Load 'useDocument' function with the current user id and current user doc id
          const { 'deleteDoc': dayDocumentDelete } = useDocument('services', props.id, 'days', element.id)

          // Run a for each loop of each work day array list of appointments
          element.arr.forEach( element2 => {
            // If userID exists, thats mean someone invited an appoitment
            if(element2.userId) {
                // Load 'useDocument' function with the current user id and current user doc id
                const {'deleteDoc': userDocDelete } = useDocument('users', element2.userId, 'appointments', element2.userDocId)
                
                // Load 'addDoc' function to add new notification document to user about the deleted appointment
                const { 'addDoc': addNotifictionDoc } = useCollection('users',element2.userId,'notifications')

                let notification = {
                    'userId': element2.userId,
                    'displayName': element2.displayName,
                    'createdAt': timestamp(),
                    'date': element.date,
                    'service': main.value.name, 
                    'message': 'The service ' + main.value.name + ' Has been deleted!, Your appointment has been canceled!',
                    'watched': false
                }

                addNotifictionDoc(notification)
              
                // Delete the doc
                userDocDelete()
            }
          })
          // Delete the 'day work' document
          dayDocumentDelete()
          
        });

        // At the end, after deleting each work day and handling users appointments,
        // Delete the main Service document from 'services' collection 
        const { 'deleteDoc': serviceDocumentDelete } = useDocument('services', props.id)
        serviceDocumentDelete()

          // At the end, check if no error exists, if no move to 'Home' page
          if(!error.value) {
              router.push({ name: 'Home' })
          }
      }

      // Return necessary attributes and functions
      return {  days, error, timestampToDate, ownership, handleDelete, main }

    }

}
</script>

<!-- Style -->
<style>

  .page {
    max-width: 400px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    border: 1px solid  var(--secondary);
    background: white;
  }
  .single-bs {
    display: flex;
    max-width: 600px;
    align-items: center;
    padding: 1px;
    border-radius: 5px;
    background: white;
    margin: 0 auto;
    transition: all ease 0.2s;
    border-bottom: 1px dotted #bbb;
  }
  .info-bs {
    margin: 0 20px;
  }

</style>