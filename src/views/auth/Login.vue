<!-- Template -->
<template>
  <!-- Login form -->
  <form @submit.prevent="handleSubmit">
      <!-- Login title and inputs -->
      <h3>Login</h3>
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">

      <!-- Error message div -->
      <div v-if="error" class="error"> {{ error }}</div>
      
      <!-- Button section: if 'isPending' true, show an disable 'loading' button  -->
      <button v-if="!isPending">Login</button>
      <button v-if="isPending" disabled>Loading ...</button>
      
      

  </form>


</template>

<!-- Script -->
<script>
    // Imports
    import useLogin from '@/composables/useLogin'
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'

    // Export default
    export default {
        
        // Setup
        setup() {

            // Email & Password attributes using red
            const email = ref('')
            const password = ref('')

            const router = useRouter()

            const display = ref(false)

            // Login function and error, isPending attributes from 'useLogin.js'
            const { error, login, isPending } = useLogin()

            // Handle submit function
            const handleSubmit = async () => {
                // Create a response from login function sending email & password
                const res = await login(email.value, password.value)

                // if occur error then
                if(!error.value){
                    router.push({ name: 'Home' })

                    //location.reload();
                }
            }

            // Return necessary function and attributes
            return { email, password, handleSubmit, error, isPending, display }
        }
    }
</script>

<!-- Style -->
<style>

</style>