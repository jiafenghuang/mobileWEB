<template>
    <div style="min-height:636px">
        <van-nav-bar
            :title="navTitle"
            left-text="返回"
            right-text="操作"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        />
        <van-popup v-model="featuresShow" round position="bottom" :style="{ height: '30%' }">
            <van-cell-group>
                <van-cell
                    v-for="(item,index) in featuresList"
                    :key="index"
                    @click="onGetFeature(item.value)"
                >{{item.name}}</van-cell>
            </van-cell-group>
        </van-popup>
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
                            <van-checkbox
                                v-model="Citem.checked"
                                @click="setChecked(Citem,Citem.Id)"
                            />
                        </div>
                        <van-cell-group>
                            <van-field
                                v-model="Citem.corner_name_cn"
                                :disabled="!showEdit"
                                label="型号"
                                placeholder="请输入型号"
                            />
                            <van-field
                                v-model="Citem.corner_color_name_cn"
                                :disabled="!showEdit"
                                label="颜色"
                                placeholder="请输入颜色"
                            />
                            <van-field
                                v-model="Citem.corner_size_name_cn"
                                :disabled="!showEdit"
                                label="转角尺寸"
                                placeholder="请输入转角尺寸"
                            />
                            <van-field
                                v-model="Citem.armrest_name_cn"
                                :disabled="!showEdit"
                                label="扶手名称"
                                placeholder="请输入扶手名称"
                            />
                            <van-cell title="扶手数量">
                                <van-stepper
                                    :min="0"
                                    v-model="Citem.armrest_total"
                                    :disabled="!showEdit"
                                />
                            </van-cell>
                            <van-field
                                v-model="Citem.sit_name_cn"
                                :disabled="!showEdit"
                                label="坐靠名称"
                                placeholder="请输入坐靠名称"
                            />
                            <van-field
                                v-model="Citem.sit_size_name_cn"
                                :disabled="!showEdit"
                                label="坐靠尺寸"
                                placeholder="请输入坐靠尺寸"
                            />
                            <van-cell title="坐靠数量">
                                <van-stepper
                                    :min="0"
                                    v-model="Citem.sit_total"
                                    :disabled="!showEdit"
                                />
                            </van-cell>
                            <van-field
                                v-model="Citem.l_tea_name_cn"
                                :disabled="!showEdit"
                                label="长几"
                                placeholder="请输入长几"
                            />
                            <van-field
                                v-model="Citem.l_tea_size_name_cn"
                                :disabled="!showEdit"
                                label="长几尺寸"
                                placeholder="请输入长几尺寸"
                            />
                            <van-cell title="长几数量">
                                <van-stepper
                                    :min="0"
                                    v-model="Citem.l_tea_total"
                                    :disabled="!showEdit"
                                />
                            </van-cell>
                            <van-field
                                v-model="Citem.chaise_name_cn"
                                :disabled="!showEdit"
                                label="贵妃名称"
                                placeholder="请输入贵妃"
                            />
                            <van-cell title="贵妃数量">
                                <van-stepper
                                    :min="0"
                                    v-model="Citem.chaise_total"
                                    :disabled="!showEdit"
                                />
                            </van-cell>
                            <van-field
                                v-model="Citem.cstock_remark"
                                :disabled="!showEdit"
                                type="textarea"
                                rows="1"
                                autosize
                                label="备注"
                                placeholder="请输入备注"
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
                                <van-button
                                    type="warning"
                                    size="normal"
                                    @click="onEdit(Citem.Id)"
                                >&nbsp;修改&nbsp;</van-button>
                            </van-col>
                            <van-col span="6" v-if="showEdit">
                                <van-button
                                    type="primary"
                                    size="normal"
                                    @click="onSaveCorner(Citem.Id)"
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
            <van-tab :title="tab2" name="T2">
                <van-collapse v-model="sofaActive" accordion>
                    <van-collapse-item
                        v-for="(item,Index) in sofa"
                        :key="item.Id"
                        :name="Index+1"
                        :disabled="sofaCheckbox"
                        @longTap="OnShowCheckbox"
                    >
                        <div slot="title">{{item.sofa_name_cn}}</div>
                        <div slot="icon" v-if="sofaCheckbox">
                            <van-checkbox v-model="item.checked" @click="setChecked(item,item.Id)" />
                        </div>
                        <van-cell-group>
                            <van-field
                                v-model="item.sofa_name_cn"
                                :disabled="!sofaEdit"
                                label="型号"
                                placeholder="请输入型号"
                            />
                            <van-field
                                v-model="item.sofa_color_name_cn"
                                :disabled="!sofaEdit"
                                label="颜色"
                                placeholder="请输入颜色"
                            />
                            <van-field
                                v-model="item.sofa_size_name_cn"
                                :disabled="!sofaEdit"
                                label="沙发尺寸"
                                placeholder="请输入沙发尺寸"
                            />
                            <van-cell title="单人位数量">
                                <van-stepper
                                    :min="0"
                                    v-model="item.single_total"
                                    :disabled="!sofaEdit"
                                />
                            </van-cell>
                            <van-cell title="双人位数量">
                                <van-stepper
                                    :min="0"
                                    v-model="item.double_total"
                                    :disabled="!sofaEdit"
                                />
                            </van-cell>
                            <van-cell title="三人位数量">
                                <van-stepper
                                    :min="0"
                                    v-model="item.triple_total"
                                    :disabled="!sofaEdit"
                                />
                            </van-cell>
                            <van-field
                                v-model="item.l_tea_name_cn"
                                :disabled="!sofaEdit"
                                label="长几"
                                placeholder="请输入长几"
                            />
                            <van-field
                                v-model="item.l_tea_size_name_cn"
                                :disabled="!sofaEdit"
                                label="长几尺寸"
                                placeholder="请输入长几尺寸"
                            />
                            <van-cell title="长几数量">
                                <van-stepper
                                    :min="0"
                                    v-model="item.l_tea_total"
                                    :disabled="!sofaEdit"
                                />
                            </van-cell>
                            <van-field
                                v-model="item.s_tea_name_cn"
                                :disabled="!sofaEdit"
                                label="方几"
                                placeholder="请输入方几"
                            />
                            <van-cell title="方几数量">
                                <van-stepper
                                    :min="0"
                                    v-model="item.s_tea_total"
                                    :disabled="!sofaEdit"
                                />
                            </van-cell>
                            <van-field
                                v-model="item.r_tea_name_cn"
                                :disabled="!sofaEdit"
                                label="圆几"
                                placeholder="请输入圆几"
                            />
                            <van-cell title="圆几数量">
                                <van-stepper
                                    :min="0"
                                    v-model="item.r_tea_total"
                                    :disabled="!sofaEdit"
                                />
                            </van-cell>
                            <van-field
                                v-model="item.sofa_remark"
                                :disabled="!sofaEdit"
                                type="textarea"
                                rows="1"
                                autosize
                                label="备注"
                                placeholder="请输入备注"
                            />
                        </van-cell-group>
                        <van-row type="flex" justify="end">
                            <van-col span="6">
                                <van-button
                                    type="danger"
                                    size="normal"
                                    @click="onDeleteGuard(item.Id)"
                                >&nbsp;删除&nbsp;</van-button>
                            </van-col>
                            <van-col span="6" v-if="!sofaEdit">
                                <van-button
                                    type="warning"
                                    size="normal"
                                    @click="onEdit(item.Id)"
                                >&nbsp;修改&nbsp;</van-button>
                            </van-col>
                            <van-col span="6" v-if="sofaEdit">
                                <van-button
                                    type="primary"
                                    size="normal"
                                    @click="onSaveSofa(item.Id)"
                                >&nbsp;保存&nbsp;</van-button>
                            </van-col>
                            <van-col span="6">
                                <van-button
                                    type="primary"
                                    size="normal"
                                    @click="onPayOrder(item.Id)"
                                >&nbsp;&nbsp;下单&nbsp;&nbsp;</van-button>
                            </van-col>
                        </van-row>
                    </van-collapse-item>
                </van-collapse>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { fetchData, deleteData, postData } from "../api/global";
