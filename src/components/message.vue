<template>
  <div class="alert" :class="'alert-' + type">
    <h3>{{text}}</h3>
    <button class="btn btn-primary" @click="$emit('onClick')">continue</button>
  </div>
</template>
<script>
  export default {
    props: ["type", "text"]
  };
</script>
<style>
  .alert {
    text-align: center;
  }
</style>


