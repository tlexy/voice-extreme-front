<script setup lang="ts">
import DoubleLangHome from '../components/DoubleLangHome.vue';
import NavHome from '../components/NavHome.vue'
import SubtitleEraseHome from '../components/SubtitleEraseHome.vue'
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="fixed-header">
        <NavHome  :isLogin="true" />
      </el-header>
      <el-main class="main-content">
        <div class="content-wrapper">
          <DoubleLangHome />
          <br/>
          <SubtitleEraseHome />
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style scoped>

.common-layout {
  width: 100%;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  margin: 0;
  padding: 0;
}

.main-content {
  padding-top: 120px;
  padding-left: 40px;
  padding-right: 40px;
  flex: 1;
  overflow-x: auto;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}
</style>