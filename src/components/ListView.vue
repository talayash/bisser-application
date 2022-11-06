<!-- Template  -->
<template>
      <!-- Run loop over services document -->
      <div v-for="service in services" :key="service.id">
          <!-- Create a router link for each service to 'ServiceDetails' view component -->

            <!-- If the service is a single -->
          <div v-if="service.type == 'single' ">
            
            <!-- Create a router-link to 'ServiceDetails' components with current document id -->
            <router-link :to="{ name: 'ServiceDetails', params: {id: service.id}}">
              <!-- Show service details -->
              <div class=single-bs>
                  <div class="info-bs">
                      <h3> {{ service.name }}</h3>
                      <h4> {{ timestampToDate(service.date) }} </h4>
                      <h5> By {{ service.displayName}} </h5>
                      <h6>Single Service</h6>
                  </div>
              </div>
            </router-link>
          </div>
          
          <!-- The service is a multiple service type -->
          <div v-else>

            <!-- Create a router-link to 'MultiServiceDetails' component with current document id -->
            <router-link :to="{ name: 'MultiServiceDetails', params: {id: service.id}}">
              
              <!-- Show service details -->
              <div class=single-bs>
                  <div class="info-bs">
                      <h3>{{ service.name }}</h3>
                      <h5>By {{ service.displayName}} </h5>
                      <h6>Multiple Service</h6>
                  </div>
              </div>
            </router-link>
          </div>

      <!-- End of loop -->
      </div>

</template>

<!-- Script  -->
<script>
// Imports
import getTimestampDate from '@/composables/getTimestampDate'
import { ref } from 'vue'

// Export default
export default {

    // Props: services documents
    props: ['services'],

    // Setup
    setup(props) {
      // Get timestamp converte function
      const { timestampToDate } = getTimestampDate()
      
      // Return necessary function and attributes    
      return { timestampToDate }
    }

}
</script>

<!-- Style  -->
<style scoped>
.single-bs {
    display: flex;
    max-width: 600px;
    align-items: center;
    padding: 30px;
    border-radius: 10px;
    background: white;
    margin: 0 auto;
    transition: all ease 0.2s;
    border-bottom: 1px dotted #bbb;
  }
  .single-bs:hover {
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    transform: scale(1.02);
    transition: all ease 0.2s;
  }
  .info-bs {
    margin: 0 30px;
  }
  
  .d-flex {
    display: flex;
    max-width: 600px;
    align-items: center;
    padding: 5px;
    border-radius: 10px;
    background: white;
    margin: 0 auto;
    transition: all ease 0.2s;
    border-bottom: 1px dotted #bbb;
  }
 .form-style {
    max-width: 400px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    border: 1px solid  var(--secondary);
    background: white;
  }
  
</style>