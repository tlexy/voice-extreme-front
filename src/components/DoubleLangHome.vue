<template>
    <el-row>
        <el-col :span="8">
            <div class="grid-content ep-bg-purple-dark">
                <h1 class="main-desc">一键制作双语视频</h1>
                <div class="sub-desc">
                <span>自动识别原字幕内容及位置，智能编排目标字幕位置</span><br/>
                <el-button type="success" round size="large" class="begin-double">开始制作</el-button>
                </div>
            </div>
        </el-col>
        <el-col :span="16">
            <div class="grid-content ep-bg-purple-dark">
                <img src="../assets/double_lang.png" class="double-lang-img">
            </div>
        </el-col>
    </el-row>
</template>

<style scoped>
.double-lang-img {
    width: 700px;
    height: auto;
}

.sub-desc {
    text-align: left;
    display: inline-block;
    font-size: 24px;
    left: 0;
}

.begin-double {
    margin-top: 120px;
}



.main-desc {
    text-align: left;
    font-weight: bold;
}
</style>
