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
        <el-row>
          <el-col :span="6">
              <div class="grid-content ep-bg-purple" />
          </el-col>
          <el-col :span="12">
            <DoubleLangHome />
            <br/>
            <SubtitleEraseHome />
          </el-col>
          <el-col :span="6">
              <div class="grid-content ep-bg-purple" />
          </el-col>
        </el-row>
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

:deep(.el-container) {
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex; /* 启用弹性布局 */
  flex-direction: column; /* 设置垂直方向的布局 */
}

.main-content {
  position: fixed;
  top: 0;
  margin: 0;
  left:0;
  right: 0;
  margin-top: 120px;
  /* 调整为header的实际高度，确保内容不被遮挡 */
  padding: 0;
  flex: 1; /* 占据剩余空间，将footer推到底部 */
}

:deep(.el-footer) {
  margin-top: auto; /* 确保footer始终在底部 */
}
</style>