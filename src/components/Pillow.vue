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
        <van-collapse v-model="cornerActive" accordion>
            <van-collapse-item
                v-for="(Citem,CIndex) in Pillow"
                :key="Citem.Id"
                :name="CIndex+1"
                :disabled="showCheckbox"
                @longTap="OnShowCheckbox"
            >
                <div slot="title">{{Citem.pillow_name_cn}}</div>
                <div slot="icon" v-if="showCheckbox">
                    <van-checkbox v-model="Citem.checked" @click="setChecked(Citem,Citem.Id)" />
                </div>
                <van-cell-group>
                    <van-field
                        v-model="Citem.pillow_name_cn"
                        :disabled="!showEdit"
                        label="型号"
                        placeholder="请输入坐垫型号"
                    />
                    <van-field
                        v-model="Citem.pillow_speci_name_cn"
                        :disabled="!showEdit"
                        label="坐垫规格"
                        placeholder="请输入坐垫规格"
                    />

                    <van-field
                        v-model="Citem.pillow_size_name_cn"
                        :disabled="!showEdit"
                        label="坐垫尺寸"
                        placeholder="请输入坐垫尺寸"
                    />
                    <van-field
                        v-model="Citem.pillow_color_name_cn"
                        :disabled="!showEdit"
                        label="坐垫颜色"
                        placeholder="请输入坐垫颜色"
                    />
                    <van-cell title="坐垫数量">
                        <van-stepper :min="0" v-model="Citem.pillow_total" :disabled="!showEdit" />
                    </van-cell>
                    <van-field
                        v-model="Citem.waist_name_cn"
                        :disabled="!showEdit"
                        label="腰包型号"
                        placeholder="请输入腰包型号"
                    />
                    <van-field
                        v-model="Citem.waist_color_name_cn"
                        :disabled="!showEdit"
                        label="腰包颜色"
                        placeholder="请输入腰包颜色"
                    />
                    <van-cell title="腰包数量">
                        <van-stepper :min="0" v-model="Citem.waist_total" :disabled="!showEdit" />
                    </van-cell>
                    <van-field
                        v-model="Citem.pillow_remark"
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
                            @click="onSavePillow(Citem.Id)"
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
    </div>
</template>

<script>
import { fetchData, deleteData, postData } from "../api/global";
import { Toast } from "vant";
import { Dialog } from "vant";

export default {
    name: "Pillow",
    props: ["navTitle"],

    data() {
        return {
            cornerActive: "",
            featuresShow: false,
            featuresList: [
                { name: "批量操作", value: "range" },
                { name: "导出", value: "output" },
                { name: "导入", value: "input" },
                { name: "取消", value: "cancel" }
            ],
            showCheckbox: false,
            Pillow: [],
            showCheckbox: false,
            showEdit: false
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        async loadData() {
            const Pillow = await fetchData("pillow_stock/api/fetch", {});
            this.Pillow = Pillow.data;
        },
        onEdit(Id) {
            this.showEdit = true;
        },
        onSavePillow(Id) {
            const list = this.Pillow;
            const data = {};
            const waistData = {};
            const waist_colorData = {};
            const pillow_speciData = {};
            const pillow_colorData = {};
            list.forEach(ele => {
                if (ele.Id === Id) {
                    const {
                        pillow_name_cn,
                        pillow_size_name_cn,
                        pillow_color_name_cn,
                        pillow_speci_name_cn,
                        pillow_speci_Id,
                        pillow_remark,
                        pillow_color_Id,
                        pillow_total,
                        Id,
                        waist_Id,
                        waist_name_cn,
                        waist_total,
                        waist_color_name_cn,
                        waist_color_Id
                    } = ele;
                    data.Id = Id;
                    data.pillow_name_cn = pillow_name_cn;
                    data.pillow_remark = pillow_remark;
                    waistData.Id = waist_Id;
                    waistData.waist_name_cn = waist_name_cn;
                    waist_colorData.Id = waist_color_Id;
                    waist_colorData.waist_color_name_cn = waist_color_name_cn;
                    waist_colorData.waist_total = waist_total;
                    pillow_speciData.Id = pillow_speci_Id;
                    pillow_speciData.pillow_speci_name_cn = pillow_speci_name_cn;
                    pillow_speciData.pillow_size_name_cn = pillow_size_name_cn;
                    pillow_colorData.Id = pillow_color_Id;
                    pillow_colorData.pillow_total = pillow_total;
                    pillow_colorData.pillow_color_name_cn = pillow_color_name_cn;
                }
            });
            this.postFormData("pillow_stock", "update", data);
            this.postFormData("waist", "update", waistData);
            this.postFormData("waist_color", "update", waist_colorData);
            this.postFormData("pillow_speci", "update", pillow_speciData);
            this.postFormData("pillow_color", "update", pillow_colorData);

            this.showEdit = false;
        },
        async postFormData(tableName, actions, data) {
            const dataUrl = `${tableName}/api/${actions}`;
            const res = await postData(dataUrl, data);
            const info = res.data;
            if (info.msg) {
                Toast.success("修改成功");
            } else {
                Toast.fail("修改失败");
            }
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
        async onDelete(Id) {
            let url = "";
            url = "pillow_stock/api/delete";
            const res = await deleteData(url, { Id });
            const info = res.data;
            if (info.msg) {
                Toast.success("删除成功");
            } else {
                Toast.fail("删除失败");
            }
            this.loadData();
        },
        OnShowCheckbox() {
            const val = this.showCheckbox;
            this.showCheckbox = !val;
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        onClickRight() {
            this.featuresShow = true;
        },
        onGetFeature(value) {
            if (value === "range") {
                const val = this.showCheckbox;
                this.showCheckbox = !val;
            }
            if (value === "output") {
                let url = "";
                url = `http://127.0.0.1:80/sofa_stock/api/download`;
                window.open(url);
            }
            if (value === "input") {
                this.$router.push({
                    name: "Upload",
                    params: {
                        type: "pillow_stock"
                    }
                });
            }
            if (value === "cancel") {
                this.featuresShow = false;
            }
        }
    }
};
</script>
<style></style>
