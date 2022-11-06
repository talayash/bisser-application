<!-- Template  -->
<template>
  
  <!-- Create Service form -->
  <form>

    <!-- LEVEL ONE -->
    <div v-if="levelOne" class="form-style">
      <!-- Title -->
      <h4>Choose Name and Cycle</h4>
      
      <!-- Inputs -->
      <input type="text" required placeholder="Service Name" v-model="title">
      <input type="number" min="1" required placeholder="Days Time Cycle" v-model="timeCycle">
      <p class="guide">The amount of days that you want</p>
      
      <!-- Next button -->
      <div v-if="( title != '' && timeCycle != '')">
        <button  @click="nextLevel('1')" class="next">Next <span class="material-icons">arrow_forward_ios</span></button>
      </div>

      <div v-else>
        <button class="next" disabled>Next <span class="material-icons">arrow_forward_ios</span></button>
      </div>
    
    </div>
    
      <!-- LEVEL TWO  -->

      <div v-if="levelTwo" class="form-style">
          <h4>Choose days</h4>
          
          <div v-for="index in 7" :key="index">
            
            <label @click="choosedDay(index)"><span class="material-icons">add</span>{{ weekday[index-1] }}</label>
            
            <div v-if = "dayBtn == weekday[index-1] && buttonShow">
              <AddDay :day="dayBtn" @clicked="onClickedAddDay"/>
            </div>
            
            <!-- Show data for each day that user choosed -->
            <p v-if="userDayChoose[index-1] != 0"> 
              Start: {{userDayChoose[index-1].start}}, End: {{userDayChoose[index-1].end}} , Time: {{userDayChoose[index-1].time}} 
            </p>

        </div>
        <button  @click="backLevel('2')" class="next"><span class="material-icons">arrow_back_ios</span> Back </button>
        <button v-if="userDayChooseCheck"  @click="nextLevel('2')" class="next">Next <span class="material-icons">arrow_forward_ios</span></button>
       

      </div>

      <!-- LEVEL THREE -->
      <div v-if="levelThree" class="form-style">
        <!-- Title -->
        <h4>Confirm</h4>
        <h5>Name: {{ title }}</h5>
        <h5>Time Cycle: {{ timeCycle }}</h5>

        <div v-for="x in userDayChoose" :key="x">
          <div v-if="x!=0">
            <p> * {{ x.day }}: {{ x.start }} - {{ x.end }} ({{ x.time }} Minutes per slot) </p>
          </div>
        </div>

        <button  @click="backLevel('3')" class="next"><span class="material-icons">arrow_back_ios</span> Back </button>
        
      </div>


    <!-- Error div for firebase error -->
    <div class=error></div> 

    <!-- Create button -->
    <button v-if="!isPending && levelThree" @click="handleSubmit">Create</button>
    <button v-if="isPending" disabled>Saving ...</button>

  </form>

</template>

<!-- Script  -->
<script>
// Imports
import getSlots from '@/composables/getSlots'
import getUser from '@/composables/getUser'
import useCollection from '@/composables/useCollection'
import AddDay from '@/components/AddDay.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

// Export default
export default {
    
    // Components
    components: { AddDay },

    // Setup
    setup() {

        // Form attributes
        const title = ref('')
        const timeCycle = ref('')
        const buttonShow = ref(false)

        // Form levels
        const levelOne = ref(true)
        const levelTwo = ref(false)
        const levelThree = ref(false)


        // Imported attributes
        const { user } = getUser()
        const router = useRouter()
        const { error, addDoc, isPending } = useCollection('services')

        // Help array with the week days for compare
        const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        // User work days list
        const userDayChoose = ref([0,0,0,0,0,0,0])

        const userDayChooseCheck = () => {
          for(let x=0; x<7; x++){
            if(userDayChoose[x] != 0) {
              console.log(userDayChoose[x])
              return true;
            }
            return false;
          }
        }
        
        // Current day button value
        const dayBtn = ref('')

        // Next level function
        const nextLevel = (level) => {
          if(level == 1){
            levelOne.value = false
            levelTwo.value = true
            levelThree.value = false
          }
          else if(level == 2){
            levelOne.value = false
            levelTwo.value = false
            levelThree.value = true
          }
        }

        // Next level function
        const backLevel = (level) => {
          if(level == 2){
            levelOne.value = true
            levelTwo.value = false
            levelThree.value = false
          }
          else if(level == 3){
            levelOne.value = false
            levelTwo.value = true
            levelThree.value = false
          }
        }

        // On click day button set the current day value and show the add day form
        const choosedDay = (index) => {
          if(buttonShow.value){
            buttonShow.value = false
          }
          else{
            dayBtn.value = weekday[(index - 1)]
            buttonShow.value = true
          }
        }

        // On click add new day
        const onClickedAddDay= (value) => {
          
          // Get the choosen day position
          let position = weekday.indexOf(value.day)

          // Update the user day choose array
          userDayChoose.value[position] = value

          // Set show value to false
          buttonShow.value = false
        }


        const handleSubmit = async () => {

          // Initialize dates for now and destination
          var now = new Date();
          var destination = new Date();

          var result = []
          
          // Set the date for the destination date
          destination.setDate(destination.getDate() + (parseInt(timeCycle.value, 10)))

          // Loop over all of the dates from today until the dedstination date
          for (var date = now; date <= destination; date.setDate(date.getDate() + 1)) {
              
              // Get the current Date
              var currentDate = new Date(date)

              // Get the current day from date (Example: 'Sunday' = 0, 'Mondey' = 1 ...)
              var dayValue = currentDate.getDay()
              
              if(userDayChoose.value[dayValue] != 0){
                if(userDayChoose.value[dayValue].day == weekday[dayValue]){
                  
                  // Get the current day by user choose
                  var currentDay = userDayChoose.value[dayValue]

                   // Add the current day to result array 
                  result.push({
                    'start': currentDay.start,
                    'end': currentDay.end,
                    'date': currentDate,
                    'time': currentDay.time,
                    'day': weekday[dayValue],
                    'arr': getSlots(currentDay.start, currentDay.end, currentDay.time)
                  })  
                }
              } 
          }
          
          // Create new service 
          const service = {
            'name': title.value,
            'createdAt': (new Date()),
            'displayName': user.value.displayName,
            'userId': user.value.uid,
            'type':'multi'
          }

          // Add document and get response
          const res = await addDoc(service)
          
          // Add each day for the under collection
          await result.forEach(x => {
            res.collection('days').add(x)
          })

          if(!error.value){
            router.push({name: 'MultiServiceDetails', params: {id: res.id}})
          }

        }

        // Return necessary attributes and functions
        return { title, isPending, error, 
                 handleSubmit, timeCycle, weekday, 
                 onClickedAddDay, choosedDay, dayBtn, 
                 buttonShow,userDayChoose,
                 levelOne, levelTwo, levelThree,
                 nextLevel, backLevel, userDayChooseCheck }
    }
}
</script>

<!-- Style -->
<style>
  form {
    background: white;
  }
  label {
    font-size: 16px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
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

  .next {
    margin-left: 0 auto;
  }

  .back {
    margin-right: 0 auto;
  }

  h4 {
    text-align: center;
  }

  .guide {
    color: gray;
    font-style: italic;
  }
</style>