<template lang="pug">
  .list-content
    .list-header
      span.list-title 商品列表
      el-button(type="primary") 新建按钮
    .list-main
      el-row.main-search(:gutter="10")
        el-col(:span="4")
          el-input(
            span="8"
            placeholder="请输入任务名称", 
            v-model="query.name", 
            size="small"
            @keyup.enter.native="search")
        el-col(:span="4")
          el-select(placeholder="请选择任务类型", 
            v-model="type_selected"
            @change=""
            size="small")
            el-option(
              v-for="item in type_list"
              :key="item.value"
              :label="item.label"
              :value="item.value")
        el-col(:span="4")
          el-button(size="small", @click="search") 查询
          el-button(size="small", @click="reset") 重置
      el-table(:data="list"
        fit = true
        size="mini" 
        class="m-t-20 list-last-line-none"
        row-key = "row"
        :header-cell-style="{background:'#F0F2F6', fontSize:'14px', color:'#909399',fontWeight:'400'}")
        el-table-column(
          prop="name"
          label="任务名称"
          min-width="150")
        el-table-column(
          prop="status"
          :formatter="formatStatus"
          label="状态"
          width="120")
        el-table-column(
          fixed="right"
          label="操作"
          width="120")
          template(slot-scope="scope")
            el-button(
              type="text"
              size="small"
              class="operation-success"
              @click.native.prevent="toViewDetails(scope.$index, list)") 查看
            el-button(
              type="text"
              size="small"
              class="operation-error"
              @click.native.prevent="deleteConfirm(scope.$index, list)") 删除
        .table-default(slot="empty")
          img(width="200" class="empty-img" src="https://oss-crs.vchangyi.com/wechat/img-empty-new.png")
          span(class="empty-data") 暂无数据
      .pagination
        el-pagination(
          style='font-weight:400'
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.page"
          :page-sizes="pagination.sizes"
          :page-size="pagination.size"
          class="page-right"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total")
</template>

<script>
import formateDate from "@/mixins/FormateDate";
import { mapGetters } from "vuex";
export default {
  name: "goodslist",
  mixins: [formateDate],
  data() {
    return {
      query: {
        name: "",
        type: ""
      },
      type_selected: "",
      type_list: [
        {
          label: "销售业绩",
          value: "1"
        },
        {
          label: "客户管理",
          value: "2"
        },
        {
          label: "生日祝福",
          value: "3"
        },
        {
          label: "礼券到期提醒",
          value: "4"
        },
        {
          label: "会员招募",
          value: "5"
        }
      ],
      list: [
        {
          name: "2018年送每个好友你一个女朋友",
          status: 1
        }
      ],
      pagination: {
        page: 1,
        size: 10,
        total: 30,
        sizes: [10, 20, 30, 40]
      }
    };
  },
  methods: {
    // 获取数据
    getInfoList() {
      // TaskApi.getTaskListApi({
      //   "search[task_name]": this.query.name,
      //   "search[task_type]": this.query.type,
      //   page: this.pagination.page,
      //   size: this.pagination.size
      // }).then(res => {
      //   this.list = res.data.data;
      //   this.pagination.page = parseInt(res.data.meta.page);
      //   this.pagination.size = parseInt(res.data.meta.size);
      //   this.pagination.total = res.data.meta.total;
      // });
    },
    // 搜索
    search() {
      if (this.type_selected) {
        this.query.type = this.type_selected;
      }
      this.pagination.page = 1;
      this.list = [];
      // this.getInfoList();
    },
    // 重制
    reset() {
      this.query.name = "";
      this.query.type = "";
      this.type_selected = "";
      this.pagination.page = 1;
      this.list = [
        {
          name: "2018年送每个好友你一个女朋友",
          status: 1
        }
      ];
      this.getInfoList();
    },
    /**
     * 每页显示几条
     * val {int} 页数
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.pagination.page = 1;
      this.getInfoList();
    },
    /**
     * 翻页
     * val {int} 页码
     */
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.getInfoList();
    },
    /**
     * 删除前确认
     * index {int} 序列号
     * rows {arrary} 当前页数据
     * */
    deleteConfirm(index, rows) {
      this.$confirm("你确定要删除该任务吗？删除后将连同任务及任务的完成数据一同删除。", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.deleteFun(rows[index].id);
      });
    },
    /**
     * 删除方法
     * id {int} 删除对象id
     */
    deleteFun() {
      // TaskApi.deleteTaskApi({
      //   id: id
      // }).then(() => {
      //   this.$message({
      //     type: "success",
      //     message: "删除成功!"
      //   });
      //   this.search();
      // });
      this.$message({
        type: "error",
        message: "不允许删除我!"
      });
    },
    /**
     * 格式化时间
     * row {obj} 当前行
     */
    formatTime(row) {
      return this.formateDate(row.start_time);
    },
    /**
     * 格式化状态
     * row {obj} 当前行
     */
    formatStatus(row) {
      let text = ""; // 1 未开始 2 进行中 3 已结束
      switch (row.status) {
        case 1:
          text = "未开始";
          break;
        case 2:
          text = "进行中";
          break;
        default:
          text = "已结束";
          break;
      }
      return text;
    },
    /**
     * 查看详情
     * index {int} 序列号
     * rows {arrary} 当前页数据
     * */
    toViewDetails() {
      // this.$global.pagination = this.pagination;
      // this.$global.query = this.query;
      // this.$router.push({
      //   name: "taskDetail",
      //   query: { id: rows[index].id }
      // });
    },
    // 去添加
    toCreate() {
      this.$router.push({
        name: "taskCreate"
      });
    }
  },
  computed: {
    ...mapGetters("USER", {
      USER: "getUserInfo"
    })
  },
  mounted() {
    // if (this.$global.pagination) {
    //   this.pagination = this.$global.pagination;
    //   this.query = this.$global.query;
    //   this.type_selected = this.$global.query.type;
    // }
    // if (!this.USER.enterprise.domain) {
    //   this.$router.replace({ name: "noContacts" });
    //   return false;
    // }
    // this.getInfoList();
  }
};
</script>

<style lang="stylus" scoped>
.table-box {
  display: block;
  padding: 0 50px;
}

.el-pagination {
  padding-top: 20px;
  text-align: right;
}
</style>
