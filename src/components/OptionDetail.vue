<template>
    <div style="min-height:636px">
        <van-nav-bar
            :title="title"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            right-text="添加"
            @click-right="dialogShow=!dialogShow"
        />
        <van-cell v-for="item in dataList" :key="item.Id" :title="item.name" />
        <van-dialog
            v-model="dialogShow"
            title="添加"
            show-cancel-button
            @confirm="postDetailData"
            @cancel="formValue=null"
        >
            <van-field v-model="formValue" :placeholder="`请输入${this.title}名称`" />
        </van-dialog>
    </div>
</template>

<script>
import { fetchData, deleteData, postData } from "../api/global";

export default {
    name: "OptionDeail",
    data() {
        return {
            formValue: "",
            dialogShow: false,
            optionsList: [
                { name: "坐包颜色", index: "pillow_color" },
                { name: "坐包规格", index: "pillow_speci" },
                { name: "腰包颜色", index: "waist_color" },
            ],

            dataList: [],
        };
    },
    computed: {
        name() {
            if (!this.$route.params.obj) {
                return;
            }
            return this.$route.params.obj["index"];
        },
        title() {
            if (!this.$route.params.obj) {
                return;
            }
            return this.$route.params.obj["name"];
        },
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            console.log("this.name :>> ", this.name);
            if (this.name) {
                this.loadData();
            }
        },
        async loadData() {
            let _this = this;
            const res = await fetchData(`${this.name}/api/fetch`, {});
            let data = res.data;
            if (data.length) {
                data.forEach((ele) => {
                    ele["name"] = ele[`${_this.name}_name_cn`];
                });
                this.dataList = res.data;
            }
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        async postDetailData() {
            if (this.formValue) {
                let key = `${this.name}_name_cn`;
                let data = {};
                data[key] = this.formValue;
                const res = await postData(`${this.name}/api/create`, data);
            }
            this.formValue = "";
            this.init();
        },
    },
};
</script>
<style></style>
