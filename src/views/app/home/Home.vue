<template lang="pug">
  .main-section.home
    .title(v-if="isAuth", @click="goAuthor")
      div.authorization
        i(class="el-icon-warning")
        div 为了保证您的正常使用，请先完成相关授权。
        div.goAuth 去授权
        i(class="el-icon-arrow-right")
    .content
      div.cartogram
        el-tabs.tabContent(v-model="active_name", @tab-click="handleClick")
          el-tab-pane.tabFont(
            :key="item.name"
            v-for="(item, index) in editable_tabs"
            :label="item.title"
            :name="item.name"
          )
        el-row.Statistics
          el-col.term(:span="6") 销售额 （元）
            el-row
              el-col.term(:span="6") ¥{{statistics.final_amount}}
          el-col.term(:span="6") 订单数 （笔）
            el-row
              el-col.term(:span="6") {{statistics.order_number}}
          el-col.term(:span="6") 会员数 （人）
            el-row
              el-col.term(:span="6") {{statistics.member_number}}
          el-col.term(:span="6") 企业微信好友数 （人）
            el-row
              el-col.term(:span="6") {{statistics.friends_number}}
      div.cartogram
        span.tabContent 指标达成率
          el-carousel(trigger="click", height="200px", arrow="never" ,:autoplay="false", indicator-position="outside")
            el-carousel-item
              el-row.Statistics
                el-col.term(:span="6") 销售额任务
                  el-row
                    el-col.term(:span="18") {{center_statistics.sales_task}} %
                el-col.term(:span="6") 礼劵使用任务
                  el-row
                    el-col.term(:span="12") {{center_statistics.coupons_task}} %
                el-col.term(:span="6") 会员招募任务
                  el-row
                    el-col.term(:span="12") {{center_statistics.member_task}} %
                el-col.term(:span="6") 客户标记任务
                  el-row
                    el-col.term(:span="12") {{center_statistics.customer_task}} %
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      statistics: {
        final_amount: 364,
        order_number: 998,
        member_number: 99,
        friends_number: 298
      }, // 上部分数据统计
      center_statistics: {
        sales_task: 298,
        coupons_task: 6698,
        member_task: 34,
        customer_task: 598
      }, // 下部分数据统计
      isAuth: false, //是否授权
      active_name: "1",
      // 今日统计
      editable_tabs: [
        {
          title: "今日新增",
          name: "1"
        },
        {
          title: "本月新增",
          name: "2"
        }
      ]
    };
  },
  methods: {
    // 去授权
    goAuthor() {
      this.$router.push({
        name: "authorize"
      });
    },
    // 选择标签
    handleClick(tab) {
      switch (parseInt(tab.index)) {
        case 0:
          this.type = 1;
          break;
        case 1:
          this.type = 2;
          break;
      }
      this.getTaskDetail();
    }
  },
  mounted() {}
};
</script>
<style>
.home .el-tabs .el-tabs__nav-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0 !important;
  background-color: #ffffff;
  z-index: 2;
}
.home .el-carousel__indicator .el-carousel__button {
  width: 20px;
  height: 4px;
}
.home .el-carousel__indicators--outside button {
  background-color: #21a0ff !important;
}
</style>
<style lang="stylus" scoped>
.home {
  width: 100%;
  padding-bottom: 133px;
  margin: 0 atuo;
  height: 100%;
  overflow: auto;
}

.authorization {
  height: 60px;
  line-height: 60px;
  background: #FFF6E6;
  border-bottom: 1px solid #FFEAC1;
  text-align: center;
  cursor: pointer;

  i {
    width: 16px;
    height: 16px;
    color: #FFAA00;
  }

  div {
    font-size: 16px;
    color: #666666;
  }

  .goAuth {
    color: #1989FA;
  }

  i:last-child {
    color: #1989FA;
    margin-left: 5px;
  }

  i:first-child {
    margin-right: 5px;
  }

  i, div {
    display: inline-block;
  }
}

.el-tabs__nav-wrap::after {
  background: none;
}

.tabFont {
  font-size: 16px;
}

.tabContent {
  color: #33363C;
  font-size: 16px;
  font-weight: 600;
}

.trend {
  margin-bottom: 17px;
}

.cartogram, .cartogram-chart {
  max-width: 1200px;
  height: 244px;
  background: #FFFFFF;
  box-shadow: 0px 8px 16px 0px rgba(10, 10, 26, 0.04);
  margin: 30px auto;
  padding: 30px;
}

.cartogram-chart {
  height: 484px;
}

.Statistics {
  margin-top: 62px;
  font-weight: 400;
}

.Statistics>.term:not(:first-child)::before {
  content: '';
  display: table;
  position: absolute;
  width: 1px;
  height: 52px;
  top: 4px;
  left: 0;
  background: #EBEEF5;
}

.Statistics>.term {
  font-size: 14px;
  color: #33363C;
  padding-left: 30px;
  position: relative;
}

.Statistics>.term:first-child {
  border: none;
  padding: 0;
}

.Statistics .term .term {
  margin-top: 5px;
  font-size: 30px;
  color: #33363C;
  font-weight: 500;
}

.img {
  width: 19px;
  height: 18px;
  margin-right: 10px;
  vertical-align: middle;
}

.week {
  margin-left: 22px;
  border-radius: 4px;
  box-sizing: border-box;
}

.week span {
  box-sizing: border-box;
  border-radius: 4px 0 0 4px;
  border: 2px solid #F0F2F5;
  padding: 9px 15px;
  cursor: pointer;
  font-size: 14px;
}

.week span:last-child {
  border-left: none;
  border-radius: 0 4px 4px 0;
}

.week span:hover {
  background: #ffffff;
  color: #1989FA;
}

.active {
  background: #ffffff;
  color: #1989FA;
}

.unchecked {
  color: #303133;
  background: #F0F2F5;
}
</style>
