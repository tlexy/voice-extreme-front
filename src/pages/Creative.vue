<script setup lang="ts">
import NavHome from '../components/NavHome.vue'

import { reactive } from 'vue'
import { ref } from 'vue'
import { UploadFilled, Refresh } from '@element-plus/icons-vue'

// 响应式数据
const videoUrl = ref('')
const fileInput = ref<HTMLInputElement>()

// 触发文件选择
const triggerFileInput = () => {
    fileInput.value?.click()
}

// 处理文件选择
const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
        // 创建视频预览URL
        videoUrl.value = URL.createObjectURL(file)

        // 重置文件输入，允许选择相同的文件
        target.value = ''
    }
}

// do not use same name with ref
const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    target: '',
})

let textRecognitionMode = ref('ocr')
let textEraseMode = ref('keep')
let ttsMode = ref('keep')
let uploadProgress = ref(0)


// 重新上传
const resetUpload = () => {
    videoUrl.value = ''
}
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header class="fixed-header">
                <NavHome  :isLogin="false" />
            </el-header>
            <el-main class="main-content">
                <el-row class="creative-container">
                    <el-col :span="16" class="left-section">
                        <!-- 左侧 是视频上传页-->
                        <div v-if="!videoUrl" class="upload-area">
                            <el-button type="primary" size="large" @click="triggerFileInput">
                                <el-icon>
                                    <UploadFilled />
                                </el-icon>
                                选择视频
                            </el-button>
                            <input ref="fileInput" type="file" accept="video/*" style="display: none"
                                @change="handleFileSelect" />
                            <p class="hint-text">点击按钮选择本机视频文件</p>
                        </div>
                        <div v-else class="video-player">
                            <el-row>
                                <el-col :span="12" class="video-player-container">
                                    <video ref="videoElement" :src="videoUrl" controls autoplay muted width="100%"
                                        height="auto">
                                        您的浏览器不支持视频播放
                                    </video>
                                    <el-button type="info" size="large" @click="resetUpload" style="margin-top: 10px;">
                                        <el-icon>
                                            <Refresh />
                                        </el-icon>
                                        重新选择
                                    </el-button>
                                </el-col>
                                <el-col :span="12" class="video-uploader-container">
                                    <div class="upload-progress">
                                        <div class="upload-progress-top"></div>
                                        <div class="upload-progress-content">
                                            <el-button type="warning" size="large">开始上传</el-button>
                                            <p></p>
                                            <el-progress :text-inside="true" :stroke-width="24" :percentage="uploadProgress"
                                                status="success" />
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <el-col :span="8" class="right-section">
                        <!-- 右侧 是视频处理选项页-->
                        <div class="right-content">
                            <h3>视频处理选项</h3>
                            <el-form :model="form" label-width="auto" style="max-width: 600px">
                                <el-form-item label="原始语言">
                                    <el-select v-model="form.region" placeholder="选择视频原语言">
                                        <el-option label="Zone one" value="shanghai" />
                                        <el-option label="Zone two" value="beijing" />
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="目标语言">
                                    <el-select v-model="form.target" placeholder="请选择目标语言">
                                        <el-option label="Zone one" value="shanghai" />
                                        <el-option label="Zone two" value="beijing" />
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="字幕识别模式" label-position="right">
                                    <br />
                                    <el-radio-group v-model="textRecognitionMode" aria-label="item label position">
                                        <el-radio-button value="ocr">画面识别</el-radio-button>
                                        <el-radio-button value="asr">音频识别</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="字幕擦除模式" label-position="right">
                                    <br />
                                    <el-radio-group v-model="textEraseMode" aria-label="item label position">
                                        <el-radio-button value="keep">保留原字幕</el-radio-button>
                                        <el-radio-button value="erase">智能擦除</el-radio-button>
                                        <el-radio-button value="rect" disabled>框选擦除</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="配音模式" label-position="right">
                                    <br />
                                    <el-radio-group v-model="ttsMode" aria-label="item label position">
                                        <el-radio-button value="keep">保留原音</el-radio-button>
                                        <el-radio-button value="target">目标语言配音</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                            </el-form>
                            <div class="submit-button-container">
                                <el-button type="primary" size="large">
                                    <el-icon>
                                        <UploadFilled />
                                    </el-icon>
                                    提交
                                </el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<style scoped>
.common-layout {
    width: 100%;
    margin: 0;
    padding: 0;
    /* 确保容器至少占满整个视口高度 */
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

.upload-progress {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    /* 或具体高度 */
    text-align: left;
    margin-left: 20px;
}

.upload-progress-content {
    margin-top: auto;
    margin-bottom: 60px;
}

.main-content {
    position: fixed;
    top: 0;
    margin: 0;
    left: 0;
    right: 0;
    margin-top: 80px;
    /* 调整为header的实际高度，确保内容不被遮挡 */
    padding: 0;
}

.submit-button-container {
    text-align: left;
    margin-top: 20px;
}

.creative-container {
    width: 100%;
    margin: 0;
    padding: 0;
}

.left-section,
.right-section {
    min-height: 80vh;
    padding: 40px;
    box-sizing: border-box;
}

.left-section {
    background-color: #f5f7fa;
    display: flex;
    align-items: center;
    justify-content: center;
}

.right-section {
    background-color: #ffffff;
    border-left: 1px solid #e4e7ed;
}

.upload-area {
    text-align: center;
    border: 2px dashed #dcdfe6;
    border-radius: 8px;
    background-color: #ffffff;
    width: 100%;
    max-width: 500px;
    height: auto;
}

.hint-text {
    margin-top: 20px;
    color: #909399;
    font-size: 14px;
}

.video-player {
    width: 100%;
    max-width: 1200px;
    max-height: 70hv;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.right-content {
    margin-top: 60px;
}

.right-content h3 {
    margin-bottom: 40px;
    color: #303133;
}

.placeholder-text {
    margin-top: 40px;
    color: #909399;
    font-size: 14px;
}
</style>