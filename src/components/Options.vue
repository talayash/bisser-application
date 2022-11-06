
<template>
    <!-- Notifications Button with router link -->
    <router-link :to="{ name: 'Notifications'}">
        <!-- If no news notification show gray button -->
        <span v-if="notifications && notifications.length==0" class="material-icons" style="font-size: 28px" >notifications</span>
        
        <!-- Else - user have new notification then show red button with active -->
        <span v-else class="material-icons" style="font-size: 28px; color:red;" >notifications_active  </span>
        
    </router-link>

    <!-- Setting Button -->
    <router-link :to="{ name: 'Setting'}">
        <span class="material-icons" style="font-size: 28px" >settings</span>
    </router-link>

</template>

<script>
// Imports
import getCollection from '@/composables/getCollection.js'
import getUser from '@/composables/getUser'
import { ref } from 'vue'

// Export default
export default {
    
    setup() {
        const { user } = getUser()

        const { 'documents': notifications } = getCollection('users', user.value.uid, 'notifications', ['watched', '==', false])
        
        return { user, notifications}
    }

}
</script>

<style>
span {
        font-size: 14px;
        display: inline-block;
        margin-left: 16px;
        padding-left: 16px;
        border-left: 1px solid #eee;
    }
</style>