import { Toast } from "vant";
import { Dialog } from "vant";
export default {
    name: "Sofa",
    props: ["navTitle"],
    data() {
        return {
            featuresShow: false,
            featuresList: [
                { name: "批量操作", value: "range" },
                { name: "导出", value: "output" },
                { name: "导入", value: "input" },
                { name: "取消", value: "cancel" }
            ],
            showCheckbox: false,
            sofaCheckbox: false,
            showEdit: false,
            sofaEdit: false,
            isLoading: true,
            Csofa: [],
            sofa: [],
            tab1: "转角",
            tab2: "沙发",
            Navselected: "T1",
            cornerActive: "",
            sofaActive: ""
        };
    },
    watch: {},
    created() {
        this.loadData();
    },
    methods: {
        async loadData() {
            const Csofa = await fetchData("corner_stock/api/fetch", {});
            this.Csofa = Csofa.data;
            const sofa = await fetchData("sofa_stock/api/fetch", {});
            this.sofa = sofa.data;
        },
        async onDelete(Id) {
            let url = "";
            if (this.Navselected === "T2") {
                url = "sofa_stock/api/delete";
            }
            if (this.Navselected === "T1") {
                url = "corner_stock/api/delete";
            }
            const res = await deleteData(url, { Id });
            const info = res.data;
            if (info.msg) {
                Toast.success("删除成功");
            } else {
                Toast.fail("删除失败");
            }
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
            if (this.Navselected === "T1") {
                const val = this.showCheckbox;
                this.showCheckbox = !val;
            }
            if (this.Navselected === "T2") {
                const val = this.sofaCheckbox;
                this.sofaCheckbox = !val;
            }
        },
        onEdit(Id) {
            if (this.Navselected === "T1") {
                this.showEdit = true;
            }
            if (this.Navselected === "T2") {
                this.sofaEdit = true;
            }
        },
        onPayOrder(Id) {
            if (this.Navselected === "T1") {
                this.$router.push({
                    name: "Output_order",
                    params: {
                        Id,
                        type: "Sofa1"
                    }
                });
            }
            if (this.Navselected === "T2") {
                this.$router.push({
                    name: "Output_order",
                    params: {
                        Id,
                        type: "Sofa2"
                    }
                });
            }
        },
        onSaveSofa(Id) {
            const list = this.sofa;
            const data = {};
            const l_teaData = {};
            const s_teaData = {};
            const r_teaData = {};
            list.forEach(ele => {
                if (ele.Id === Id) {
                    const {
                        sofa_name_cn,
                        sofa_size_name_cn,
                        sofa_color_name_cn,
                        Id,
                        l_tea_table_Id,
                        s_tea_table_Id,
                        r_tea_table_Id,
                        sofa_remark,
                        l_tea_name_cn,
                        s_tea_name_cn,
                        r_tea_name_cn,
                        l_tea_size_name_cn,
                        l_tea_total,
                        r_tea_total,
                        s_tea_total
                    } = ele;
                    data.Id = Id;
                    data.sofa_name_cn = sofa_name_cn;
                    data.sofa_size_name_cn = sofa_size_name_cn;
                    data.sofa_color_name_cn = sofa_color_name_cn;
                    data.sofa_remark = sofa_remark;

                    s_teaData.Id = s_tea_table_Id;
                    s_teaData.s_tea_name_cn = s_tea_name_cn;
                    s_teaData.s_tea_total = s_tea_total;

                    r_teaData.Id = r_tea_table_Id;
                    r_teaData.r_tea_name_cn = r_tea_name_cn;
                    r_teaData.r_tea_total = r_tea_total;

                    l_teaData.Id = l_tea_table_Id;
                    l_teaData.l_tea_name_cn = l_tea_name_cn;
                    l_teaData.l_tea_size_name_cn = l_tea_size_name_cn;
                    l_teaData.l_tea_total = l_tea_total;
                }
            });
            this.postFormData("sofa_stock", "update", data);
            this.postFormData("l_tea_table", "update", l_teaData);
            this.postFormData("r_tea_table", "update", r_teaData);
            this.postFormData("s_tea_table", "update", s_teaData);
            this.sofaEdit = false;
        },
        onSaveCorner(Id) {
            const list = this.Csofa;
            const data = {};
            const armData = {};
            const l_teaData = {};
            const chaiseData = {};
            const sitData = {};
            list.forEach(ele => {
                if (ele.Id === Id) {
                    const {
                        corner_name_cn,
                        corner_size_name_cn,
                        corner_color_name_cn,
                        Id,
                        sit_board_Id,
                        chaise_Id,
                        armrest_Id,
                        l_tea_table_Id,
                        cstock_remark,
                        l_tea_name_cn,
                        l_tea_size_name_cn,
                        sit_name_cn,
                        chaise_name_cn,
                        armrest_name_cn,
                        sit_size_name_cn,
                        armrest_total,
                        chaise_total,
                        l_tea_total,
                        sit_total
                    } = ele;
                    data.Id = Id;
                    data.corner_name_cn = corner_name_cn;
                    data.corner_size_name_cn = corner_size_name_cn;
                    data.corner_color_name_cn = corner_color_name_cn;
                    data.cstock_remark = cstock_remark;
                    sitData.Id = sit_board_Id;
                    sitData.sit_name_cn = sit_name_cn;
                    sitData.sit_size_name_cn = sit_size_name_cn;
                    sitData.sit_total = sit_total;
                    chaiseData.Id = chaise_Id;
                    chaiseData.chaise_name_cn = chaise_name_cn;
                    chaiseData.chaise_total = chaise_total;
                    armData.Id = armrest_Id;
                    armData.armrest_name_cn = armrest_name_cn;
                    armData.armrest_total = armrest_total;
                    l_teaData.Id = l_tea_table_Id;
                    l_teaData.l_tea_name_cn = l_tea_name_cn;
                    l_teaData.l_tea_size_name_cn = l_tea_size_name_cn;
                    l_teaData.l_tea_total = l_tea_total;
                }
            });
            this.postFormData("corner_stock", "update", data);
            this.postFormData("l_tea_table", "update", l_teaData);
            this.postFormData("chaise", "update", chaiseData);
            this.postFormData("armrest", "update", armData);
            this.postFormData("sit_board", "update", sitData);
            this.showEdit = false;
        },
        async postFormData(tableName, actions, data) {
            const dataUrl = `${tableName}/api/${actions}`;
            const res = await postData(dataUrl, data);
            const info = res.data;
            // console.log("res :", res.data);
            if (info.msg) {
                Toast.success("修改成功");
            } else {
                Toast.fail("修改失败");
            }
        },
        // 下拉刷新还没实现成功
        onRefresh() {
            setTimeout(() => {
                Toast("刷新成功");
                this.isLoading = false;
            }, 1000);
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        onClickRight() {
            this.featuresShow = true;
        },
        onGetFeature(value) {
            if (value === "range") {
                if (this.Navselected === "T1") {
                    const val = this.showCheckbox;
                    this.showCheckbox = !val;
                }
                if (this.Navselected === "T2") {
                    const val = this.sofaCheckbox;
                    this.sofaCheckbox = !val;
                }
            }
            if (value === "output") {
                let url = "";
                if (this.Navselected === "T1") {
                    url = `http://127.0.0.1:80/corner_stock/api/download`;
                }
                if (this.Navselected === "T2") {
                    url = `http://127.0.0.1:80/sofa_stock/api/download`;
                }
                window.open(url);
            }
            if (value === "input") {
                if (this.Navselected === "T1") {
                    this.$router.push({
                        name: "Upload",
                        params: {
                            type: "corner_stock"
                        }
                    });
                }
                if (this.Navselected === "T2") {
                    this.$router.push({
                        name: "Upload",
                        params: {
                            type: "sofa_stock"
                        }
                    });
                }
            }
            if (value === "cancel") {
                this.featuresShow = false;
            }
        }
    }
};
</script>
<style scoped>
</style>
