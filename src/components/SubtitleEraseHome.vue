<template>
    <el-row>
        <el-col :span="16">
            <div class="grid-content ep-bg-purple-dark">
                <img src="../assets/double_lang.png" class="double-lang-img">
            </div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content ep-bg-purple-dark">
                <h1 class="main-desc">智能字幕擦除</h1>
                <div class="sub-desc">
                <span>智能识别字幕并擦除</span><br/>
                <el-button type="success" round size="large" class="begin-double" @click="handleClick">开始擦除</el-button>
                </div>
            </div>
        </el-col>
    </el-row>
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
.double-lang-img {
    width: 700px;
    height: auto;
}

.sub-desc {
    text-align: left;
    display: block;
    font-size: 24px;
}

.begin-double {
    margin-top: 120px;
    text-align: left;
}



.main-desc {
    text-align: left;
    font-weight: bold;
}
</style>
