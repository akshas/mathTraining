<template>
  <div class="wrap">
    <div class="right">
      правильные ответы: {{done}}
    </div>
    <div class="err">
      ошибки: {{error}}
    </div>
    <div class="message">{{mes}}</div>
    <button class="btn btn-primary" @click="$emit('onClick')">еще раз</button>
  </div>
</template>
<script>
  export default {
    props: ['done', 'error', 'mes']
  };
</script>
<style>
</style>
