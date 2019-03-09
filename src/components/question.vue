<template>
  <div class="alert alert-secondary">
    <h2>question</h2>
    <div class="text">{{x}} + {{y}} = ?</div>
    <div class="display">
      <button
        class="btn btn-success"
        v-for="number in answers"
        :key="number.id"
        @click="onAnswer(number)"
      >{{number}}
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        x: mRand(100, 200),
        y: mRand(100, 200)
        // operator: '+' - выбирает пользователь
      };
    },
    computed: {
      right() {
        return this.x + this.y;
      },
      answers() {
        let res = [this.right];
        while (res.length < 4) {
          let num = mRand(this.right - 20, this.right + 20);

          if (res.indexOf(num) === -1) res.push(num);
        }
        res.sort(function () {
          return 0.5 - Math.random();
        });
        return res;
      }
    },
    methods: {
      onAnswer(num) {
        if (num === this.right) {
          this.$emit("success");
        } else {
          this.$emit("error");
        }
      }
    }
  };

  function mRand(min, max) {
    let diff = max - min;
    return Math.floor(Math.random() * (diff + 1)) + min;
  }
</script>
<style scoped>
  .display {
    margin-top: 30px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
  }
</style>
