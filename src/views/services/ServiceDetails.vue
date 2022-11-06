<!-- Template -->
<template>
    <!-- Check if service exists -->
    <div v-if="service" class="service">
        <!-- If service exists: show few details -->
        <h4> {{ service.name }} </h4>
        <h5>Location: {{service.location}}</h5>
        <h6>{{ service.start }} - {{ service.end }}</h6>
        <h6>{{ service.day }} -  {{ timestampToDate(service.date) }} </h6>
        <h6>By {{ service.displayName }}</h6>

    
        <!-- Run a loop over all of the appointments from the array -->
        <div v-for="appointment in service.arr" :key="appointment.id">
           
            <!-- If userId is null thats mean that the current appointment slot is open -->
            <div v-if="!appointment.userId && !limitCheck">
                <button @click="handleClick(appointment)">{{appointment.start}} - {{appointment.end}} </button>
            </div>
            
            <div v-else-if="checkUser(appointment) && !ownership">
                <button @click="handleCancel(appointment)">{{appointment.start}} - {{appointment.end}}
                    <div>{{ appointment.userName }}</div>
                    <p class="click-to-cancel">Click to cancel</p>
                </button>
            </div>

            <!-- Else - the slot is not available, show details for owner only -->
            <div v-else-if="ownership">

                <div v-if="appointment.userId">
                    <button @click="handleCancel(appointment)">{{appointment.start}} - {{appointment.end}}
                        <div>{{ appointment.userName }}</div>
                        <p class="click-to-cancel">Click to cancel</p>
                    </button>
                </div>

                <div v-else>
                     <button @click="handleClick(appointment)">{{appointment.start}} - {{appointment.end}} </button>
                </div>

            </div>

            <div v-else>
                 <button disabled>{{appointment.start}} - {{appointment.end}} </button>
            </div>
        </div>
        
        <br>
        <p>Created At: {{ timestampToDate(service.createdAt) }}</p>
        <!-- If current user is the owner of the service - show delete button -->
        <button v-if="ownership" @click="handleDelete" class="delete">Delete</button>
        <hr>

    </div>

</template>

<!-- Script -->
<script>
// Imports
import getDocument from '@/composables/getDocument'
import useDocument from '@/composables/useDocument'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { timestamp } from '@/firebase/config'
import getTimestampDate from '@/composables/getTimestampDate'

// Export default
export default {
    // Props: the id of the service
    props: ['id'],

    components: {},

    // Setup
    setup(props) {

        // Initialize imports
        const { document: service } = getDocument('services', props.id)
        const { error, deleteDoc, updateDoc } = useDocument('services', props.id)
        const router = useRouter()
        const { user } = getUser()
        const { document: userAppointment } = getDocument('users', user.value.uid, 'appointments', props.id)
        const { addDoc, isPending } = useCollection('users',user.value.uid,'appointments', props.id)
        const { timestampToDate } = getTimestampDate()

        // Computed function to check if the current user owned the current service
        // For allowing function and method on the current service (delete, edit etc)
        const ownership = computed(() => {
            return service.value && user.value && user.value.uid == service.value.userId
        })

        const limitCheck = computed(() => {
            return userAppointment.value
        })

        const checkUser = (appointment) => {
            return appointment.userId == user.value.uid;
        }

        // Handle click function for add appointment button
        const handleClick = async (appointment) => {
                        
            // User appointment update
            let userUpdate = {
                name: service.value.name,
                date: service.value.date,
                start: appointment.start,
                end: appointment.end,
                serviceId: props.id,
                createdAt: timestamp()
            }
            // Add appointment document for user
            const res = await addDoc(userUpdate)
            
            // Appointment update for service array lists
            let appointmentUpdate = {
                id: appointment.id,
                start: appointment.start,
                end: appointment.end,
                userId: user.value.uid,
                userName: user.value.displayName,
                userDocId: props.id
            }

            // Update current array with the changes
            let arr = service.value.arr
            arr[appointment.id] = appointmentUpdate

            // Update document of service
            await updateDoc({
                arr: [...arr]
            })


            const { 'addDoc': addNotifictionDoc } = useCollection('users',service.value.userId,'notifications')

            
            let notification = {
                'userId': user.value.uid,
                'displayName': user.value.displayName,
                'createdAt': timestamp(),
                'date': service.value.date,
                'service': service.value.name, 
                'message': user.value.displayName + " made an appointment in "+service.value.name+" from " + appointment.start + " to " + appointment.end,
                'watched': false
            }

            await addNotifictionDoc(notification)
        }

        // Handle Delete function
        const handleDelete = async () => {
            // First, we need to delete the current appointment data for users
            // So we need to loop over the appointments array
            service.value.arr.forEach(element => {
                // Check if exists user in the current appointment
                if(element.userId) {
                    // Load 'useDocument' function with the current user id and current user doc id
                    const {deleteDoc: userDocDelete } = useDocument('users', element.userId, 'appointments', element.userDocId)
                    
                    const { 'addDoc': addNotifictionDoc } = useCollection('users', element.userId, 'notifications')
            
                    let notification = {
                        'userId': element.userId,
                        'createdAt': timestamp(),
                        'date': service.value.date,
                        'service': service.value.name, 
                        'message': "The Service " + service.value.name + " in day " + service.value.day + " has been deleted!, you appointment canceled!",
                        'watched': false
                    }
                    
                    addNotifictionDoc(notification)
                    
                    // Delete the doc
                    userDocDelete()
                }
            });
            
            // Now after deleteing from all of the users that used the current service
            // We can delete the service document itself
            await deleteDoc()
            
            // At the end, check if no error exists, if no move to 'Home' page
            if(!error.value) {
                router.push({ name: 'Home' })
            }
        }

        const handleCancel = async (appointment) => {
             const {deleteDoc: userDocDelete } = useDocument('users', appointment.userId, 'appointments', appointment.userDocId)
             userDocDelete()
            
            // Appointment update for service array lists
            let appointmentUpdate = {
                id: appointment.id,
                start: appointment.start,
                end: appointment.end,
                userId: null,
                userName: null,
                userDocId: null
            }

            // Update current array with the changes
            let arr = service.value.arr
            arr[appointment.id] = appointmentUpdate

            // Update document of service
            await updateDoc({
                arr: [...arr]
            })


            const { 'addDoc': addNotifictionDoc } = useCollection('users',service.value.userId,'notifications')

            
            let notification = {
                'userId': user.value.uid,
                'displayName': user.value.displayName,
                'createdAt': timestamp(),
                'date': service.value.date,
                'service': service.value.name, 
                'message': user.value.displayName + " canceled an appointment in "+service.value.name+" from " + appointment.start + " to " + appointment.end,
                'watched': false
            }

            await addNotifictionDoc(notification)

            location.reload();
        }
        
        return { service, handleClick, ownership, handleDelete, timestampToDate, limitCheck , checkUser, handleCancel}
    }
}
</script>

<!-- Style -->
<style>
    .service {
        margin-top: 10px;
        margin: 0 auto;
        max-width: 600px;
        background: white;
        text-align: center;
    }
    .delete {
        background-color: red;
        font-size: 16px;
        color: white;
    }
    .click-to-cancel {
        font-style: italic;
        font-size: 12px;
        color: crimson;
    }

</style>