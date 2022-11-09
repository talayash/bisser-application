<template>
    <!-- Signup form -->
  <form @submit.prevent="handleSubmit">
      <!-- Signup title and inputs -->
      <h3>הרשמה</h3>
      <input type="text" required="required" placeholder="שם מלא" v-model="displayName">
      <input type="email" required="required" placeholder="אימייל" v-model="email">
      <input type="password" required="required" placeholder="סיסמא" v-model="password">

      <!-- Error message div -->
      <div v-if="error" class="error"> {{ error }}</div>
      
      <!-- Button section: if 'isPending' true, show an disable 'loading' button  -->
      <button v-if="!isPending">הרשמה</button>
      <button v-if="isPending" disabled>טוען ...</button>

  </form>
</template>

<script>

import { ref } from 'vue'
import useSignup from '@/composables/useSignup'
import useCollection from '@/composables/useCollection'
import { useRouter } from 'vue-router'

    export default {

        setup() {

            const displayName = ref('')
            const email = ref('')
            const password = ref('')

            const router = useRouter()
            const {error, signup, isPending} = useSignup()

            

            const handleSubmit = async () => {
               // Sign up the new user
               const res = await signup(email.value, password.value, displayName.value)
                
                // If no errors
                if(!error.value){
                    
                    // Add the new user to users collection with is own uid
                    const { addDoc } = useCollection('users', res.user.uid)
                    // Add the the user necessary values
                    await addDoc({'displayName': displayName.value, 'email': email.value})
                    // Push to home
                    router.push({ name: 'Home'})
                }
            }
            return { displayName, email, password, isPending, error, handleSubmit }
        }
    }
    
</script>

<style>

</style>