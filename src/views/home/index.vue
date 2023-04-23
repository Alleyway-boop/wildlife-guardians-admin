<template>
  <div class="common-layout">
    <el-container>
      <el-aside style="padding: 0" width="200px">
        <MenuView style="padding: 0"></MenuView>
      </el-aside>

      <el-container style="padding: 0">

        <el-header>
          <HeaderView></HeaderView>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>

        <el-footer>
          <FooterView></FooterView>
        </el-footer>

      </el-container>

    </el-container>
  </div>
</template>

<script setup>
import HeaderView from '@/components/header-view/index.vue'
import MenuView from '@/components/menu/index.vue'
import FooterView from '@/components/footer-view/index.vue'


</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}

.el-aside {
  padding: 0;
  height: 100vh;
}

.el-main {
  margin-top: 20px;
}

.el-footer {
  padding: 0;
}
</style>