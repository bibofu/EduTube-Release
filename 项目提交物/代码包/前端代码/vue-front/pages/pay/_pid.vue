<template>
  <div class="Page Confirm">
    <!--主内容-->
    <div class="Title">
      <h1 class="fl f20">订单确认</h1>
      <!-- <img src="~/assets/img/cart_setp2.png" class="fr"> -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="fr">
        <el-breadcrumb-item :to="{ path: '/course/' + this.order.courseId}"
          >购买课程</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/orders/' + this.order.orderNo }">查看订单</el-breadcrumb-item>
        <el-breadcrumb-item>支付订单</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="clear"></div>
    </div>
    <div class="checkout py-container  pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt"><span class="success-icon"></span><span class="success-info">订单提交成功，请您及时付款！订单号：{{order.orderNo}}</span>
        </h4>
        <span class="fr"><em class="sui-lead">应付金额：</em><em class="orange money">{{order.totalFee}}￥</em></span>
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin">微信支付</div>
        <div class="fl sao">
          <p class="red">请使用微信扫一扫。</p>
          <div class="fl code">
            <img id="qrious" src="~/assets/img/code.png" alt="" width="300px">
            <div class="codeText">
              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
            </div>
          </div>
        </div>
        <el-button class="fr" style="background: #4e9bf3;color:#ffffff;" @click="hasPay()">已支付</el-button>
        <div class="clearfix"></div>
        <!-- <p><a href="pay.html" target="_blank">> 其他支付方式</a></p> -->
        
      </div>
    </div>
  </div>
</template>
<style>
.codeText{
  text-align:center;
}
</style>
<script>
import ordersApi from '@/api/orders'
import {Message} from 'element-ui'
export default {
     asyncData({ params, error }) {
          console.log(params)
          return ordersApi.getOrdersInfo(params.pid).then((response) => {
            console.log(response.data.data.item)
            return {
              order: response.data.data.item,
            };
          });
     },
     data() {
         return {
             order:'',
         }
     },
     //每隔三秒调用一次查询订单状态的方法
     mounted() {//页面渲染之后执行
        
     },
     methods:{
         hasPay(){
           Message.success("感谢您的支持，购买课程成功");
           ordersApi.buyCourse(this.order.orderNo).then((response)=>{
             console.log(response.data);
             this.$router.push("/course/"+ this.order.courseId);
           })
         }
     }
}
</script>