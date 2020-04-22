<template>
    <div class="choose_type_page">
        <div class="choose_back_btn" @click="backHome"></div>
        <h2 class="choose_type_title">选择你想参赛的类型</h2>
        <div class="type_block_container">
            <div class="type_block" @click="choose(1)"></div>
            <div class="type_block" @click="choose(2)"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'chooseType',
    data(){
        return {
            type: 1
        }
    },
    methods:{
        backHome() {
            this.$router.replace("/");
        },
        choose(type){
            this.type = type
            this.$router.push(`/record?type=${this.type}`);
        },
    }
    

}
</script>

<style lang='less' scoped>
.choose_type_page {
    width: 100%;
    height: 100%;
    background: url('../assets/img/record_bg.png') center no-repeat;
    background-size: cover;
    box-sizing: border-box;
    padding: 16px;

    .choose_back_btn {
        width: 90px;
        height: 40px;
        background: url('../assets/img/back_home_btn.png') center no-repeat;
        background-size: contain;
    }
    .choose_type_title {
        color: #cf5571;
        margin-top: 108px;
        font-size: 23px;
        font-weight: normal;
        text-align: center;
    }
    .type_block_container {
        display: flex;
        justify-content: center;
        margin-top: 32px;
         .type_block {
            width: 160px;
            height: 160px;
            &:nth-of-type(1){
                background: url('../assets/img/choose_read.png') center no-repeat;
                background-size: contain;
            }
            &:nth-of-type(2){
                background: url('../assets/img/choose_story.png') center no-repeat;
                    background-size: contain;
                    margin-left: -10px;
                    margin-top: 70px;
            }
        } 
    }
}
  
</style>