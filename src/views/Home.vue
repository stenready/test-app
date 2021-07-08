<template>
  <div class="home-page">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, libero?
  </div>
</template>

<script>
  export default {
    name: 'Home',
    async  mounted() {
      const response = await this.$api.getMovies()
      console.log(response, 'stas')
    }
  }
</script>
