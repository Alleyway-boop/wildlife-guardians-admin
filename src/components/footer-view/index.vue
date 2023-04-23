<template>
  <div class="footer-box">
    <div>
      Copyright © 2023 <span>珍稀护卫</span> All right reserved
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.footer-box {
  display: flex;
  justify-content: center;
  background-color: #444;
  height: 100%;
  align-items: center;

  div {
    color: #fff;

    span {
      color: #33CABB;
      transition: all .5s;
    }

    span:hover {
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>