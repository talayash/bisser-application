<template>
  <router-link :to="{ name: 'AddService'}">
          <!-- Show service details -->
          <div class=single-bs>
              <div class="info-bs">
                  <h3>Single Service</h3>
                  <h5>A One-time service</h5>
                  <p>Like a meeting with teacher or private class.</p>
              </div>
          </div>
      </router-link>

      <router-link :to="{ name: 'CreateMultiple'}">
          <!-- Show service details -->
          <div class=single-bs>
              <div class="info-bs">
                  <h3>Multiple Service</h3>
                  <h5>A Multiple uses services</h5>
                  <p>Like a barber shop schedule or tattoo artist.</p>
              </div>
          </div>
      </router-link>
</template>

<script>
export default {

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
  .thumbnail {
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
    border-radius: 10px;
  }
  img {
    max-width: 150%;
    max-height: 150%;
    display: block;
  }
  .info-bs {
    margin: 0 30px;
  }
  .info-bs p {
    font-size: italic;
  }
</style>