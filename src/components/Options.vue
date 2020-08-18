<template>
    <div style="min-height:636px">
        <van-nav-bar :title="navTitle" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-cell
            v-for="item in optionsList"
            :key="item.index"
            :title="item.name"
            is-link
            @click="routerTo(item)"
        />
    </div>
</template>

<script>
import { fetchData, deleteData, postData } from "../api/global";

export default {
    name: "Options",
    props: ["navTitle"],

    data() {
        return {
            optionsList: [
                { name: "坐包颜色", index: "pillow_color" },
                { name: "坐包规格", index: "pillow_speci" },
                { name: "腰包颜色", index: "waist_color" },
            ],
        };
    },
    methods: {
        routerTo(obj) {
            this.$router.push({
                name: "OptionDetail",
                params: { obj: obj },
            });
        },
        onClickLeft() {
            this.$router.go(-1);
        },
    },
};
</script>
<style></style>
