<template>
    <div class="row-container">
        <div class="img-col">
            <div class="img-section">
                <img src="../assets/double_lang.png" class="double-lang-img">
            </div>
        </div>
        <div class="text-col">
            <div class="text-section">
                <h1 class="main-desc">智能字幕擦除</h1>
                <div class="sub-desc">
                    <span>智能识别字幕并擦除</span><br/>
                    <el-button type="success" round size="large" class="begin-double" @click="handleClick">开始擦除</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'
const router = useRouter()

function handleClick() {
    console.log('点击了开始擦除按钮')
    router.push('/creative')
}

</script>

<style scoped>
.row-container {
    display: flex;
    flex-wrap: nowrap;
    gap: 16px;
    align-items: stretch;
}

.text-col {
    flex: 0 0 30%;
    min-width: 260px;
}

.img-col {
    flex: 1 1 auto;
    min-width: 300px;
}

.double-lang-img {
    width: 100%;
    height: auto;
}

.img-section {
    text-align: center;
}

.text-section {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.sub-desc {
    text-align: left;
    display: block;
    font-size: 20px;
}

.begin-double {
    margin-top: auto;
    padding-bottom: 4px;
}

.main-desc {
    text-align: left;
    font-weight: bold;
}
</style>
