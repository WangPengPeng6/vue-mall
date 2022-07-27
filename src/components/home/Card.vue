<template>
  <div class="titlt">
        <slot>
            <span>今日推荐</span>
        </slot>
    </div>
</template>

<script>
export default {
name:'Card',
}
</script>

<style lang="less" scoped>
.titlt{
        width: 100%;
        text-align: center;
        font-size: .5333rem;
        padding: .4267rem 0;
        span{
            font-weight: 700;
            position: relative;
            &::after{
                content: "";
                display: block;
                position: absolute;
                right: -0.5rem;
                top: 50%;
                margin-top: -4px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #d4c0a7;
            }
            &::before{
                content: "";
                display: block;
                position: absolute;
                top: 50%;
                left: -0.5rem;
                margin-top: -4px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #d4c0a7;
            }
        }
    }
</style>