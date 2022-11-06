<!-- Template  -->
<template>
  <!-- Create Service form -->
  <form @submit.prevent="handleSubmit">
    <!-- Title -->
    <h4>Create New Service</h4>
    
    <!-- Inputs -->
    <label>Service Name</label>
    <input type="text" required v-model="title">

    <label>Location</label>
    <input type="text" required v-model="location">
    
    <label>Date</label>

    <datepicker
    v-model="picked"
    :disabledDates="{ dates: [disabledDate] }"/>

  
    <label>Start</label>
    <input type="time" name="appt" v-model="start" required>
    
    <label>End</label>
    <input type="time" name="appt" v-model="end" required>

    <div v-if="end<start">
      <p class="error">End time must be bigger then start time!</p>
    </div>

    <label for="customRange2" class="form-label">Time Slot</label>
    <p>{{ time }} Minutes</p>
    <input type="range" class="form-range" min="5" max="120" step="5" id="customRange2" v-model="time">

    <!-- Error div for firebase error -->
    <div class=error></div>

    <!-- Create button -->
    <button v-if="(start >= end)" disabled>Create</button>
    <button v-else-if="!isPending">Create</button>
    <button v-else disabled>Saving ...</button>
  
  </form>

</template>

<!-- Script  -->
<script>
// Imports
import Datepicker from 'vue3-datepicker'
import getSlots from '@/composables/getSlots'
import getUser from '@/composables/getUser'
import useCollection from '@/composables/useCollection'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { add } from 'date-fns'

// Export default
export default {
    components: {Datepicker},

    // Setup
    setup() {

        // Form attributes
        const title = ref('')
        const picked = ref(new Date())
        const start = ref('')
        const end = ref('')
        const time = ref('60')
        const location = ref()
        const disabledDate = ref(add(new Date(), { days: -1 }))
        
        // Imported attributes
        const { user } = getUser()
        const router = useRouter()
        const { error, addDoc, isPending } = useCollection('services')

        // Help array with the week days for compare
        const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                
        // Handle Submit function
        const handleSubmit = async () => {
            // Create new 'service' object with necessary values
            const service = {
              'userId': user.value.uid,
              'displayName': user.value.displayName,
              'name': title.value,
              'type': 'single',
              'date': picked.value,
              'day': weekday[picked.value.getDay()],
              'start': start.value,
              'end': end.value,
              'location': location.value,
              'createdAt': timestamp(),
              'arr': getSlots(start.value, end.value ,time.value)
            }

            // Add the document and store the result in response (res = the created document id)
            const res = await addDoc(service)
            
            // If no errors, push by the routher to ''ServiceDetails' to show 
            // The current service details (using a params with the id)
            if(!error.value){
              router.push( {name: 'ServiceDetails', params: {id: res.id}})
            }
        }

        // Return necessary attributes and functions
        return { title, picked, handleSubmit, isPending, start, end, time, error, location, disabledDate }
    }
}
</script>

<!-- Style -->
<style>
  form {
    background: white;
  }
  label {
    font-size: 10px;
    display: block;
  }
  button {
    margin-top: 20px;

  }

</style>