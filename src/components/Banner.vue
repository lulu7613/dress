<template>
    <carousel class="col-11 mx-auto mt-5" :per-page="1" :paginationEnabled="false" :mouse-drag="false" :autoplay="true" :loop="true">
      <slide>
          <img src="../assets/img/banner01.png" class="d-block w-100" alt="banner01.jpg" />
      </slide>
      <slide>
          <img src="../assets/img/banner02.png" class="d-block w-100" alt="banner02.jpg" />
      </slide>
      <slide>
          <img src="../assets/img/banner03.png" class="d-block w-100" alt="banner03.jpg" />
      </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: {
    Carousel,
    Slide
  },

  data () {
    return {

    }
  }
}
</script>

<style scoped>
.bg-lighter {
  background-color:rgba(0, 0, 0, 0.3)
}

.slider {
  position: relative;
}
</style>
