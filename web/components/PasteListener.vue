<template>
  <div></div>
</template>


<script>
  export default {
    mounted () {
      window.addEventListener('paste', this.readPaste)
    },
    destroyed () {
      window.removeEventListener('paste', this.readPaste)
    },
    methods: {
      readPaste (e) {
        e.preventDefault()
        let input = (e.clipboardData || window.clipboardData).getData('text')
        this.$store.dispatch('reader/handleInput', {input})
      }
    }
  }
</script>

<style>
</style>
