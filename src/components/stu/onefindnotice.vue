<template>
  <div class="reply-box">
    <p v-if="comment.length==0">暂无评论，我来发表第一篇评论！</p>
    <dl v-else>
      <dd class="dynamic-pinglun dyn-huifu" v-for="(item,index) in comment" :index="index" :key="item.index">
        <ul class="box">
          <li class="left">
            <img :src="item.img" alt="">
          </li>
          <li class="right">
          <span class="name">{{item.name}}</span>
          <span class="text">{{item.con}}</span>
          <p class="time">{{item.time}}</p>
        </li>
          <div class="clear"></div>
          <div class="huifu-btn" @click="changecomer(item.name, index)">回复</div>
        </ul>
        <div v-if="item.reply">
          <div class="two-huifu" v-if="item.reply.length > 0">
            <ul class="box twobox" v-for="reply in item.reply" :key="reply.index">
              <li class="left">
                <img src="../../../static/images/touxiang.png" alt="">
              </li>
              <li class="right">
                <span class="name">{{reply.responder}}@{{reply.reviewers}}:</span>
                <span class="text">{{reply.content}}</span>
                <p class="time">{{reply.time}}</p>
              </li>
              <div class="huifu-btn" @click="changecomer(reply.responder, index)">回复</div>
            </ul>
          </div>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
    export default {
        name: "onefindnotice",
      props: ['comment'],
      methods: {
        changecomer: function (name, index) {
          this.$emit("change", name, index)
        }
      }
    }
</script>

<style scoped lang="scss" type="text/scss">
  .box {
    overflow: hidden;
    margin-bottom: 15px;
    .left {
      width: 30px;
      height: 30px;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      float: left;
      width: 90%;
      padding-left: 10px;
      box-sizing: border-box;
      input {
        width: 99%;
        height: 26px;
        vertical-align: top;
      }
    }
  }
  .two-huifu {
    margin: 10px 0;
    .right {
      width: 90%;
    }
  }
  .twobox {
    overflow: hidden;
    margin-left: 32px;
    background: #eaeaec;
    padding: 10px;
    border-bottom: solid 1px #d9d9d9;
    margin-bottom: 0
  }
  .twobox:last-child {
    border: 0
  }
  .huifu-btn {
    float: right;
  }
  .time {color: #808080;font-size: 12px;}
  .dyn-huifu {
    padding-top: 15px;
    border-top: solid 1px #d9d9d9;
  }
</style>

