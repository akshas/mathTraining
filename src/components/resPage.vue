  {{getDone}}
<template>
  <div class="wrap">
    <h1>{{lev}}</h1>
    <div class="right">
      правильные ответы: {{done}}
    </div>
    <div class="err">
      ошибки: {{error}}
    </div>
    <div class="message">{{mes}}</div>
    <button class="btn btn-primary" @click="$emit('onClick')">еще раз</button>
    <button class="btn btn-primary" :disabled="done === max ? false : disabled" @click="$emit('levelUp')">слудующий уровень</button>
  </div>
</template>
<script>
  export default {
    props: ['done', 'error', 'mes', 'max', 'lev'],
    data () {
      return {
        disabled: ""
        // enabled: ""
      };
    },
    computed: {

    },
    methods: {

    }
  };
</script>
<style>
</style>
