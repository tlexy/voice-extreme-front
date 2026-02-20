<script setup lang="ts">
import {useRouter} from 'vue-router'

const router = useRouter()
defineProps<{ isLogin: boolean }>()
function goHome() {
    router.push("/")
}
</script>
<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Ninth navbar example">
    <div class="container-xl">
      <a class="navbar-brand" href="#" @click="goHome">Voice Extreme</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07XL" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample07XL">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">AI视频工具</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">AI字幕擦除</a></li>
              <li><a class="dropdown-item" href="#">双语视频制作</a></li>
              <li><a class="dropdown-item" href="#">AI视频配音</a></li>
            </ul>
          </li>
           <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">AI声音工具</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">声音克隆</a></li>
              <li><a class="dropdown-item" href="#">文本转语音</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">价格</a>
          </li>
        </ul>
        <el-button v-if="isLogin" type="primary">登录</el-button>
        <!-- <form role="search">
          <input class="form-control" type="search" placeholder="Search" aria-label="Search">
        </form> -->
      </div>
    </div>
  </nav>
</template>
