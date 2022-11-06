<!-- Template -->
<template>
    <!-- Group input -->
    <div class="input-group mb-3">
      <input type="time" name="appt" v-model="start" required>
      <input type="time" name="appt" v-model="end" required>
      
    <div v-if="end<start">
      <p class="error">End time must be bigger then start time!</p>
    </div>
    <br>
      <input type="number" class="form-control" aria-label="Text input with dropdown button" min="5" step="5" placeholder="Time" required v-model="time">
      <button v-if="check" type="button" class="btn btn-outline-secondary" @click="handleClick">Add</button>
    </div>

</template>

<!-- Script -->
<script>
// Imports
import { ref } from 'vue'

// Export Default
export default {
    // Props: day value
    props: ['day'],
    // Emits returns result object
    emits: ['clicked'],
    
    setup(props, { emit }) {

        const start = ref('')
        const end = ref('')
        const time = ref('')
        const day = props.day
        
        const check = () => {
            return start != null && end != null && time != null && (start < end);
        }

        const handleClick = () => {
            
            if(start.value && end.value ) {
                const result = {
                'day': day,
                'start': start.value,
                'end': end.value,
                'time': time.value
                }

                emit("clicked", result)
            }
            
        }

        return {start, end, time, day, handleClick, check}
    }

}
</script>

<style scoped>


</style>