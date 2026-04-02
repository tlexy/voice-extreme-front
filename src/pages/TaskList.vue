<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import api from '../api/api'
import TaskUnit from './TaskUnit.vue'

interface TaskItem {
  id: string
  task_name: string
  target_language: string
  duration_seconds: number
  screenshot_url: string
}

const tasks = ref<TaskItem[]>([])

function normalizeTask(item: any): TaskItem {
  return {
    id: String(item?.id ?? ''),
    task_name: String(item?.task_name ?? ''),
    target_language: String(item?.target_language ?? ''),
    duration_seconds: Number(item?.duration_seconds ?? 0),
    screenshot_url: String(item?.screenshot_url ?? ''),
  }
}

async function fetchTaskList() {
  const token = localStorage.getItem('token') || ''

  try {
    const res = await api.post('/v1/task/list', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.data?.code === 0) {
      const list = Array.isArray(res.data?.data) ? res.data.data : []
      tasks.value = list.map(normalizeTask)
    } else {
      ElMessage.error(res.data?.message || '获取任务列表失败')
    }
  } catch (error) {
    console.error('获取任务列表失败', error)
    ElMessage.error('获取任务列表失败')
  }
}

onMounted(() => {
  fetchTaskList()
})
</script>

<template>
  <div class="task-list-page">
    <div class="task-list">
      <TaskUnit
        v-for="task in tasks"
        :key="task.id || task.task_name"
        :task="task"
      />
    </div>
  </div>
</template>

<style scoped>
.task-list-page {
  padding: 20px;
}

.task-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
