<template>
  <div class="common-layout">
    <el-container>
      <el-header class="fixed-header">
        <NavHome :isLogin="false" />
      </el-header>
      <el-main class="login-container">
        <div class="login-content">
          <!-- 左侧表单区域 -->
          <div class="login-left">
            <div class="login-wrap">
              <h2 class="login-title">密码登录</h2>

              <el-form
                ref="loginFormRef"
                :model="loginForm"
                :rules="rules"
                label-position="top"
              >
                <!-- 用户名/手机号/邮箱 -->
                <el-form-item label="用户名/手机号/邮箱" prop="account">
                  <el-input
                    v-model="loginForm.account"
                    placeholder="请输入用户名/手机号/邮箱"
                    clearable
                    size="large"
                  />
                </el-form-item>

                <!-- 密码 -->
                <el-form-item label="密码" prop="password">
                  <el-input
                    v-model="loginForm.password"
                    type="password"
                    placeholder="请输入密码"
                    show-password
                    clearable
                    size="large"
                  />
                </el-form-item>

                <!-- 记住我和忘记密码 -->
                <div class="form-footer">
                  <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
                  <el-link type="primary" :underline="false">忘记密码？</el-link>
                </div>

                <!-- 登录按钮 -->
                <el-button
                  type="primary"
                  size="large"
                  style="width: 100%; margin-top: 8px"
                  @click="handleLogin"
                >登录</el-button>

                <!-- 注册跳转 -->
                <div class="register-link">
                  没有账号？
                  <el-link type="primary" :underline="false" @click="goRegister">立即注册</el-link>
                </div>
              </el-form>
            </div>
          </div>

          <!-- 右侧图片区域 -->
          <div class="login-right">
            <img src="../assets/double_lang.png" alt="AI Technology" />
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import NavHome from '../components/NavHome.vue'
import api from '../api/api'

const router = useRouter()
const loginFormRef = ref<FormInstance>()

const loginForm = reactive({
  account: '',
  password: '',
  remember: false,
})

const rules: FormRules = {
  account: [
    { required: true, message: '请输入用户名/手机号/邮箱', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 位', trigger: 'blur' },
  ],
}

async function handleLogin() {
  if (!loginFormRef.value) return
  const valid = await loginFormRef.value.validate().catch(() => false)
  if (!valid) return

  try {
    const response = await api.post('/api/login', {
      account: loginForm.account,
      password: loginForm.password,
      remember: loginForm.remember,
    })

    // 登录成功处理
    if (response.data.code === 200 || response.data.success) {
      ElMessage.success('登录成功')

      // 保存 token 或用户信息
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }
      if (response.data.userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo))
      }

      // 跳转到首页或其他页面
      router.push('/')
    } else {
      ElMessage.error(response.data.message || '登录失败')
    }
  } catch (error: any) {
    console.error('登录错误:', error)
    ElMessage.error(error.response?.data?.message || '登录失败，请稍后重试')
  }
}

function goRegister() {
  router.push('/register')
}
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

.login-container {
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: center;
  background-color: #ffffff;
  overflow: hidden;
}

.login-content {
  display: flex;
  width: 100%;
  height: 100%;
}

.login-left {
  flex: 5.5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #f5f7fa;
}

.login-right {
  flex: 4.5;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 20px;
}

.login-right img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.login-wrap {
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  font-size: 22px;
  color: #303133;
  margin: 0 0 28px;
  font-weight: 500;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #909399;
}
</style>
