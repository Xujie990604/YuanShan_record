# Swiper插件

```js
<template>
  <div class="home">
    <swiper class="mySwiper" :options='swiperOption' ref="mySwiper">
      <swiper-slide v-for="(item,index) in images" :key="index">
        <img :src="item"> 
      </swiper-slide> 
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
// 使用node的require.context()方法来获取图片的路径数组
// 不能使用直接定义字符串的形式来当做资源路径使用
const images = require.context('../assets/images',false,/\.(png|jpg)$/i);
const imagesList = images.keys().map(item => images(item));
// 注册的时候开头不能大写
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "Home",
  data() {
    return {
      images: imagesList,
      swiperOption: {
        //   尽量使用对象的形式来定义配置属性
        autoplay: {
          delay: 3000,
          //用户触碰到之后不会停止轮播图切换
          disableOnInteraction: false,
        },
        loop: true,
        speed: 1000,
        // 小圆点
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        // 前后切换按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    };
  },
  computed: {
    swiper() {
      // 获取到swiper的对象
      return this.$refs.mySwiper.swiper;
    }
  },
  destroy() {
    // 可以在任意的地方调用，swiper对象上的方法
    console.log(this.swiper);
    // 销毁swiper对象，
    this.swiper.destroy(true);
  },
  components: {
    swiper,
    swiperSlide,
  },
};
</script>

<style scoped>
.swiper-container {
  position: relative;
  width: 100%;
}

.swiper-container img {
  width: 100%;
}

// 修改小圆点的样式
.swiper-container >>> .swiper-pagination-bullet {
  background:  #676767;
}

// 修改被选中小圆点的样式
.swiper-container >>> .swiper-pagination-bullet-active {
  background:#ffaf00;
}


// 修改前后按钮的样式
.swiper-container >>> .swiper-button-prev, 
.swiper-container >>> .swiper-button-next {
  border: none;
  outline: none;
}
</style>
```