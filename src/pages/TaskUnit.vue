<script setup lang="ts">
interface TaskItem {
  id: string
  task_name: string
  target_language: string
  duration_seconds: number
  screenshot_url: string
}

defineProps<{
  task: TaskItem
}>()
</script>

<template>
  <div class="task-card">
    <img
      v-if="task.screenshot_url"
      :src="task.screenshot_url"
      :alt="task.task_name || '任务截图'"
      class="task-image"
    />
    <div v-else class="task-image placeholder">暂无截图</div>

    <div class="task-content">
      <p class="task-name">{{ task.task_name || '未命名任务' }}</p>
      <p>目标语言：{{ task.target_language || '-' }}</p>
      <p>任务时长：{{ task.duration_seconds }} 秒</p>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  width: 100%;
  max-width: 200px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.task-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
  background: #f5f7fa;
}

.task-content {
  padding: 10px;
  box-sizing: border-box;
}

.task-content p {
  margin: 4px 0;
  font-size: 13px;
  word-break: break-word;
}

.task-name {
  font-weight: 500;
}
</style>
