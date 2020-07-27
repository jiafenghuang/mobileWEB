<template>
    <div style="min-height:636px">
        <van-nav-bar
            :title="navTitle"
            left-text="返回"
            right-text="按钮"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        />
        <div v-for="(page, index) in pages" :key="index">
            <div>
                <van-divider content-position="left">转角填写</van-divider>
            </div>
            <van-field
                clearable
                v-model="page.corner_name_cn"
                name="型号"
                label="型号"
                placeholder="请选择型号"
                @click="loadCornerData(page)"
            />
            <van-popup v-model="page.cornerShow" round position="bottom" :style="{ height: '70%' }">
                <van-list>
                    <van-cell
                        v-for="item in CsofaList"
                        :key="item.Id"
                        :title="item.corner_name_cn"
                        is-link
                        @click="getCorner(page, item.Id)"
                    >
                        <van-tag v-if="item.corner_color_name_cn" mark type="primary">
                            {{
                            item.corner_color_name_cn
                            }}
                        </van-tag>
                        <van-tag v-if="item.cstock_remark">
                            {{
                            item.cstock_remark
                            }}
                        </van-tag>
                    </van-cell>
                </van-list>
            </van-popup>
            <van-field
                v-model="page.corner_color_name_cn"
                name="颜色"
                label="颜色"
                clearable
                placeholder="请选择颜色"
            />
            <van-field
                v-model="page.corner_size_name_cn"
                name="转角尺寸"
                label="转角尺寸"
                clearable
                placeholder="请选择转角尺寸"
            />
            <van-field
                v-model="page.armrest_name_cn"
                label="扶手"
                clearable
                placeholder="请输入扶手型号"
                @click="loadArmrestData(page)"
            />
            <van-popup
                v-model="page.armrestShow"
                round
                position="bottom"
                :style="{ height: '70%' }"
            >
                <van-list>
                    <van-cell
                        v-for="item in armrestList"
                        :key="item.Id"
                        :title="item.armrest_name_cn"
                        is-link
                        @click="getArmRest(page, item.Id)"
                    >
                        <van-tag round type="danger">{{ item.armrest_total||0 }}</van-tag>
                        <van-tag v-if="item.armrest_remark">
                            {{
                            item.armrest_remark
                            }}
                        </van-tag>
                    </van-cell>
                </van-list>
            </van-popup>
            <van-cell title="扶手数量">
                <van-stepper :min="0" v-model="page.armrest_order_total" />
            </van-cell>
            <van-field
                v-model="page.sit_name_cn"
                label="坐靠"
                clearable
                placeholder="请输入坐靠型号"
                @click="loadSitData(page)"
            />
            <van-popup v-model="page.sitShow" round position="bottom" :style="{ height: '70%' }">
                <van-list>
                    <van-cell
                        v-for="item in sitList"
                        :key="item.Id"
                        :title="item.sit_name_cn"
                        is-link
                        @click="getSitBoard(page, item.Id)"
                    >
                        <van-tag round type="danger">{{ item.sit_total||0 }}</van-tag>
                        <van-tag v-if="item.sit_size_name_cn" mark type="primary">
                            {{
                            item.sit_size_name_cn
                            }}
                        </van-tag>
                        <van-tag v-if="item.sit_remark">{{ item.sit_remark }}</van-tag>
                    </van-cell>
                </van-list>
            </van-popup>
            <van-field
                v-model="page.sit_size_name_cn"
                label="坐靠尺寸"
                clearable
                placeholder="请选择坐靠尺寸"
                disabled
            />
            <van-cell title="坐靠数量">
                <van-stepper :min="0" v-model="page.sit_order_total" />
            </van-cell>
            <van-field
                clearable
                v-model="page.l_tea_name_cn"
                label="长几"
                placeholder="请输入长几型号"
                @click="loadLTea(page)"
            />
            <van-popup v-model="page.lTeaShow" round position="bottom" :style="{ height: '70%' }">
                <van-list>
                    <van-cell
                        v-for="item in l_teaList"
                        :key="item.Id"
                        :title="item.l_tea_name_cn"
                        is-link
                        @click="getLTea(page, item.Id)"
                    >
                        <van-tag round type="danger">{{ item.l_tea_total||0 }}</van-tag>
                        <van-tag v-if="item.l_tea_size_name_cn" mark type="primary">
                            {{
                            item.l_tea_size_name_cn
                            }}
                        </van-tag>
                        <van-tag v-if="item.l_tea_remark">{{ item.l_tea_remark }}</van-tag>
                    </van-cell>
                </van-list>
            </van-popup>
            <van-field
                v-model="page.l_tea_size_name_cn"
                label="长几尺寸"
                clearable
                placeholder="请选择长几尺寸"
                disabled
            />
            <van-cell title="长几数量">
                <van-stepper :min="0" v-model="page.l_tea_order_total" />
            </van-cell>
            <van-field
                v-model="page.chaise_name_cn"
                label="贵妃"
                clearable
                placeholder="请先选择转角型号"
                disabled
            >
                <van-checkbox
                    shape="square"
                    slot="left-icon"
                    v-model="page.chaise_checked"
                    :disabled="page.chaise_disabled"
                    @click="setChaise(page)"
                />
            </van-field>
            <van-cell title="贵妃数量">
                <van-stepper :min="0" v-model="page.chaise_order_total" />
            </van-cell>
            <van-field
                v-model="page.corner_single_price"
                size="large"
                clearable
                type="number"
                name="转角单价"
                label="转角单价"
                placeholder="请填写该整套转角单价(含布垫)"
            />
            <van-cell size="large" title="转角数量(套)">
                <van-stepper :min="0" v-model="page.corner_number" />
            </van-cell>
            <div>
                <van-divider content-position="left">布垫填写</van-divider>
            </div>
            <van-field
                clearable
                v-model="page.pillow_name_cn"
                label="坐垫型号"
                placeholder="请选择坐垫型号"
                @click="loadPillowData(page)"
            />
            <van-popup v-model="page.pillowShow" round position="bottom" :style="{ height: '70%' }">
                <van-list>
                    <van-cell
                        v-for="item in pillowList"
                        :key="item.Id"
                        :title="item.pillow_name_cn"
                        is-link
                        @click="getPillow(page, item.Id)"
                    >
                        <van-tag v-if="item.pillow_remark">
                            {{
                            item.pillow_remark
                            }}
                        </van-tag>
                    </van-cell>
                </van-list>
            </van-popup>
            <van-field
                v-model="page.pillow_speci_name_cn"
                name="坐垫规格"
                clearable
                label="坐垫规格"
                placeholder="请选择坐垫规格"
                @click="loadPillow_speci(page)"
            />
            <van-popup
                v-model="page.pillow_speciShow"
                round
                position="bottom"
                :style="{ height: '70%' }"
            >
                <van-list>
                    <van-cell
                        v-for="item in pillow_speciList"
                        :key="item.Id"
                        :title="item.pillow_speci_name_cn"
                        is-link
                        @click="getPillow_speci(page, item.Id)"
                    >
                        <van-tag round type="danger">{{ item.pillow_total ||0}}</van-tag>
                        <van-tag v-if="item.pillow_color_name_cn" type="primary" mark>
                            {{
                            item.pillow_color_name_cn
                            }}
                        </van-tag>
                        <van-tag v-if="item.pillow_size_name_cn" type="primary" mark>
                            {{
                            item.pillow_size_name_cn
                            }}
                        </van-tag>
                    </van-cell>
                </van-list>
            </van-popup>
            <van-field
                clearable
                v-model="page.pillow_size_name_cn"
                name="坐垫尺寸"
                label="坐垫尺寸"
                placeholder="请选择坐垫规格"
                disabled
            />
            <van-field
                v-model="page.pillow_color_name_cn"
                name="坐垫颜色"
                label="坐垫颜色"
                clearable
                placeholder="请选择坐垫规格"
                disabled
            />
            <van-popup
                v-model="page.pillow_colorShow"
                round
                position="bottom"
                :style="{ height: '70%' }"
            >
                <van-list>
                    <van-cell
                        v-for="item in pillow_colorList"
                        :key="item.Id"
                        :title="item.pillow_color_name_cn"
                        is-link
                        @click="getPillow_color(page, item.Id)"
                    >
                        <van-tag round type="danger">{{ item.pillow_color_total||0 }}</van-tag>
                        <van-tag v-if="item.pillow_color_remark">
                            {{
                            item.pillow_color_remark
                            }}
                        </van-tag>
                    </van-cell>
                </van-list>
            </van-popup>
            <van-cell title="坐垫数量">
                <van-stepper :min="0" v-model="page.pillow_order_total" />
            </van-cell>
            <van-field
                v-model="page.waist_name_cn"
                name="腰包型号"
                clearable
                label="腰包型号"
                placeholder="请选择腰包型号"
                @click="loadWaist(page)"
            />
            <van-popup v-model="page.waistShow" round position="bottom" :style="{ height: '70%' }">
                <van-list>
                    <van-cell
                        v-for="item in waistList"
                        :key="item.Id"
                        :title="item.waist_name_cn"
                        is-link
                        @click="getWaist(page, item.Id)"
                    >
                        <van-tag round type="danger">{{ item.waist_total ||0}}</van-tag>
                        <van-tag v-if="item.waist_color_name_cn" mark type="primary">
                            {{
                            item.waist_color_name_cn
                            }}
                        </van-tag>
                        <van-tag v-if="item.waist_remark">{{ item.waist_remark }}</van-tag>
                    </van-cell>
                </van-list>
            </van-popup>
            <van-field
                v-model="page.waist_color_name_cn"
                name="腰包颜色"
                clearable
                label="腰包颜色"
                placeholder="请选择腰包颜色"
                @click="loadWaist_color(page)"
            />
            <van-popup
                v-model="page.waist_colorShow"
                round
                position="bottom"
                :style="{ height: '70%' }"
            >
                <van-list>
                    <van-cell
                        v-for="item in waist_colorList"
                        :key="item.Id"
                        :title="item.waist_color_name_cn"
                        is-link
                        @click="getWaist_color(page, item.Id)"
                    >
                        <van-tag round type="danger">{{ item.waist_color_total ||0}}</van-tag>
                        <van-tag v-if="item.waist_color_remark">
                            {{
                            item.waist_color_remark
                            }}
                        </van-tag>
                    </van-cell>
                </van-list>
            </van-popup>
            <van-cell title="腰包数量">
                <van-stepper :min="0" v-model="page.waist_order_total" />
            </van-cell>

            <div v-if="page.moreProps">
                <van-divider content-position="left">沙发填写</van-divider>

                <van-field
                    v-model="page.sofa_name_cn"
                    name="沙发型号"
                    label="沙发型号"
                    clearable
                    placeholder="请选择沙发型号"
                    @click="loadSofaData(page)"
                />
                <van-popup
                    v-model="page.sofaShow"
                    round
                    position="bottom"
                    :style="{ height: '70%' }"
                >
                    <van-list>
                        <van-cell
                            v-for="item in sofaList"
                            :key="item.Id"
                            :title="item.sofa_name_cn"
                            is-link
                            @click="getSofa(page, item.Id)"
                        >
                            <van-tag v-if="item.sofa_color_name_cn" mark type="primary">
                                {{
                                item.sofa_color_name_cn
                                }}
                            </van-tag>
                            <van-tag v-if="item.sofa_remark">{{ item.sofa_remark }}</van-tag>
                            <van-tag v-if="item.sofa_size_name_cn" mark type="primary">
                                {{
                                item.sofa_size_name_cn
                                }}
                            </van-tag>
                        </van-cell>
                    </van-list>
                </van-popup>
                <van-field
                    v-model="page.sofa_color_name_cn"
                    name="沙发颜色"
                    clearable
                    label="沙发颜色"
                    placeholder="请选择沙发颜色"
                />
                <van-field
                    v-model="page.sofa_size_name_cn"
                    clearable
                    name="沙发尺寸"
                    label="沙发尺寸"
                    placeholder="请选择沙发尺寸"
                />
                <van-cell title="单人位数量">
                    <van-stepper :min="0" v-model="page.single_order_total" />
                </van-cell>
                <van-cell title="双人位数量">
                    <van-stepper :min="0" v-model="page.double_order_total" />
                </van-cell>
                <van-cell title="三人位数量">
                    <van-stepper :min="0" v-model="page.triple_order_total" />
                </van-cell>
                <van-field
                    v-model="page.sl_tea_name_cn"
                    label="长几"
                    clearable
                    placeholder="请输入长几型号"
                    @click="loadLTea(page)"
                />
                <van-popup
                    v-model="page.slTeaShow"
                    round
                    position="bottom"
                    :style="{ height: '70%' }"
                >
                    <van-list>
                        <van-cell
                            v-for="item in l_teaList"
                            :key="item.Id"
                            :title="item.l_tea_name_cn"
                            is-link
                            @click="getSLTea(page, item.Id)"
                        >
                            <van-tag round type="danger">{{ item.l_tea_total||0 }}</van-tag>
                            <van-tag v-if="item.l_tea_size_name_cn" mark type="primary">
                                {{
                                item.l_tea_size_name_cn
                                }}
                            </van-tag>
                            <van-tag v-if="item.l_tea_remark">
                                {{
                                item.l_tea_remark
                                }}
                            </van-tag>
                        </van-cell>
                    </van-list>
                </van-popup>
                <van-field
                    v-model="page.sl_tea_size_name_cn"
                    label="长几尺寸"
                    clearable
                    placeholder="请选择长几尺寸"
                    disabled
                />
                <van-cell title="长几数量">
                    <van-stepper :min="0" v-model="page.sl_tea_order_total" />
                </van-cell>
                <van-field
                    clearable
                    v-model="page.s_tea_name_cn"
                    label="方几"
                    placeholder="请输入方几型号"
                    @click="loadSTea(page)"
                />
                <van-popup
                    v-model="page.sTeaShow"
                    round
                    position="bottom"
                    :style="{ height: '70%' }"
                >
                    <van-list>
                        <van-cell
                            v-for="item in s_teaList"
                            :key="item.Id"
                            :title="item.s_tea_name_cn"
                            is-link
                            @click="getSTea(page, item.Id)"
                        >
                            <van-tag round type="danger">{{ item.s_tea_total||0}}</van-tag>

                            <van-tag v-if="item.s_tea_remark">
                                {{
                                item.s_tea_remark
                                }}
                            </van-tag>
                        </van-cell>
                    </van-list>
                </van-popup>
                <van-cell title="方几数量">
                    <van-stepper :min="0" v-model="page.s_tea_order_total" />
                </van-cell>
                <van-field
                    v-model="page.r_tea_name_cn"
                    label="圆几"
                    clearable
                    placeholder="请输入圆几型号"
                    @click="loadRTea(page)"
                />
                <van-popup
                    v-model="page.rTeaShow"
                    round
                    position="bottom"
                    :style="{ height: '70%' }"
                >
                    <van-list>
                        <van-cell
                            v-for="item in r_teaList"
                            :key="item.Id"
                            :title="item.r_tea_name_cn"
                            is-link
                            @click="getRTea(page, item.Id)"
                        >
                            <van-tag round type="danger">{{ item.r_tea_total }}</van-tag>
                            <van-tag v-if="item.r_tea_remark">
                                {{
                                item.r_tea_remark
                                }}
                            </van-tag>
                        </van-cell>
                    </van-list>
                </van-popup>
                <van-cell title="圆几数量">
                    <van-stepper :min="0" v-model="page.r_tea_order_total" />
                </van-cell>
                <van-field
                    v-model="page.sofa_single_price"
                    size="large"
                    type="number"
                    clearable
                    name="沙发单价"
                    label="沙发单价"
                    placeholder="请填写该整套沙发单价(含布垫)"
                />
                <van-cell size="large" title="沙发数量">
                    <van-stepper :min="0" v-model="page.sofa_number" />
                </van-cell>
            </div>
            <div style="text-align:center">
                <van-button v-if="!page.moreProps" @click="addProps(page)">更多属性</van-button>
                <van-button v-if="page.moreProps" @click="addProps(page, false)">收起</van-button>
            </div>
            <van-divider />
        </div>
        <div style="margin: 16px;">
            <van-button @click="addMore">+添加其他商品</van-button>
        </div>
        <van-divider content-position="left">订单信息</van-divider>
        <van-field v-model="total_pieces" type="digit" label="总件数" clearable placeholder="请填写总件数" />
        <van-field
            size="large"
            v-model="all_price"
            type="digit"
            label="总金额"
            clearable
            placeholder="请填写总金额"
        />
        <van-field
            size="large"
            v-model="paid_price"
            type="digit"
            label="订金"
            clearable
            placeholder="请填写订金"
        />
        <van-field
            v-model="need_price"
            size="large"
            type="digit"
            label="余额"
            clearable
            placeholder="请填写余额"
        />

        <van-cell title="送货日期" v-model="send_time" @click="send_time_show = true" />
        <van-calendar
            v-model="send_time_show"
            :show-confirm="false"
            poppable
            @confirm="confirmSend_time"
        />
        <van-field
            v-model="customer_name_cn"
            label="客户名称"
            clearable
            placeholder="请填写客户名称"
            @click="loadCustomer"
        >
            <van-switch v-model="customer_switch" slot="left-icon" size="20px" />
        </van-field>
        <van-field v-model="customer_tel" label="客户电话" clearable placeholder="请填写客户电话" />
        <van-field
            v-model="customer_address"
            type="textarea"
            rows="1"
            autosize
            label="客户地址"
            clearable
            placeholder="请填写客户地址"
        />
        <van-popup v-model="customer_info_show" round position="bottom" :style="{ height: '70%' }">
            <van-panel
                style="margin-top:30px"
                v-for="item in customerList"
                :key="item.Id"
                :title="item.customer_name_cn"
                :desc="item.customer_tel"
                @click="getCustomer(item.Id)"
            >
                <div class="panelBody">{{ item.customer_address }}</div>
            </van-panel>
        </van-popup>
        <van-field
            v-model="express_name_cn"
            label="物流名称"
            clearable
            placeholder="请填写物流名称"
            @click="loadExpress"
        >
            <van-switch v-model="express_switch" slot="left-icon" size="20px" />
        </van-field>
        <van-field v-model="express_tel" label="物流电话" clearable placeholder="请填写物流电话" />
        <van-field
            v-model="express_no"
            type="textarea"
            rows="1"
            autosize
            label="物流号"
            clearable
            placeholder="请填写物流号"
        />
        <van-popup v-model="express_info_show" round position="bottom" :style="{ height: '70%' }">
            <van-panel
                style="margin-top:30px"
                v-for="item in expressList"
                :key="item.Id"
                :title="item.express_name_cn"
                :desc="item.express_tel"
                @click="getExpress(item.Id)"
            >
                <div class="panelBody">{{ item.express_no }}</div>
            </van-panel>
        </van-popup>
        <van-field
            v-model="order_remark"
            type="textarea"
            rows="1"
            autosize
            label="订单备注"
            clearable
            placeholder="请填写订单备注"
        />
        <div style="margin: 16px;">
            <van-button round block type="info" @click="onSubmit">保存</van-button>
        </div>
        {{ getCornerTotal }}
        {{ getSofaTotal }}
        {{ getAllTotal }}
        {{ getneed_price }}
    </div>
