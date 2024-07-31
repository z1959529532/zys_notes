<template>
  <div id="momo-content">

    <div class="Momo">
      <!--脸-->
      <div class="face">
        <div class="inner">
          <div ref="leftEyeRef" id="leftEye" class="leftEye zy momo-blink"></div>
          <div ref="rightEyeRef" id="rightEye" class="rightEye zy momo-blink"></div>
        </div>
      </div>
      <!--耳朵-->
      <div class="lefEar"></div>
      <div class="rigEar"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Momo',
  data() {
    return {
      leftEyeRef: null,
      rightEyeRef: null,
    }
  },
  mounted() {
    this.leftEyeRef = document.getElementById('leftEye')
    this.rightEyeRef = document.getElementById('rightEye')
    this.startEyeFollow()
  },
  methods: {
    startEyeFollow() {
      document.getElementsByTagName("body")[0].addEventListener('mousemove', (e) => {
        const multiple = 80;
        const transformElement = (x, y) => {
          let box = this.leftEyeRef.getBoundingClientRect();
          let calcX = (y - box.y - (box.height / 2)) / multiple;
          let calcY = (x - box.x - (box.width / 2)) / multiple;
          this.leftEyeRef.style.transform =
              `translate(${calcY}px, ${calcX}px)`
          this.rightEyeRef.style.transform =
              `translate(${calcY}px, ${calcX}px)`
        }
        window.requestAnimationFrame(function () {
          transformElement(e.clientX, e.clientY);
        });
      });
    }
  },
}
</script>

<style scoped>
#momo-content {
  width: 100%;
  height: 50vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.Momo {
  border-radius: 50%;
  width: 180px;
  height: 180px;
  margin: auto;
  background-color: #cbe8d7;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .face {
    position: absolute;
    width: calc(180px * 2/3);
    height: calc(180px * 2/3);
    background-color: lightblue;
    transform: rotate(45deg);
    margin-top: calc(-180px * 1/10 - 10px);
    border-radius: 55% 45% 77% 23% / 54% 22% 78% 46%;
    border: 7px solid #1e80e260;
  }

  .inner {
    transform: rotate(-45deg);
    position: absolute;
    width: calc(180px * 3/4);
    height: calc(180px * 3/4);
  }

  .leftEye, .rightEye {
    width: 10px;
    border-top: 0 solid #000;
    border-bottom: 0 solid #000;
    background-color: white;
    height: calc(180px * 3/20 - 5px);
    box-sizing: border-box;

    position: absolute;
    top: 25%;
  }

  .leftEye {
    left: 25%;
  }

  .rightEye {
    right: 25%;
  }

  .lefEar {
    position: absolute;
    width: calc(180px * 1/5);
    height: calc(180px * 1/2);
    background-color: lightblue;
    border-radius: 44% 49% 22% 65% / 100% 100% 0% 0%;
    transform: rotate(-35deg);
    top: calc(-180px * 1/2 + 20px);
    left: calc(-180px * 1/8);
  }

  .lefEar::after {
    content: '';
    display: inline-block;
    width: calc(180px * 1/4);
    height: calc(180px * 1/4);
    border-radius: 44% 49% 22% 65% / 100% 100% 0% 0%;
    background-color: #cbe8d7;
    position: absolute;
    transform: rotate(180deg);
    bottom: -25px;
    left: -5px;
    clip-path: polygon(28% 0,
    35% 10%,
    70% 0,
    90% 40%,
    100% 50%,
    90% 85%,
    90% 90%,
    83% 100%,
    50% 50%,
    20% 100%,
    0 43%);
  }

  .rigEar {
    position: absolute;
    width: calc(180px * 1/5);
    height: calc(180px * 1/2);
    background-color: lightblue;
    border-radius: 44% 49% 22% 65% / 100% 100% 0% 0%;
    transform: rotate(35deg);
    top: calc(-180px * 1/2 + 20px);
    right: calc(-180px * 1/8);
  }

  .rigEar::after {
    content: '';
    display: inline-block;
    width: calc(180px * 1/4);
    height: calc(180px * 1/4);
    border-radius: 44% 49% 22% 65% / 100% 100% 0% 0%;
    background-color: #cbe8d7;
    position: absolute;
    transform: rotate(180deg);
    bottom: -25px;
    left: -5px;
    clip-path: polygon(28% 0,
    35% 10%,
    70% 0,
    90% 40%,
    100% 50%,
    90% 85%,
    90% 90%,
    83% 100%,
    50% 50%,
    20% 100%,
    0 43%);
  }

  @keyframes blink {
    0% {
      border-top: 0 solid lightblue;
      border-bottom: 0 solid lightblue;
    }
    50% {
      border-top: calc(180px * 1/20) solid lightblue;
      border-bottom: calc(180px * 1/20) solid lightblue;
    }
    100% {
      border-top: 0 solid lightblue;
      border-bottom: 0 solid lightblue;
    }
  }

  .momo-blink {
    animation: blink 1s linear 3;
  }

}
</style>