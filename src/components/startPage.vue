<template>
  <div class="alert alert-secondary">
    <div class="operators">
      <button class="btn btn-primary add" :class="{active: activeBtn===1}" @click="changeOperator('+'); activeBtn=1">+</button>
      <button class="btn btn-primary minus" :class="{active: activeBtn===2}" @click="changeOperator('-'); activeBtn=2">-</button>
      <button class="btn btn-primary multi" :class="{active: activeBtn===3}" @click="changeOperator('*'); activeBtn=3">*</button>
      <button class="btn btn-primary divide" :class="{active: activeBtn===4}" @click="changeOperator('/'); activeBtn=4">/</button>
    </div>
      <h3>Are you ready?</h3>
    <button class="btn btn-success" @click="start">start</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      operator: "+",
      activeBtn: undefined
    }
  },
  methods: {
    start () {
      this.$emit('onStart', this.operator);
    },
    changeOperator (operator) {
      this.operator = operator;
    }
  }
};
</script>
<style scoped lang="scss">
  .active{
      border: 3px solid darkgreen !important;
      outline: none !important;
      box-shadow: none !important;
  }
</style>
