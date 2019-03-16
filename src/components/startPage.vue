<template>
  <div class="alert alert-secondary">
    <div class="operators">
      <button class="btn btn-primary add" @click="changeOperator('+')">+</button>
      <button class="btn btn-primary minus" @click="changeOperator('-')">-</button>
      <button class="btn btn-primary multi" @click="changeOperator('*')">*</button>
      <button class="btn btn-primary divide" @click="changeOperator('/')">/</button>
    </div>
      <h3>Are you ready?</h3>
    <button class="btn btn-success" @click="start">start</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      operator: "+"
    }
  },
  methods: {
    start () {
      console.log(this.operator);
      this.$emit('onStart', this.operator);
    },
    changeOperator (operator) {
      this.operator = operator;
    }
  }
};
</script>
<style>
</style>
