<template>
  <div  :class="test1">
    <div :class="test2">
      <div class="text" v-text="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Badge",
  props: {
    position: {
      type: String,
      default: 'right'
    },
    content: {
      type: String,
      default: 'github'
    }
  },
  computed: {
    test1() {
      return this.position==='left'?'ribbon ribbon-left':'ribbon';
    },
    test2() {
      return this.position==='left'?'banner banner-left':'banner';
    }
  }
}
</script>

<style scoped>
.ribbon {
  position: absolute;
  top: 0;
  right: 0;
}

.banner {
  position: relative;
  float: right;
  display: block;
  width: 100px;
  color: #ffffff;
  transform: rotate(45deg);
  top: 22px;
  right: -14px;
}


.banner:before, .banner:after {
  content: '';
  position: absolute;
  width: 30px;
  height: 12px;
  display: block;
  background-color: #ff321c;
}

.banner:before {
  left: -45px;
  transform: skewY(-45deg) translate(50%, 15px);
  -webkit-transform-origin: 100% center;
  -moz-transform-origin: 100% center;
  -ms-transform-origin: 100% center;
  -o-transform-origin: 100% center;
  transform-origin: 100% center;
}

.banner:after {
  right: -17px;
  transform: translate(100%, -100%) skewY(45deg) translateX(-58%);
  -webkit-transform-origin: 0 center;
  -moz-transform-origin: 0 center;
  -ms-transform-origin: 0 center;
  -o-transform-origin: 0 center;
  transform-origin: 0 center;
}

.text {
  position: relative;
  padding: 6px 0;
  z-index: 2;
  min-height: 18px;
  line-height: 18px;
  white-space: nowrap;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  text-align: center;
  text-transform: capitalize;
}

.text:before, .text:after {
  content: '';
  display: block;
  height: 30px;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
  background-color: #ff604f;
}

.text:before {
  transform: translateX(-15%) skewX(-45deg);
}

.text:after {
  transform: translateX(15%) skewX(45deg);
}

.ribbon-left {
  right: auto;
  left: -26px;
}

.banner-left {
  transform: rotate(-45deg);
}

</style>