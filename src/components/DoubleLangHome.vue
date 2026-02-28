<template>
    <div class="row-container">
        <div class="text-col">
            <div class="text-section">
                <h1 class="main-desc">一键制作双语视频</h1>
                <div class="sub-desc">
                    <span>自动识别原字幕内容及位置，智能编排目标字幕位置</span><br/>
                    <el-button type="success" round size="large" class="begin-double">开始制作</el-button>
                </div>
            </div>
        </div>
        <div class="img-col">
            <div class="img-section">
                <img src="../assets/double_lang.png" class="double-lang-img">
            </div>
        </div>
    </div>
</template>

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
