<template>
    
    <div class="form-style">
        <h3>Notifications</h3>

        <div v-for="notification in formattedDocuments" :key="notification.id">
            <h5>{{ notification.message }}</h5>
            <p>{{ notification.createdAt }}</p>
            <hr>
        </div>
        
    </div>
</template>

<script>
import getCollection from '@/composables/getCollection.js'
import useDocument from '@/composables/useDocument.js'
import getTimestampDate from '@/composables/getTimestampDate'
import { formatDistanceToNow } from 'date-fns'
import getUser from '@/composables/getUser'
import { computed, onMounted, ref } from 'vue'

export default {

    setup() {

        const { user } = getUser()
        const { 'documents': notifications } = getCollection('users', user.value.uid, 'notifications')
        const { timestampToDate } = getTimestampDate()

        // Formatted Document with createAt values format
        const formattedDocuments = computed(() => {
            // If notification document exists
            if(notifications.value){
                // Map documents 
                return notifications.value.map(doc => {
                    
                    // Update each document with 'watch' value as true after user watched the notification
                    const { updateDoc } = useDocument('users', user.value.uid, 'notifications', doc.id)
                    updateDoc({...doc, watched: true})
                    
                    // Return 'time ago' formatted value
                    let time = formatDistanceToNow(doc.createdAt.toDate())
                    
                    // Return the 'fixed' object with createdAt value as string output and not date
                    return { ...doc, createdAt: time }
                })
            }
        })
        

        return { user, timestampToDate, formattedDocuments }
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