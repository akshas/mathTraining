<template>
  <div class="training">
    <h1>Math training</h1>
    <hr>
    <div class="progress">
      <div class="progress-bar" :style="barStyles"></div>
    </div>
    <div class="box">
      <transition name="flip" mode="out-in">
        <app-start v-if="state === 'start'" @onStart="onStart($event)"></app-start>
        <app-question
          v-else-if="state === 'question'"
          :stats="operator === '+' || operator === '-' ? levels[level] : anotherLevels[level]"
          :operator="operator"
          @success="onQuestSuccess"
          @error="onQuestError('Try again!')"
        ></app-question>
        <app-mess
          v-else-if="state === 'message'"
          :text="message.text"
          :type="message.type"
          @onClick="onStart"
        ></app-mess>
        <app-res
          v-else-if="state === 'result'"
          @onClick="renew"
          @levelUp="levelUp"
          :done="stats.done"
          :error="stats.error"
          :mes="message.text"
          :max="questMax"
          :lev="level"
        ></app-res>
        <div v-else>nothing else matters</div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      state: "start",
      // bar: document.querySelector('.progress'),
      message: {
        type: "",
        text: ""
      },
      stats: {
        done: 0,
        error: 0
      },
      operator: "",
      questMax: 3,
      level: 0,
      levels: [
        {
          variants: 4,
          from: 100,
          to: 200,
          range: 20
        },
        {
          variants: 5,
          from: 150,
          to: 250,
          range: 30
        },
        {
          variants: 6,
          from: 200,
          to: 300,
          range: 40
        }
      ],
      /**
       *  параметры для функции mRand в question.vue
       *  если оператор * или /
       * */
      anotherLevels: [
        {
          variants: 4,
          from: 2,
          to: 9,
          range: 4
        },
        {
          variants: 5,
          from: 10,
          to: 20,
          range: 6
        },
        {
          variants: 6,
          from: 15,
          to: 30,
          range: 6
        }
      ]
    };
  },
  computed: {
    // anotherLevels() {
    //
    // },
    questDone() {
      return this.stats.done + this.stats.error;
    },
    barStyles() {
      if (this.questDone <= this.questMax) {
        return {
          width: (this.questDone / this.questMax) * 100 + "%"
        };
      }
    }
  },
  methods: {
    onStart(operator) {
      if (this.questDone === this.questMax) {
        this.result();
      } else {
        if (operator !== undefined) {
          this.operator = operator;
        }
        this.state = "question";
      }
      console.log(this.operator);
    }, // onStart
    renew() {
      this.stats.done = 0;
      this.stats.error = 0;
      this.onStart();
    },
    onQuestSuccess() {
      this.state = "message";
      this.message.text = "Good job";
      this.message.type = "success";
      this.stats.done++;
    }, // renew
    onQuestError(msg) {
      this.state = "message";
      this.message.text = msg;
      this.message.type = "warning";
      this.stats.error++;
    }, //onQuestError
    result() {
      this.state = "result";
      this.message.text =
        this.stats.done === this.questMax ? "You are genius" : "You are loser";
    }, //result
    levelUp() {
      this.level++;
      this.renew();
    }
  }
};
</script>

<style scoped lang="scss">
.training {
  max-width: 700px;
  margin: 20px auto;
}

.box {
  margin: 20px auto;
}

.flip-enter {
}

.flip-enter-active {
  animation: flipIn 0.3s linear;
}

.flip-leave {
}

.flip-leave-active {
  animation: flipOut 0.3s linear;
}

@keyframes flipIn {
  from {
    transform: rotateX(90deg);
  }
  to {
    transform: rotateX(0deg);
  }
}

@keyframes flipOut {
  from {
    transform: rotateX(0deg);
  }
  to {
    transform: rotateX(90deg);
  }
}
</style>
