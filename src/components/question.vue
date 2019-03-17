<template>
  <div class="alert alert-secondary">
    <h2>question</h2>
    <div v-if="!flag" class="text">{{x}} {{operator}} {{y}} = ?</div>
    <div v-else class="text">{{y}} {{operator}} {{x}} = ?</div>
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
    props: ['stats', 'operator'],  // stats - информация об уровне, Operator - +-*/
    data() {
      return {
        x: mRand(this.stats.from, this.stats.to),
        y: mRand(this.stats.from , this.stats.to),
        flag: false
      };
    },
    computed: {
      right() {
        // Переключение оператора
        let right = '';
        switch (this.operator) {
          case "+":
            right = this.x + this.y;
            break;
          case "-":
            if(this.x > this.y) {
              right = this.x - this.y;
            } else {
              right = this.y - this.x;
              this.flag = true;
          }
            break;
          case "*":
            right = this.x * this.y;
            break;
          case "/":
            let dev = this.x * this.y;
            this.x = dev;
            right = this.x / this.y;
            break;
          default:
            right = this.x + this.y;
        }
        return right;
      },
      answers() {
        let res = [this.right];
        while (res.length < this.stats.variants) {
          let num = mRand(this.right - this.stats.range, this.right + this.stats.range);
          num = num.toFixed(2);
          num = Number(num);
          if (res.indexOf(num) === -1 && num > 3) res.push(num);
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
      },
      selectNums() {

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
