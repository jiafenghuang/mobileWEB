<template>
    <div style="min-height:636px">
        <van-nav-bar :title="navTitle" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-tabs v-model="Navselected">
            <van-tab :title="tab1" name="T1">
                <van-panel
                    v-for="item in orderList"
                    :key="item.Id"
                    :title="returnTitle(item)"
                    :desc="item.customer_address"
                    :status="getOrderStatus(item.order_status)"
                >
                    <div class="panelBody">
                        <div v-for="detail in item.details" :key="detail.Id">
                            <van-cell-group>
                                <van-field
                                    v-if="detail.corner_name_cn"
                                    v-model="detail.corner_name_cn"
                                    label="转角名称"
                                />
                                <van-field
                                    v-if="detail.sofa_name_cn"
                                    v-model="detail.sofa_name_cn"
                                    label="沙发名称"
                                />
                            </van-cell-group>
                        </div>
                    </div>
                    <template #footer>
                        <van-row type="flex" justify="end">
                            <!-- <van-col span="4">
                <van-button size="small">按钮</van-button>
              </van-col>
              <van-col span="4">
                <van-button size="small">按钮</van-button>
                            </van-col>-->
                            <van-col span="6">
                                <van-button size="small" type="danger">取消订单</van-button>
                            </van-col>
                            <van-col span="6">
                                <van-button size="small" type="info">查看详情</van-button>
                            </van-col>

                            <van-col span="6">
                                <van-button
                                    size="small"
                                    type="primary"
                                    @click=" setNext(item,item.order_status)"
                                >{{getBtnStatus(item.button_status)}}</van-button>
                            </van-col>
                        </van-row>
                    </template>
                </van-panel>
            </van-tab>
            <van-tab :title="tab2" name="T2">
                <van-panel
                    v-for="item in finishList"
                    :key="item.Id"
                    :title="returnTitle(item)"
                    :desc="item.customer_address"
                    :status="getOrderStatus(item.order_status)"
                >
                    <div class="panelBody">
                        <div v-for="detail in item.details" :key="detail.Id">
                            <van-cell-group>
                                <van-field
                                    v-if="detail.corner_name_cn"
                                    v-model="detail.corner_name_cn"
                                    label="转角名称"
                                />
                                <van-field
                                    v-if="detail.sofa_name_cn"
                                    v-model="detail.sofa_name_cn"
                                    label="沙发名称"
                                />
                            </van-cell-group>
                        </div>
                    </div>
                    <template #footer>
                        <van-row type="flex" justify="end">
                            <van-col span="4">
                                <van-button size="small">按钮</van-button>
                            </van-col>
                            <van-col span="4">
                                <van-button size="small">按钮</van-button>
                            </van-col>
                            <van-col span="4">
                                <van-button size="small">按钮</van-button>
                            </van-col>
                            <van-col span="4">
                                <van-button size="small" type="info">查看详情</van-button>
                            </van-col>

                            <van-col span="4">
                                <van-button
                                    size="small"
                                    type="danger"
                                    @click="setNext(item,item.order_status)"
                                >按钮</van-button>
                            </van-col>
                        </van-row>
                    </template>
                </van-panel>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import { Toast } from "vant";
import { fetchData, deleteData, postData } from "../api/global";
import {
    getArrayUnique,
    delEleInArray,
    getIsIncluded,
} from "../util/handleArray";
import { order_status_index, btn_status_index } from "../util/statusIndex";
export default {
    name: "Cart",
    props: ["navTitle"],

    data() {
        return {
            orderList: [],
            finishList: [],
            Navselected: "T1",
            tab2: "已完成",
            tab1: "未完成",
            buttonStatus: "",
        };
    },
    created() {
        this.loadData();
    },

    methods: {
        async loadData() {
            const res = await fetchData("outorder/api/fetch", {});
            this.orderList = res.data;
            this.handleOrderList(this.orderList); //处理订单状态是否完成
            this.changeButtonStatus();
            // this.changeButtonStatus(this.finishList);
        },
        handleOrderList(orderList) {
            // 处理是否完成
            const finished_order_no = [];
            const finishList = [];
            let cloneArr = [];
            Object.assign(cloneArr, orderList);
            orderList.forEach((ele) => {
                if (ele.order_status === "3") {
                    if (
                        finished_order_no.length == 0 ||
                        !getIsIncluded(ele.order_no, finished_order_no)
                    ) {
                        finished_order_no.push(ele.order_no);
                        finishList.push(ele);
                        this.orderList = delEleInArray(cloneArr, ele);
                    }
                }
            });
            this.finishList = finishList;
        },
        returnTitle(item) {
            return `${item.customer_name_cn}(${item.customer_tel})`;
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        async setNext(item, status) {
            const details = item.details;
            let success = true; //是否全部details都成功修改
            // 未处理-已付款-已发货-已完成
            let order_status = "";
            if (status === "0") {
                order_status = "1";
            }
            if (status === "1") {
                order_status = "2";
            }
            if (status === "2") {
                order_status = "3";
            }
            if (status === "3") {
                // order_status = "3";
                return;
            }
            for (let i of details) {
                const obj = {};
                const { Id } = i;
                obj.Id = Id;
                obj.order_status = order_status || "0";
                const res = await this.postFormData(
                    "outorder/api/updateStatus",
                    obj
                );
                if (!res.msg) {
                    success = false;
                }
            }
            if (success) {
                Toast.success("修改成功");
            } else {
                Toast.fail("修改失败");
            }
            this.loadData();
        },
        changeButtonStatus() {
            this.orderList.forEach((ele) => {
                ele.button_status = `b${ele.order_status}`;
            });
        },

        getBtnStatus(index) {
            return btn_status_index[index];
        },
        getOrderStatus(index) {
            return order_status_index[index];
        },
        async postFormData(database, data) {
            const res = await postData(database, data);
            return res.data;
        },
    },
};
</script>
<style scoped>
.panelBody /deep/ {
    margin-left: 15px;
    font-size: 14px;
    color: #666;
}
.footerButton {
    /* margin-right: 15px;
   */
    display: flex;
    text-align: center;
    justify-content: center;
    /* float: right; */
}
</style>