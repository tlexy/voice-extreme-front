<script setup lang="ts">
import NavHome from '../components/NavHome.vue'

import { reactive } from 'vue'
import { ref } from 'vue'
import { UploadFilled, Refresh } from '@element-plus/icons-vue'

// 响应式数据
const videoUrl = ref('')
const fileInput = ref<HTMLInputElement>()
const uploadVideoInput = ref<File | null>(null)

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
        uploadVideoInput.value = file

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
    uploadVideoInput.value = null
    uploadProgress.value = 0
}

import api from '../api/api'
import TOS from '@volcengine/tos-sdk';

// 上传视频
function uploadVideo() {
    api.post('/v1/tos/token', {})
        .then(res => {
            //console.log(res.data)
            handleUpload(res.data)
        })
        .catch(err => {
            console.error('获取上传token失败', err)
        })
}

function handleUpload(tokenRes: any) {
    if (tokenRes.code !== 200) {
        console.error('获取上传token失败')
        return
    }
    console.log("start upload video")
    const token = tokenRes.data.token
    const accessKey = tokenRes.data.access_key_id
    const secretKey = tokenRes.data.access_key_secret
    console.log(accessKey)
    console.log(secretKey)

    const client = new TOS({
         // 从 STS 服务获取的临时访问密钥 AccessKeyId
        accessKeyId: accessKey,
        // 从 STS 服务获取的临时访问密钥 AccessKeySecret
        accessKeySecret: secretKey,
        // 从 STS 服务获取的安全令牌 SessionToken
        stsToken: token,
        // 填写 Bucket 所在地域。以华北2（北京）为例，Region 填写为cn-beijing
        region: 'cn-beijing',
        // 填写 bucket 名称
        bucket: 'alpha-voice-extreme',
    })

    const headers = {
        // 指定该 Object 被下载时网页的缓存行为。
        // 'Cache-Control': 'no-cache',
        // 指定过期时间。
        // 'Expires': 'Wed, 08 Jul 2022 16:57:01 GMT',
        // 指定 Object 的存储类型。
        'x-tos-storage-class': 'Standard',
        // 指定 Object 的访问权限。
        'x-tos-acl': 'private',
      };

      async function putObject(data:any) {
        try {
          // 填写 Object 完整路径。Object 完整路径中不能包含 Bucket 名称。
          // 您可以通过自定义文件名（例如 exampleobject.txt）或文件完整路径（例如 exampledir/exampleobject.txt）的形式实现将数据上传到当前 Bucket 或 Bucket 中的指定目录。
          // data 对象可以自定义为 File 对象、Blob 数据。
          const result = await client.putObject({
            key: "exampledir/exampleobject.mp4",
            body: data,
            progress: (progressEvent: any) => {
                uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            },
          });
          console.log(result);
        } catch (e) {
          console.log(e);
        }
      }

      if (uploadVideoInput.value) {
        console.log("开始上传")
        putObject(uploadVideoInput.value)
      }
}


</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header class="fixed-header">
                <NavHome :isLogin="false" />
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
                            <input ref="fileInput" id="uploadVideo" type="file" accept="video/*" style="display: none"
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
                                            <el-button type="warning" size="large" @click="uploadVideo">开始上传</el-button>
                                            <p></p>
                                            <el-progress :text-inside="true" :stroke-width="24"
                                                :percentage="uploadProgress" status="success" />
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
    flex: 1;
    margin-top: 80px;
    /* 调整为header的实际高度，确保内容不被遮挡 */
    padding: 0;
    overflow-y: auto;
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
    min-height: calc(100vh - 80px);
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
    max-height: 70vh;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    overflow-y: hidden;
}

.video-player-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
 
.video-player-container video {
    max-width: 100%;
    max-height: 50vh;
    object-fit: contain;
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