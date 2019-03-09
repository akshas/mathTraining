<template>
  <div class="training">
    <h1>Math training</h1>
    <hr>
    <div class="progress">
      <div class="progress-bar" :style="barStyles"></div>
    </div>
    <div class="box">
      <transition name="flip" mode="out-in">
        <app-start v-if="state === 'start'" @onClick="onStart"></app-start>
        <app-question
          v-else-if="state === 'question'"
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
          :done="stats.done"
          :error="stats.error"
          :mes="message.text"
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
        bar: document.querySelector('.progress'),
        message: {
          type: "",
          text: ""
        },
        stats: {
          done: 0,
          error: 0
        },
        questMax: 3
      };
    },
    computed: {
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
      onStart() {
        if (this.questDone === this.questMax) {

          this.result();

        } else {

          this.state = "question";

        }
      },
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

      },
      onQuestError(msg) {
        this.state = "message";
        this.message.text = msg;
        this.message.type = "warning";
        this.stats.error++;
      },
      result() {

        this.state = 'result';
        // this.bar.style.display = 'none';
        this.message.text = this.stats.done === this.questMax ? "You are genius" : 'You are loser';
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
