<template lang="">
  <div class="video" :style="{width: width, height: height}">
    <video controls style="width: 100%; height: 100%">
        <source :src="src" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: 'movie',
  props: {
   src: {
     type: String,
     default: ''
   },
   width: {
     type: String,
     default: '100%'
   },
    height: {
      type: String,
      default: '100%'
    },
  },
  data() {
    return {
     
    }
  },
  methods: {
    
  }
}
</script>

<style lang="css" scoped>
  .video {
    padding: 0 20px;
  }
</style>