</template>

<script>
import { fetchData, deleteData, postData } from "../api/global";
import { Notify } from "vant";
export default {
    name: "Output_order",
    props: ["navTitle"],

    data() {
        return {
            // currentTime: new Date(),
            order_remark: "",
            send_time: "",
            total_pieces: "",
            all_price: "",
            paid_price: "",
            need_price: "",
            customer_name_cn: "",
            customer_tel: "",
            customer_address: "",
            express_name_cn: "",
            express_tel: "",
            express_no: "",
            // 弹出层的控制
            send_time_show: false,
            customer_info_show: false,
            express_info_show: false,
            // 订单
            pages: [],
            needntPropsArray: [
                "cornerShow",
                "armrestShow",
                "sofaShow",
                "sitShow",
                "lTeaShow",
                "slTeaShow",
                "sTeaShow",
                "rTeaShow",
                "chaise_checked",
                "chaise_disabled",
                "chaise_Id",
                "moreProps",
                "pillowShow",
                "chaise_total"
            ],
            form: {},
            customer_switch: true,
            express_switch: true,
            CsofaList: [],
            sofaList: [],
            l_teaList: [],
            s_teaList: [],
            r_teaList: [],
            pillowList: [],
            waistList: [],
            pillow_colorList: [],
            pillow_speciList: [],
            waist_colorList: [],
            sitList: [],
            armrestList: [],
            customerList: [],
            expressList: []
        };
    },
    created() {
        this.initForm();
        this.addMore();
    },
    computed: {
        Id() {
            return this.$route.params.Id;
        },
        lastType() {
            return this.$route.params.type;
        },
        getCornerTotal() {
            const arr = this.pages;
            arr.forEach(ele => {
                const num = ele.corner_number;
                ele.corner_total_price = num * ele.corner_single_price;
                return;
            });
        },
        getSofaTotal() {
            const arr = this.pages;
            arr.forEach(ele => {
                const num = ele.sofa_number;
                ele.sofa_total_price = num * ele.sofa_single_price;
                return;
            });
        },
        getAllTotal() {
            const arr = this.pages;
            let all = 0;
            arr.forEach(ele => {
                const num2 = ele.sofa_number;
                const num1 = ele.corner_number;

                ele.sofa_total_price = num2 * ele.sofa_single_price;
                ele.corner_total_price = num1 * ele.corner_single_price;

                all += ele.corner_total_price + ele.sofa_total_price;
            });
            this.all_price = all || 0;
            return;
        },
        getneed_price() {
            this.need_price = this.all_price - this.paid_price || 0;
            return;
        }
    },
    methods: {
        formatDate(date) {
            return `${date.getFullYear()}/${date.getMonth() +
                1}/${date.getDate()}`;
        },
        initForm() {
            this.form = {
                r_tea_order_total: "",
                sofa_number: 0,
                corner_number: 0,
                armrest_Id: "",
                sit_board_Id: "",
                l_tea_table_Id: "",
                sl_tea_table_Id: "",
                pillow_color_Id: "",
                waist_color_Id: "",
                sofa_stock_Id: "",
                r_tea_Id: "",
                s_tea_Id: "",
                corner_name_cn: "",
                s_tea_order_total: "",
                corner_size_name_cn: "",
                corner_color_name_cn: "",
                armrest_name_cn: "",
                armrest_order_total: "",
                sit_name_cn: "",
                sit_size_name_cn: "",
                sit_order_total: "",
                chaise_name_cn: "",
                chaise_order_total: "",
                l_tea_name_cn: "",
                l_tea_size_name_cn: "",
                l_tea_order_total: "",
                sl_tea_name_cn: "",
                sl_tea_size_name_cn: "",
                sl_tea_order_total: "",
                pillow_name_cn: "",
                pillow_speci_name_cn: "",
                pillow_size_name_cn: "",
                pillow_color_name_cn: "",
                pillow_order_total: "",
                waist_order_total: "",
                waist_color_name_cn: "",
                waist_name_cn: "",
                sofa_name_cn: "",
                sofa_color_name_cn: "",
                sofa_size_name_cn: "",
                triple_order_total: "",
                double_order_total: "",
                single_order_total: "",
                corner_single_price: "",
                sofa_single_price: ""
            };
        },
        initPropsArr(form) {
            const arr = this.needntPropsArray;
            arr.forEach(ele => {
                if (ele === "chaise_disabled") {
                    this.$set(form, "chaise_disabled", true);
                } else if (ele === "chaise_Id") {
                    form[ele] = "";
                } else {
                    form[ele] = false;
                }
            });
        },
        objcopy() {
            const obj = {};
            const keys = Object.keys(this.form);
            keys.forEach(ele => {
                obj[ele] = "";
            });
            this.initPropsArr(obj);
            return obj;
        },
        async loadCornerData(page) {
            this.$set(page, "cornerShow", true);
            if (this.CsofaList.length === 0) {
                const Csofa = await fetchData("corner_stock/api/fetch", {});
                this.CsofaList = Csofa.data;
            }
        },
        async loadSofaData(page) {
            this.$set(page, "sofaShow", true);
            if (this.sofaList.length === 0) {
                const sofa = await fetchData("sofa_stock/api/fetch", {});
                this.sofaList = sofa.data;
            }
        },
        async loadArmrestData(page) {
            this.$set(page, "armrestShow", true);
            if (this.armrestList.length === 0) {
                const armrest = await fetchData("armrest/api/fetch", {});
                this.armrestList = armrest.data;
            }
        },
        async loadSitData(page) {
            this.$set(page, "sitShow", true);
            if (this.sitList.length === 0) {
                const sit = await fetchData("sit_board/api/fetch", {});
                this.sitList = sit.data;
            }
        },
        async loadLTea(page) {
            this.$set(page, "slTeaShow", true);
            if (this.l_teaList.length === 0) {
                const ltea = await fetchData("l_tea_table/api/fetch", {});
                this.l_teaList = ltea.data;
            }
        },
        async loadSLTea(page) {
            this.$set(page, "slTeaShow", true);
            if (this.l_teaList.length === 0) {
                const ltea = await fetchData("l_tea_table/api/fetch", {});
                this.l_teaList = ltea.data;
            }
        },
        async loadSTea(page) {
            this.$set(page, "sTeaShow", true);
            if (this.s_teaList.length === 0) {
                const stea = await fetchData("s_tea_table/api/fetch", {});
                this.s_teaList = stea.data;
            }
        },
        async loadRTea(page) {
            this.$set(page, "rTeaShow", true);
            if (this.r_teaList.length === 0) {
                const rtea = await fetchData("r_tea_table/api/fetch", {});
                this.r_teaList = rtea.data;
            }
        },
        async loadPillowData(page) {
            this.$set(page, "pillowShow", true);
            if (this.pillowList.length === 0) {
                const rtea = await fetchData("pillow_stock/api/fetch", {});
                this.pillowList = rtea.data;
            }
        },
        async loadPillow_color(page) {
            this.$set(page, "pillow_colorShow", true);
            if (this.pillow_colorList.length === 0) {
                const rtea = await fetchData("pillow_color/api/fetch", {});
                this.pillow_colorList = rtea.data;
            }
        },
        async loadPillow_speci(page) {
            this.$set(page, "pillow_speciShow", true);
            if (this.pillow_speciList.length === 0) {
                const rtea = await fetchData("pillow_speci/api/fetch", {});
                this.pillow_speciList = rtea.data;
            }
        },
        async loadWaist(page) {
            this.$set(page, "waistShow", true);
            if (this.waistList.length === 0) {
                const rtea = await fetchData("waist/api/fetch", {});
                this.waistList = rtea.data;
            }
        },
        loadCustomer() {
            const customer_switch = this.customer_switch;
            if (customer_switch === false) {
                return;
            } else {
                this.customer_info_show = true;
                if (this.customerList.length === 0) {
                    this.loadCustomerData();
                }
            }
        },
        async loadCustomerData() {
            const customerList = await fetchData("customer/api/fetch", {});
            this.customerList = customerList.data;
        },
        async loadWaist_color(page) {
            this.$set(page, "waist_colorShow", true);
            if (this.waist_colorList.length === 0) {
                const rtea = await fetchData("waist_color/api/fetch", {});
                this.waist_colorList = rtea.data;
            }
        },
        async loadExpress() {
            const express_switch = this.express_switch;
            if (express_switch === false) {
                return;
            } else {
                this.express_info_show = true;
                if (this.expressList.length === 0) {
                    const rtea = await fetchData("express/api/fetch", {});
                    this.expressList = rtea.data;
                }
            }
        },
        getExpress(Id) {
            const expressList = this.expressList;
            let obj = {};
            expressList.forEach(ele => {
                if (ele.Id === Id) {
                    obj = ele;
                }
            });
            const { express_name_cn, express_tel, express_no } = obj;
            this.express_name_cn = express_name_cn;
            this.express_tel = express_tel;
            this.express_no = express_no;
            this.express_info_show = false;
        },
        getCustomer(Id) {
            const customerList = this.customerList;
            let obj = {};
            customerList.forEach(ele => {
                if (ele.Id === Id) {
                    obj = ele;
                }
            });
            const { customer_name_cn, customer_tel, customer_address } = obj;
            this.customer_name_cn = customer_name_cn;
            this.customer_tel = customer_tel;
            this.customer_address = customer_address;
            this.customer_info_show = false;
        },
        getPillow(page, Id) {
            const pillowList = this.pillowList;
            let obj = {};
            pillowList.forEach(ele => {
                if (ele.Id === Id) {
                    obj = ele;
                }
            });
            const {
                pillow_name_cn,
                pillow_color_name_cn,
                pillow_size_name_cn,
                pillow_speci_name_cn,
                waist_total,
                waist_color_name_cn,
                waist_name_cn,
                pillow_speci_Id
            } = obj;
            if (waist_total != "0") {
                page.waist_color_name_cn = waist_color_name_cn;
                page.waist_name_cn = waist_name_cn;
            }
            page.pillow_speci_Id = pillow_speci_Id;
            page.pillow_name_cn = pillow_name_cn;
            page.pillow_color_name_cn = pillow_color_name_cn;
            page.pillow_speci_name_cn = pillow_speci_name_cn;
            page.pillow_size_name_cn = pillow_size_name_cn;
            this.onClosePop(page);
        },
        getSofa(page, Id) {
            const sofaList = this.sofaList;
            let obj = {};
            sofaList.forEach(ele => {
                if (ele.Id === Id) {
                    obj = ele;
                }
            });
            const { sofa_name_cn, sofa_color_name_cn, sofa_size_name_cn } = obj;
            page.sofa_name_cn = sofa_name_cn;
            page.sofa_color_name_cn = sofa_color_name_cn;
            page.sofa_size_name_cn = sofa_size_name_cn;
            this.onClosePop(page);
        },
        getCorner(page, Id) {
            this.$set(page, "chaise_disabled", false);
            const CsofaList = this.CsofaList;
            let obj = {};
            CsofaList.forEach(ele => {
                if (ele.Id === Id) {
                    obj = ele;
                }
            });
            const {
                corner_name_cn,
                corner_color_name_cn,
                chaise_Id,
                l_tea_name_cn,
                l_tea_size_name_cn,
                l_tea_total,
                sit_name_cn,
                sit_size_name_cn,
                sit_total,
                chaise_total,
                armrest_name_cn,
                armrest_total
            } = obj;
            page.chaise_Id = chaise_Id;
            page.corner_name_cn = corner_name_cn;
            page.corner_color_name_cn = corner_color_name_cn;

            if (l_tea_total !== "0") {
                page.l_tea_name_cn = l_tea_name_cn;
                page.l_tea_size_name_cn = l_tea_size_name_cn;
            }
            if (sit_total !== "0") {
                page.sit_name_cn = sit_name_cn;
                page.sit_size_name_cn = sit_size_name_cn;
            }
            if (armrest_total !== "0") {
                page.armrest_name_cn = armrest_name_cn;
            }
            this.onClosePop(page);
        },
        getArmRest(page, Id) {
            const armrestList = this.armrestList;
            let obj = {};
            armrestList.forEach(ele => {
                if (ele.Id === Id) {
                    obj = ele;
                }
            });
            const { armrest_name_cn, armrest_Id } = obj;

            page.armrest_Id = armrest_Id;
            page.armrest_name_cn = armrest_name_cn;
            // this.$set(page, "armrest_name_cn", armrest_name_cn);
            this.onClosePop(page);
        },
        getSitBoard(page, Id) {
            const sitList = this.sitList;
            let obj = {};
            sitList.forEach(ele => {
                if (ele.Id === Id) {
                    obj = ele;
                }
            });
            const { sit_name_cn, sit_size_name_cn, sit_board_Id } = obj;

            page.sit_board_Id = sit_board_Id;
            page.sit_name_cn = sit_name_cn;
            page.sit_size_name_cn = sit_size_name_cn;

            this.onClosePop(page);
        },
        getSTea(page, Id) {
            const s_teaList = this.s_teaList;
            let obj = {};
            s_teaList.forEach(ele => {
                if (ele.Id === Id) {
                    obj = ele;
                }
            });
            const { s_tea_name_cn } = obj;

            page.s_tea_name_cn = s_tea_name_cn;
            // page.s_tea_size_name_cn = s_tea_size_name_cn;

            this.onClosePop(page);
        },
        getRTea(page, Id) {
            const r_teaList = this.r_teaList;
            let obj = {};
            r_teaList.forEach(ele => {
                if (ele.Id === Id) {
                    obj = ele;
                }
            });
            const { r_tea_name_cn } = obj;
            page.r_tea_name_cn = r_tea_name_cn;
            // page.r_tea_size_name_cn = r_tea_size_name_cn;
            this.onClosePop(page);
        },
        getLTea(page, Id) {
            const l_teaList = this.l_teaList;
            let obj = {};
            l_teaList.forEach(ele => {
                if (ele.Id === Id) {
                    obj = ele;
                }
            });

            const { l_tea_table_Id, l_tea_name_cn, l_tea_size_name_cn } = obj;
            page.l_tea_table_Id = l_tea_table_Id;

            page.l_tea_name_cn = l_tea_name_cn;
            page.l_tea_size_name_cn = l_tea_size_name_cn;

            this.onClosePop(page);
        },
        getSLTea(page, Id) {
            const l_teaList = this.l_teaList;
            let obj = {};
            l_teaList.forEach(ele => {
                if (ele.Id === Id) {
                    obj = ele;
                }
            });
            const { l_tea_name_cn, l_tea_size_name_cn } = obj;
            page.sl_tea_name_cn = l_tea_name_cn;
            page.sl_tea_size_name_cn = l_tea_size_name_cn;

            this.onClosePop(page);
        },
        getPillow_color(page, Id) {
            const pillow_colorList = this.pillow_colorList;
            let obj = {};
            pillow_colorList.forEach(ele => {
                if (ele.Id === Id) {
                    obj = ele;
                }
            });
            const {
                pillow_color_name_cn,
                pillow_name_cn,
                pillow_color_Id
            } = obj;

            page.pillow_color_name_cn = pillow_color_name_cn;
            page.pillow_color_Id = pillow_color_Id;

            page.pillow_name_cn = pillow_name_cn;
            this.onClosePop(page);
        },
        getPillow_speci(page, Id) {
            const pillow_speciList = this.pillow_speciList;
            let obj = {};
            pillow_speciList.forEach(ele => {
                if (ele.Id === Id) {
                    obj = ele;
                }
            });
            const {
                pillow_speci_name_cn,
                pillow_color_name_cn,
                pillow_size_name_cn
            } = obj;
            page.pillow_speci_name_cn = pillow_speci_name_cn;
            page.pillow_color_name_cn = pillow_color_name_cn;
            page.pillow_size_name_cn = pillow_size_name_cn;

            this.onClosePop(page);
        },
        getWaist(page, Id) {
            const waistList = this.waistList;
            let obj = {};
            waistList.forEach(ele => {
                if (ele.Id === Id) {
                    obj = ele;
                }
            });

            const { waist_name_cn, waist_Id } = obj;
            page.waist_Id = waist_Id;
            page.waist_name_cn = waist_name_cn;
            this.onClosePop(page);
        },
        getWaist_color(page, Id) {
            const waist_colorList = this.waist_colorList;
            let obj = {};
            waist_colorList.forEach(ele => {
                if (ele.Id === Id) {
                    obj = ele;
                }
            });
            const { waist_color_name_cn, waist_color_Id } = obj;
            page.waist_color_Id = waist_color_Id;

            page.waist_color_name_cn = waist_color_name_cn;
            this.onClosePop(page);
        },
        onClosePop(page) {
            this.$set(page, "sofaShow", false);
            this.$set(page, "cornerShow", false);
            this.$set(page, "armrestShow", false);
            this.$set(page, "sitShow", false);
            this.$set(page, "pillow_speciShow", false);
            this.$set(page, "waist_colorShow", false);
            this.$set(page, "waistShow", false);
            this.$set(page, "pillowShow", false);
            this.$set(page, "slTeaShow", false);
            this.$set(page, "lTeaShow", false);
            this.$set(page, "rTeaShow", false);
            this.$set(page, "sTeaShow", false);
        },
        async setChaise(page) {
            if (!page.chaise_Id) {
                // this.$set(page, "chaise_checked", false);
                return;
            }

            if (page.chaise_checked) {
                this.$set(page, "chaise_name_cn", "");
                this.$set(page, "chaise_order_total", "0");
            } else {
                const Id = page.chaise_Id;
                const chaise = await fetchData("chaise/api/fetch", { Id });
                if (chaise.data[0].chaise_total !== "0") {
                    this.$set(
                        page,
                        "chaise_name_cn",
                        chaise.data[0].chaise_name_cn
                    );
                    this.$set(page, "chaise_order_total", "1");
                } else {
                    Dialog.confirm({
                        title: "警告",
                        message: "贵妃数量为0是否确认?"
                    })
                        .then(() => {
                            this.$set(
                                page,
                                "chaise_name_cn",
                                chaise.data[0].chaise_name_cn
                            );
                            this.$set(page, "chaise_order_total", "1");
                        })
                        .catch(() => {
                            this.$set(page, "chaise_name_cn", "");
                        });
                }
            }
        },
        confirmSend_time(val) {
            this.send_time_show = false;
            this.send_time = this.formatDate(val);
        },
        onSubmit() {
            const order_no = this.random_No();
            const arr = [];
            this.pages.forEach(el => {
                const obj = {};
                if (el.sofa_total_price === 0 && el.corner_total_price === 0) {
                    // 提示
                    Notify({ type: "warning", message: "请填写单价和数量" });
                    return;
                } else {
                    if (el.sofa_total_price !== 0) {
                        obj.sofa_total_price = el.sofa_total_price;
                        obj.sofa_single_price = el.sofa_single_price;
                        obj.sofa_number = el.sofa_number;
                    }
                    if (el.corner_total_price !== 0) {
                        obj.corner_total_price = el.corner_total_price;
                        obj.corner_single_price = el.corner_single_price;
                        obj.corner_number = el.corner_number;
                    }
                }
                if (el.corner_name_cn) {
                    obj.corner_name_cn = el.corner_name_cn;
                    obj.corner_size_name_cn = el.corner_size_name_cn || "";
                    obj.corner_color_name_cn = el.corner_color_name_cn;
                }
                if (el.armrest_total !== 0) {
                    obj.armrest_Id = armrest_Id;
                    obj.armrest_total = el.armrest_total;
                    obj.armrest_name_cn = el.armrest_name_cn;
                    obj.armrest_total = el.armrest_total;
                }
                if (el.sit_order_total !== 0) {
                    obj.sit_board_Id = 1;
                    obj.sit_order_total = el.sit_order_total;
                    obj.sit_name_cn = el.sit_name_cn;
                    obj.sit_size_name_cn = el.sit_size_name_cn;
                }
                if (el.l_tea_order_total !== 0) {
                    obj.l_tea_table_Id = l_tea_table_Id;
                    obj.l_tea_order_total = el.l_tea_order_total;
                    obj.l_tea_name_cn = el.l_tea_name_cn;
                    obj.l_tea_size_name_cn = el.l_tea_size_name_cn;
                }
                if (el.chaise_checked === true) {
                    obj.chaise_Id = chaise_Id;
                    obj.chaise_name_cn = el.chaise_name_cn;
                    obj.chaise_order_total = el.chaise_order_total;
                }
                if (el.pillow_order_total !== 0) {
                    obj.pillow_speci_Id = pillow_speci_Id;
                    obj.pillow_color_Id = pillow_color_Id;
                    obj.pillow_order_total = el.pillow_order_total;
                    obj.pillow_name_cn = el.pillow_name_cn;
                    obj.pillow_speci_name_cn = el.pillow_speci_name_cn;
                    obj.pillow_color_name_cn = el.pillow_color_name_cn;
                    obj.pillow_size_name_cn = el.pillow_size_name_cn;
                }
                if (el.waist_order_total !== 0) {
                    obj.waist_Id = waist_Id;
                    obj.waist_color_Id = waist_color_Id;
                    obj.waist_order_total = el.waist_order_total;
                    obj.waist_color_name_cn = el.waist_color_name_cn;
                    obj.waist_name_cn = el.waist_name_cn;
                }
                if (el.single_order_total !== 0) {
                    obj.sofa_name_cn = el.sofa_name_cn;
                    obj.sofa_color_name_cn = el.sofa_color_name_cn;
                    obj.sofa_size_name_cn = el.sofa_size_name_cn;
                    obj.single_order_total = el.single_order_total;
                }
                if (el.double_order_total !== 0) {
                    obj.sofa_name_cn = el.sofa_name_cn;
                    obj.sofa_color_name_cn = el.sofa_color_name_cn;
                    obj.sofa_size_name_cn = el.sofa_size_name_cn;
                    obj.double_order_total = el.double_order_total;
                }
                if (el.triple_order_total !== 0) {
                    obj.sofa_name_cn = el.sofa_name_cn;
                    obj.sofa_color_name_cn = el.sofa_color_name_cn;
                    obj.sofa_size_name_cn = el.sofa_size_name_cn;
                    obj.triple_order_total = el.triple_order_total;
                }
                if (el.sl_tea_order_total !== 0) {
                    obj.sl_tea_order_total = el.sl_tea_order_total;
                    obj.sl_tea_name_cn = el.sl_tea_name_cn;
                    obj.sl_tea_size_name_cn = el.sl_tea_size_name_cn;
                }
                if (el.s_tea_order_total !== 0) {
                    obj.s_tea_order_total = el.s_tea_order_total;
                    obj.s_tea_name_cn = el.s_tea_name_cn;
                }
                if (el.r_tea_order_total !== 0) {
                    obj.r_tea_order_total = el.r_tea_order_total;
                    obj.r_tea_name_cn = el.r_tea_name_cn;
                }
                obj.order_no = order_no;
                arr.push(obj);
            });
            const commonObj = {};
            commonObj.total_pieces = this.total_pieces;
            commonObj.all_price = this.all_price;
            commonObj.paid_price = this.paid_price;
            commonObj.need_price = this.need_price;
            commonObj.send_time = this.send_time;
            commonObj.order_remark = this.order_remark;
            commonObj.customer_name_cn = this.customer_name_cn;
            commonObj.customer_tel = this.customer_tel;
            commonObj.customer_address = this.customer_address;
            commonObj.express_name_cn = this.express_name_cn;
            commonObj.express_tel = this.express_tel;
            commonObj.express_no = this.express_no;
            commonObj.order_status = "未处理";
            const data = {
                goodsObj: arr,
                commonObj
            };
            /*
          data={
        commonObj:{
            order_status:'已处理'
        }
        goodsObj:[{Id},{Id}]
    }*/
            if (this.all_price !== 0) {
                this.postOrderData(data);
            }
        },
        async postOrderData(data) {
            const res = await postData("outorder/api/create", data);
        },
        addMore() {
            const newObj = this.objcopy();
            this.pages.push(newObj);
        },
        addProps(page, Totrue = true) {
            this.$set(page, "moreProps", Totrue);
        },
        random_No(j) {
            var random_no = "";
            for (let i = 0; i < j; i++) {
                random_no += Math.floor(Math.random() * 10);
            }
            random_no = new Date().getTime() + random_no;
            return random_no;
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        onClickRight() {}
    }
};
</script>
<style scoped>
.panelBody /deep/ {
    margin-left: 15px;
}
.gray {
    color: #666;
}
.red {
    color: red;
}
.green {
    color: green;
}
</style>
