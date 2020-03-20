<template>
  <div style="min-height:636px">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" />
    <van-tabs v-model="Navselected">
      <van-tab :title="tab1" name="T1">
        <van-collapse v-model="cornerActive" accordion>
          <van-collapse-item
            v-for="(Citem,CIndex) in Csofa"
            :key="Citem.Id"
            :name="CIndex+1"
            :disabled="showCheckbox"
            @longTap="OnShowCheckbox"
          >
            <div slot="title">{{Citem.corner_name_cn}}</div>
            <div slot="icon" v-if="showCheckbox">
              <van-checkbox v-model="Citem.checked" @click="setChecked(Citem,Citem.Id)" />
            </div>
            <van-cell-group>
              <van-field
                v-model="Citem.corner_name_cn"
                :disabled="!showEdit"
                label="型号"
                placeholder="请输入型号"
              />
              <van-field
                v-model="Citem.corner_name_cn"
                :disabled="!showEdit"
                label="颜色"
                placeholder="请输入颜色"
              />
              <van-field
                v-model="Citem.corner_name_cn"
                :disabled="!showEdit"
                label="扶手"
                placeholder="请输入扶手"
              />
              <van-field
                v-model="Citem.corner_name_cn"
                :disabled="!showEdit"
                label="坐靠"
                placeholder="请输入坐靠"
              />
              <van-field
                v-model="Citem.corner_name_cn"
                :disabled="!showEdit"
                label="长几"
                placeholder="请输入长几"
              />
              <van-field
                v-model="Citem.corner_name_cn"
                :disabled="!showEdit"
                label="贵妃"
                placeholder="请输入贵妃"
              />
            </van-cell-group>
            <van-row type="flex" justify="end">
              <van-col span="6">
                <van-button
                  type="danger"
                  size="normal"
                  @click="onDeleteGuard(Citem.Id)"
                >&nbsp;删除&nbsp;</van-button>
              </van-col>
              <van-col span="6" v-if="!showEdit">
                <van-button type="warning" size="normal" @click="onEdit(Citem.Id)">&nbsp;修改&nbsp;</van-button>
              </van-col>
              <van-col span="6" v-if="showEdit">
                <van-button
                  type="primary"
                  size="normal"
                  @click="onSaveItem(Citem.Id)"
                >&nbsp;保存&nbsp;</van-button>
              </van-col>
              <van-col span="6">
                <van-button
                  type="primary"
                  size="normal"
                  @click="onPayOrder(Citem.Id)"
                >&nbsp;&nbsp;下单&nbsp;&nbsp;</van-button>
              </van-col>
            </van-row>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
      <van-tab :title="tab2" name="T2"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { fetchData, deleteData } from "../api/global";
import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  name: "Sofa",
  data() {
    return {
      showCheckbox: false,
      showEdit: false,
      isLoading: true,
      dataList: [],
      Csofa: [],
      sofa: [],
      tab1: "转角",
      tab2: "沙发",
      Navselected: "T1",
      cornerActive: "",
      sofaActive: ""
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const Csofa = await fetchData(this, "corner_stock/api/fetch", {});
      this.Csofa = Csofa.data;
      const sofa = await fetchData(this, "sofa_stock/api/fetch", {});
      this.sofa = sofa.data;
    },
    async onDelete(Id) {
      await deleteData(this, "sofa_stock/api/delete", { Id });
      Toast.success("删除成功");
      this.loadData();
    },
    onDeleteGuard(Id) {
      Dialog.confirm({
        title: "提示",
        message: "是否确认删除?"
      })
        .then(() => {
          this.onDelete(Id);
        })
        .catch(() => {
          // on cancel
        });
    },
    setChecked(item, Id) {
      const val = !item.checked;
      this.$set(item, "checked", val);
    },
    OnShowCheckbox() {
      const val = this.showCheckbox;
      this.showCheckbox = !val;
    },
    onEdit(Id) {
      this.showEdit = true;
    },
    onPayOrder(Id) {
      this.$router.push({
        name: "Output_order",
        params: {
          Id,
          type: "Sofa1"
        }
      });
    },
    onSaveItem(Id) {
      this.showEdit = false;
    },
    // 下拉刷新还没实现成功
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    }
  }
};
</script>
<style scoped>
</style>
