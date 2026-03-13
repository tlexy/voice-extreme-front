<template>
  <div class="common-layout">
    <el-container>
      <el-header class="fixed-header">
        <NavHome :isLogin="false" />
      </el-header>
      <el-main class="register-container">
        <div class="register-wrap">
          <h2 class="register-title">用户注册</h2>
          <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="rules"
        label-width="100px"
        label-position="left"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="请输入用户名"
            clearable
          />
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
            clearable
          />
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            show-password
            clearable
          />
        </el-form-item>

        <!-- 手机号（可选） -->
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="registerForm.phone"
            placeholder="请输入手机号（选填）"
            clearable
          />
        </el-form-item>

        <!-- 邮箱（可选） -->
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="registerForm.email"
            placeholder="请输入邮箱（选填）"
            clearable
          />
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item label="验证码" prop="captcha">
          <div class="captcha-row">
            <el-input
              v-model="registerForm.captcha"
              placeholder="请输入验证码"
              clearable
              style="flex: 1"
            />
            <div class="captcha-img" @click="refreshCaptcha" title="点击刷新验证码">
              <canvas ref="captchaCanvas" width="120" height="40" />
            </div>
          </div>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" style="width: 48%" @click="handleRegister">注册</el-button>
          <el-button style="width: 48%; margin-left: 4%" @click="handleReset">重置</el-button>
        </el-form-item>
        </el-form>
      </div>
    </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import NavHome from '../components/NavHome.vue'
import api from '../api/api'

const router = useRouter()

const registerFormRef = ref<FormInstance>()
const captchaCanvas = ref<HTMLCanvasElement>()
let captchaCode = ''

const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  email: '',
  captcha: '',
})

const validateConfirmPassword = (_: unknown, value: string, callback: (err?: Error) => void) => {
  if (value !== registerForm.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const validateCaptcha = (_: unknown, value: string, callback: (err?: Error) => void) => {
  if (value.toLowerCase() !== captchaCode.toLowerCase()) {
    callback(new Error('验证码错误'))
  } else {
    callback()
  }
}

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度为 3~20 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' },
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' },
  ],
  email: [
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { validator: validateCaptcha, trigger: 'blur' },
  ],
}

function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  captchaCode = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  drawCaptcha()
}

function drawCaptcha() {
  const canvas = captchaCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!
  const w = canvas.width
  const h = canvas.height

  ctx.clearRect(0, 0, w, h)

  // 背景
  ctx.fillStyle = '#f0f4ff'
  ctx.fillRect(0, 0, w, h)

  // 干扰线
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = `hsl(${Math.random() * 360}, 60%, 70%)`
    ctx.beginPath()
    ctx.moveTo(Math.random() * w, Math.random() * h)
    ctx.lineTo(Math.random() * w, Math.random() * h)
    ctx.stroke()
  }

  // 验证码文字
  const colors = ['#e74c3c', '#2980b9', '#27ae60', '#8e44ad']
  captchaCode.split('').forEach((char, i) => {
    ctx.font = `bold ${20 + Math.random() * 6}px Arial`
    ctx.fillStyle = colors[i % colors.length]
    ctx.save()
    ctx.translate(15 + i * 26, h / 2 + 6)
    ctx.rotate((Math.random() - 0.5) * 0.4)
    ctx.fillText(char, 0, 0)
    ctx.restore()
  })

  // 干扰点
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.3})`
    ctx.beginPath()
    ctx.arc(Math.random() * w, Math.random() * h, 1, 0, Math.PI * 2)
    ctx.fill()
  }
}

function refreshCaptcha() {
  generateCaptcha()
}

async function handleRegister() {
  if (!registerFormRef.value) return
  const valid = await registerFormRef.value.validate().catch(() => false)
  if (!valid) return

  try {
    const response = await api.post('/api/register', {
      username: registerForm.username,
      password: registerForm.password,
      phone: registerForm.phone || undefined,
      email: registerForm.email || undefined,
    })

    // 注册成功处理
    if (response.data.code === 200 || response.data.success) {
      ElMessage.success('注册成功，即将跳转到登录页')

      // 延迟跳转到登录页
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } else {
      ElMessage.error(response.data.message || '注册失败')
      // 刷新验证码
      generateCaptcha()
    }
  } catch (error: any) {
    console.error('注册错误:', error)
    ElMessage.error(error.response?.data?.message || '注册失败，请稍后重试')
    // 刷新验证码
    generateCaptcha()
  }
}

function handleReset() {
  registerFormRef.value?.resetFields()
  generateCaptcha()
}

onMounted(() => {
  generateCaptcha()
})
</script>

<style scoped>
.common-layout {
  width: 100%;
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

.register-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  overflow: auto;
}

.register-wrap {
  width: 480px;
  padding: 16px 48px;
  background: linear-gradient(to right, transparent, #f5f7fa 15%, #f5f7fa 85%, transparent);
}

.register-title {
  text-align: center;
  font-size: 22px;
  color: #303133;
  margin: 0 0 20px;
  font-weight: 500;
}

.captcha-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.captcha-img {
  cursor: pointer;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}

.captcha-img canvas {
  display: block;
}
</style>
