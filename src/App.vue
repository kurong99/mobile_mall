<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
:root {
  /* 定义字体变量 */
  --font-primary: "PingFang SC", "Helvetica Neue", "Microsoft YaHei", "Source Han Sans SC", "Noto Sans CJK SC", "WenQuanYi Micro Hei", sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  font-family: var(--font-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}

/* 定义不同文字大小的类 */
.text-xs {
  font-size: 12px;
  line-height: 16px;
}

.text-sm {
  font-size: 14px;
  line-height: 20px;
}

.text-base {
  font-size: 16px;
  line-height: 24px;
}

.text-lg {
  font-size: 18px;
  line-height: 28px;
}

.text-xl {
  font-size: 20px;
  line-height: 28px;
}

/* 定义不同文字粗细的类 */
.font-normal {
  font-weight: 400;
}

.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

.font-bold {
  font-weight: 700;
}

#app {
  width: 100%;
  height: 100%;
  max-width: 750px;
  margin: 0 auto;
  font-family: var(--font-primary);
}
</style>
