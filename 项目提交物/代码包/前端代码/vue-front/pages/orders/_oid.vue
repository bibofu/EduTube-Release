<template>
  <div class="Page Confirm">
    <div class="Title">
      <h1 class="fl f20">订单确认</h1>
      <!-- <img src="~/assets/img/cart_setp2.png" class="fr"> -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="fr">
        <el-breadcrumb-item :to="{ path: '/course/' + this.order.courseId }"
          >购买课程</el-breadcrumb-item
        >
        <el-breadcrumb-item>查看订单</el-breadcrumb-item>
        <el-breadcrumb-item>支付订单</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="clear"></div>
    </div>
    <form name="flowForm" id="flowForm" method="post" action="">
      <table class="GoodList">
        <tbody>
          <tr class="table-title">
            <th class="name">课程</th>
            <th class="price">原价</th>
            <th class="priceNew">价格</th>
          </tr>
        </tbody>
        <tbody>
          <!-- <tr>
          <td colspan="3" class="Title red f18 fb"><p>限时折扣</p></td>
        </tr> -->
          <!-- <tr>
            <td colspan="3" class="teacher">讲师：{{ order.teacherName }}</td>
          </tr> -->
          <tr class="good">
            <td class="name First">
              <a
                target="_blank"
                :href="'http://localhost:9112/course/' + order.courseId"
              >
                <img :src="order.courseCover"
              /></a>
              <div class="goodInfo">
                <input type="hidden" class="ids ids_14502" value="14502" />
                <a
                  target="_blank"
                  :href="'http://localhost:9112/course/' + order.courseId"
                  >{{ order.courseTitle }}</a
                >
                <span class="teacher">讲师：{{ order.teacherName }}</span>
              </div>
            </td>
            <td class="price">
              <p>
                ￥<strong>{{ order.totalFee }}</strong>
              </p>
              <!-- <span class="discName red">限时8折</span> -->
            </td>
            <td class="priceNew Last">
              ￥<strong>{{ order.totalFee }}</strong>
            </td>
          </tr>
          <tr>
            <td class="Billing tr" colspan="3">
              <div class="tr">
                <div class="o-info">
                  订单号：{{ order.orderNo }}
                  <br />
                  订单创建时间：{{ order.gmtCreate }}
                </div>
                <p>
                  共 <strong>1</strong> 套课程，合计<span class="f20"
                    ><strong>￥{{ order.totalFee }}</strong></span
                  >
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="Finish">
        <div class="fr mb20 mr40" id="AgreeDiv">
          <label for="Agree"
            ><p class="on">
              <input type="checkbox" checked="checked" />我已阅读并同意<a
                href="javascript:"
                target="_blank"
                >《EduTube 购买协议》</a
              >
            </p></label
          >
        </div>
        <div class="clear"></div>
        <div class="Main fl">
          <div class="fl">
            <a :href="'/course/' + order.courseId">返回课程详情页</a>
          </div>
          <div class="fr">
            <p>
              共 <strong>1</strong> 件商品，合计<span class="f20"
                ><strong id="AllPrice">￥{{ order.totalFee }}</strong></span
              >
            </p>
          </div>
        </div>
        <input name="score" value="0" type="hidden" id="usedScore" />
        <button class="fr" type="button" id="submitPay" @click="toPay()">
          去支付
        </button>
        <div class="clear"></div>
      </div>
    </form>
  </div>
</template>
<script>
import ordersApi from "@/api/orders";
export default {
  asyncData({ params, error }) {
    return ordersApi.getOrdersInfo(params.oid).then((response) => {
      return {
        order: response.data.data.item,
      };
    });
  },
  created() {
    console.log(this.order);
  },
  methods: {
    //去支付
    toPay() {
      this.$router.push({ path: "/pay/" + this.order.orderNo });
    },
  },
};
</script>

<style>
.o-info {
  float: left;
  margin-left: 45px;
  line-height: 35px;
  text-align: left;
  color: #999;
}
</style>