<template>
  <router-view />
</template>

<style>
#app {
  margin: 0;
  padding: 0;
}
html,
body {
  margin: 0;
  padding: 0;
  font: 16px/1.5 "Microsoft Yahei", "PingFang SC", "Hiragino Sans GB",
    sans-serif;
}

@media screen and (max-width: 500px) {
  html.font-auto {
    font-size: 14px;
  }
}

@media screen and (min-width: 1930px) {
  html.font-auto {
    font-size: 18px;
  }
}

*,
*:before,
*:after {
  box-sizing: border-box;
}
::-webkit-scrollbar-thumb {
  background: rgba(189, 195, 199, 0.6);
  border-radius: 4px;
}
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}
body::-webkit-scrollbar {
  height: 0;
}
::-webkit-scrollbar-track:hover {
  border-radius: 4px;
  background: rgba(189, 195, 199, 0.1);
}

body::-webkit-scrollbar-thumb {
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.07);
}

body::-webkit-scrollbar-track:hover {
  border-radius: 0;
  box-shadow: inset 1px 0 0 rgba(0, 0, 0, 0.1);
}
.el-form-item__label {
  user-select: none;
}
* {
  scroll-behavior: smooth;
}

a {
  color: #3498db;
  text-decoration: none;
  transition: color 0.5s;
}

a:hover {
  color: #ffc670;
}
</style>
