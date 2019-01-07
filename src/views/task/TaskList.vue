<template lang="pug">
  div
    el-row.search
      el-col(:span="20")
        el-form.search(:inline="true")
          el-form-item(label="名称")
            el-input(v-model="query.name", size="medium", placeholder="请输入名称")
          el-form-item(label="状态")
            el-select(v-model="query.state", size="medium", placeholder="请选择状态")
              el-option(label="上线", value="1")
              el-option(label="下架", value="2")
          el-form-item
            el-date-picker(
              v-model="query.time"
              type="daterange"
              align="right"
              size="medium"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            )
          el-form-item
            el-button(type="primary", size="medium", @click = "search") 查询
            el-button(size="medium", @click = "reset") 重置
      el-col(:span="4")
        el-button(type="primary", size="medium", @click="goCreate") 新建任务

    .table-box
      el-table(
        :data = "list"
        height = "400px"
        stripe = true
        size = "small"
      )
        el-table-column(type="selection", width = "50")
        el-table-column(prop="nick_name", label="昵称")
        el-table-column(prop="name", label="姓名")
        el-table-column(prop="vip", label="会员")
        el-table-column(prop="brith", label="生日")
        el-table-column(prop="phone", label="手机")
        el-table-column(
          fixed="right"
          label="操作"
          width="120"
          )
          template(slot-scope="scope")
            el-button(type="text", size="small") 查看
            el-button(type="text", size="small") 删除
      el-pagination(
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="cur_page"
        :page-sizes="[15, 30, 50]"
        :page-size="15"
        layout="total, prev, pager, next, sizes, jumper"
        :total="400"
      )
</template>

<script>
import CustomerApi from "@/api/Customer";
export default {
  name: "customerList",
  data() {
    return {
      query: {
        name: "",
        state: "1",
        begin_time: "",
        end_time: ""
      },

      list: [
        {
          name: "左木子",
          avatar:
            "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erx1bEGTGYeXtiaOClSXYt257tBaE4JlRJWvd5CM8L6wiaCJYib0ciauY2t1iaPJLH8xdsuDPxia0PX4Lcw/132",
          nick_name: "放学别跑",
          vip: "白金会员",
          brith: "1988-04-26",
          phone: "13288888888"
        },
        {
          name: "左木子2",
          avatar:
            "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erx1bEGTGYeXtiaOClSXYt257tBaE4JlRJWvd5CM8L6wiaCJYib0ciauY2t1iaPJLH8xdsuDPxia0PX4Lcw/132",
          nick_name: "放学别跑",
          vip: "白金会员",
          brith: "1988-04-26",
          phone: "13288888888"
        }
      ],
      cur_page: 1
    };
  },
  methods: {
    async getInfoList() {
      try {
        const { request, data } = await CustomerApi.CustomerListApi({
          name: "",
          mobile: "",
          status: "",
          page: 1,
          per_page: 20
        });
        if (request.status === 200) {
          if (data.code === 0) {
            this.list = data.list;
          }
        } else {
          this.$message({
            showClose: true,
            message: data.message,
            type: "error"
          });
        }
      } catch (e) {
        this.$message({
          showClose: true,
          message: "获取客户列表失败",
          type: "error"
        });
        console.log("获取客户列表失败", e);
      }
    },
    // 搜索
    search() {
      console.log("搜索");
    },
    // 重置
    reset() {
      console.log("重置");
    },
    // 每页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 去添加
    goCreate() {
      this.$router.push({
        name: "taskCreate"
      });
    }
  },
  mounted() {
    // this.getInfoList();
    console.log("客户列表");
  }
};
</script>

<style lang="stylus" scoped>
.search {
  padding: 20px 50px;
}

.table-box {
  padding: 0 50px;
}

.el-pagination {
  padding-top: 20px;
  text-align: right;
}
</style>
