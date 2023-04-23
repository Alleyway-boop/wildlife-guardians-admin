<template>
    <el-row class="box">
        <el-col class="left-card" :span="10">
            <el-card class="admin-info" shadow="hover">
                <img :src="adminInfo.avatar" alt="">
                <div class="info">
                    <label>
                        {{ adminInfo.username }}
                    </label>
                    <span>
            {{ adminInfo.role }}
          </span>
                </div>
            </el-card>

            <el-card class="tabel" shadow="hover">
                <!--        <el-table :data="tableData" height="275" style="width: 100%;">-->
                <!--          <el-table-column prop="date" label="珍稀动物" width="180" />-->
                <!--          <el-table-column prop="name" label="动物名" width="180" />-->
                <!--          <el-table-column prop="address" label="数量" />-->
                <!--        </el-table>-->
                <el-timeline v-for="item in tableData">
                    <el-timeline-item center :timestamp="item.date" placement="top" :type="item.type">
                        <el-card>
                            <h4>{{ item.name }}</h4>
                            <p>{{ item.content }}</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-card>


        </el-col>
        <el-col :span="14" class="echartsBox">
            <!--   echarts     -->
            <v-chart class="animalChart" :option="animal" autoresize/>
            <v-chart class="plantChart" :option="plant" autoresize/>
        </el-col>
    </el-row>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue'
import {getAdmin} from '@/utils/auth'

// import { changeTime } from '@/utils/dataUtil'
import {use} from 'echarts/core';
import {CanvasRenderer} from 'echarts/renderers';
import {PieChart} from 'echarts/charts';
import {LegendComponent, TitleComponent, TooltipComponent,} from 'echarts/components';
import VChart from 'vue-echarts';

use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
]);


const animal = ref({
    title: {
        text: '珍稀动物数量分布',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
        // 布局方式
        orient: 'vertical',
        // 定位
        left: 'left',
        // 图表数据
        data: ['熊猫', '滇金丝猴', '中华白海豚', '朱鹮', '丹顶鹤', '扬子鳄', '北极熊', '高鼻羚羊', '雪豹', '澳洲毛鼻袋熊', '蜂猴', '海南长臂猿', '豺', '梅花鹿', '安徽麝'],
    },
    series: [
        {
            name: '详细信息',
            type: 'pie',
            radius: '70%',
            center: ['65%', '50%'],
            data: [
                {value: 1864, name: '熊猫'},
                {value: 3300, name: '滇金丝猴'},
                {value: 6000, name: '中华白海豚'},
                {value: 9000, name: '朱鹮'},
                {value: 3050, name: '丹顶鹤'},
                {value: 300, name: '扬子鳄'},
                {value: 618, name: '北极熊'},
                {value: 14359, name: '高鼻羚羊'},
                {value: 7506, name: '雪豹'},
                {value: 250, name: '澳洲毛鼻袋熊'},
                {value: 1722, name: '蜂猴'},
                {value: 36, name: '海南长臂猿'},
                {value: 7912, name: '豺'},
                {value: 624, name: '梅花鹿'},
                {value: 530, name: '安徽麝'},
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
});

const plant = ref({
    title: {
        text: '珍稀植物数量分布',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
        // 布局方式
        orient: 'vertical',
        // 定位
        left: 'left',
        // 图表数据
        data: ['荷叶铁线蕨', '银杏', '巨柏', '水松', '水杉', '崖柏', '银杉', '大别山五针松', '巧家五针松', '华盖木', '峨眉拟单性木兰', '焕镛木', '大黄花虾脊兰', '曲茎石斛', '霍山石斛'],
    },
    series: [
        {
            name: '详细信息',
            type: 'pie',
            radius: '75%',
            center: ['65%', '50%'],
            data: [
                {value: 1864, name: '荷叶铁线蕨'},
                {value: 3300, name: '银杏'},
                {value: 600, name: '巨柏'},
                {value: 900, name: '水松'},
                {value: 305, name: '水杉'},
                {value: 300, name: '崖柏'},
                {value: 618, name: '银杉'},
                {value: 143, name: '大别山五针松'},
                {value: 75, name: '巧家五针松'},
                {value: 25, name: '华盖木'},
                {value: 17, name: '峨眉拟单性木兰'},
                {value: 36, name: '焕镛木'},
                {value: 79, name: '大黄花虾脊兰'},
                {value: 62, name: '曲茎石斛'},
                {value: 53, name: '霍山石斛'},
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
});


const adminInfo = reactive(JSON.parse(getAdmin()))

console.log(adminInfo)

const tableData = [
    {
        date: '2004',
        name: '中华白海豚',
        content: '中国国家林业局发布的数据显示，中华白海豚的数量约为1500只。',
        type: 'success',
    },
    {
        date: '2014',
        name: '熊猫',
        content: '中国大熊猫野外种群数量为1572只。',
        type: 'success',
    },
    {
        date: '2017',
        name: '中华白海豚',
        content: '中国海洋与渔业部公布的数据显示，南海中华白海豚数量减少了60%，黄海中华白海豚已经灭绝，东海中华白海豚数量也持续下降，面临生存危机。',
        type: 'danger',
    },
    {
        date: '2020',
        name: '熊猫',
        content: '中国大熊猫野外种群数量为1864只，比上一次调查增加了292只。',
        type: 'success',
    },
    {
        date: '2021',
        name: '熊猫',
        content: '全球共有大熊猫610只，其中中国大熊猫数量为522只。',
        type: 'success',
    },

    {
        date: '2021',
        name: '中华白海豚',
        content: '中国南海、东海和黄海地区中华白海豚总体数量约为2000只左右。其中，广东、福建、浙江、上海等地的海域是中华白海豚主要的分布区域，但数量都比较少，只有几百只左右。',
        type: 'success',
    },
]


onMounted(() => {

})

</script>

<style lang="less" scoped>
.echartsBox {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;


  .animalChart {
    border-style: solid;
    border-width: 1px;
    border-radius: 10px;
    border-color: #469cff;
    width: 100%;
    height: 45%;
  }

  .plantChart {
    border-style: solid;
    border-width: 1px;
    border-radius: 10px;
    border-color: #469cff;
    width: 100%;
    height: 45%;
  }
}

.box {
  width: 100%;
  height: 100%;

  .left-card {
    padding-right: 30px;


    .el-card {
      width: 100%;
    }

    .admin-info {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 300px;

      img {
        margin-right: 50px;
        width: 100px;
        height: 100px;
      }

      .info {
        display: flex;
        flex-direction: column;
      }
    }

    .tabel {
      //  无法选择
      user-select: none;
      height: 50vh;
      margin-top: 30px;
      overflow: scroll;
      overflow-x: auto;
      overflow-y: hidden;

    }

    .tabel:hover {
      //overflow: scroll;
      //  滑动框淡入
      overflow-x: auto;
      overflow-y: auto;
    }
  }

  //.charts {
  //  display: flex;
  //  flex-direction: column;
  //  justify-content: space-between;
  //  height: 78vh;
  //
  //  .el-card {
  //  }
  //}
}
</style>
