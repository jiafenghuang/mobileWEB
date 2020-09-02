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
                            <van-col span="5">
                                <van-button
                                    v-if="isShowButton(item.order_status,1,2,3)"
                                    size="small"
                                    @click="printOrder(item)"
                                >打印订单</van-button>
                            </van-col>
                            <!-- <van-col span="5" v-if="isShowButton(item.order_status,3)">
                                <van-button size="small" @click="afterMarket(item)">售后处理</van-button>
                            </van-col>-->
                            <van-col span="5" v-if="isShowButton(item.order_status,3)">
                                <van-button size="small" @click="rebuildOrder(item)">重建订单</van-button>
                            </van-col>
                            <van-col span="5" v-if="isShowButton(item.order_status,0,1)">
                                <van-button
                                    size="small"
                                    type="danger"
                                    @click="cancelOrder(item)"
                                >取消订单</van-button>
                            </van-col>
                            <van-col span="5" v-if="isShowButton(item.order_status,1,0)">
                                <van-button size="small" type="info" @click="editOrder(item)">修改订单</van-button>
                            </van-col>
                            <van-col span="5" v-if="isShowButton(item.order_status,2,3)">
                                <van-button size="small" type="info" @click="getDetail(item)">查看详情</van-button>
                            </van-col>
                            <van-col span="5">
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
import { baseToFile } from "../util/Base64ToFile";
export default {
    /*
    创建订单=>修改订单信息（地址，物流，产品）；删除
    确认收款=>打印订单；删除
    确认发货=>(联系卖家)；删除;售后
    完成订单=>
    已完成=>删除；重新创建订单    
    */
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
                order_status = "0";
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
            this.getResult(success, "修改");
            this.loadData();
        },
        changeButtonStatus() {
            this.orderList.forEach((ele) => {
                ele.button_status = `b${ele.order_status}`;
            });
        },
        returnTitle: (item) => `${item.customer_name_cn}(${item.customer_tel})`,
        getBtnStatus: (index) => btn_status_index[index],
        getOrderStatus: (index) => order_status_index[index],
        // agrs是array
        isShowButton: (status_index, ...agrs) =>
            agrs.includes(Number(status_index)) ? true : false,
        async postFormData(uri, data) {
            const res = await postData(uri, data);
            return res.data;
        },
        async printOrder(item) {
            const { details, order_no } = item;
            let Ids = [];
            details.forEach((ele) => {
                Ids.push(ele.Id);
            });
            const data = { order_no, Ids };
            let customerInfo = item.customer_name_cn || item.customer_tel;
            let fileName = `${customerInfo}${order_no}`;
            const res = await this.postFormData("tofile/api/create", data);
            const url = baseToFile.dataURLtoDownload(res, fileName);
            window.open(url);
        },
        rebuildOrder(item) {},
        async cancelOrder(item) {
            console.log("item :>> ", item);
            let arr = item.details.map((i) => i.Id);
            let flag = true;
            for (let i of arr) {
                let res = await deleteData("outorder/api/delete", { Id: i });
                if (!res.msg) {
                    flag = false;
                }
            }
            this.getResult(flag, "删除");
            this.loadData();
        },
        editOrder(item) {},
        getDetail(item) {},
        getResult: (status, text) =>
            !!status ? Toast.success(`${text}成功`) : Toast.fail(`${text}失败`),
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