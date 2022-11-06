<!-- Template  -->
<template>
    <!-- Search Bar -->
    <div class="d-flex">
      <input class="form-control me-2" type="search" placeholder="Type Service or Owner name ..." aria-label="Search" v-model="searchValue">
    </div>

    <div class="d-flex" v-if="!searchValue">
      <h5 >Recent services you may like</h5>
    </div>

    <!-- If search bar not empty -->
    <div v-if="searchValue">
      <!-- Run loop over services document -->
      <div v-for="service in services" :key="service.id">
        <!-- Create a router link for each service to 'ServiceDetails' view component -->
        
        <!-- Call 'searchCheck' function to check if the document exists -->
        <div v-if="searchCheck(service.name, service.displayName)">

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

          <!-- End of search div section -->
        </div>
      <!-- End of loop -->
      </div>
  </div>


  <!--  -->
  <div v-else>

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
  </div>

</template>


<!-- Script  -->
<script>
// Imports
import getTimestampDate from '@/composables/getTimestampDate'
import getCollection from '@/composables/getCollection'
import { ref } from 'vue'

// Export default
export default {

    // Props: services documents
    props: ['services'],

    // Setup
    setup(props) {

      const list = () => {
        if(props.services.length > 3)
          return props.services.slice(0,3)
        return props.services
      }

      console.log(list)

      // Get timestamp converte function
      const { timestampToDate } = getTimestampDate()

      // Search value attribute
      const searchValue = ref('')

     // Search values check
      const searchCheck = (serviceName, displayName) => {
        
        // Init attribute for the input and make lower case (Could be service name or owner name)
        let searchInput = searchValue.value.toLowerCase()

        // Return true or false if one of the value exists in services results
        return serviceName.toLowerCase().includes(searchInput) || displayName.toLowerCase().includes(searchInput)
      }
      
      // Return necessary function and attributes    
      return { timestampToDate, searchValue, searchCheck, list }
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

  
</style>