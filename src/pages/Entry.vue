<template>
  <div>
    <div>当前周：{{ currentWeek }}</div>
    <el-button type="primary" @click="addVisible = true"
      ><i class="el-icon-edit"></i> 添 加</el-button
    >
    <el-dialog title="添加" :visible="addVisible">
      <el-input placeholder="请输入内容" v-model="meat">
        <template slot="prepend">肉</template>
      </el-input>
      <el-input placeholder="请输入内容" v-model="green">
        <template slot="prepend">素</template>
      </el-input>
      <span slot="footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>

    <el-button @click="openRandom"><i class="el-icon-fork-spoon"></i> 随机</el-button>
    <el-button @click="deleteAll"><i class="el-icon-delete"></i> 一键清空</el-button>
    <el-dialog title="随机" :visible="randomVisible">
      <dish-card :data-source="selectedDishs" />
      <span slot="footer">
        <el-button @click="randomVisible = false">取 消</el-button>
        <el-button @click="random">继 续 随 机</el-button>
        <el-button type="primary" @click="resolve">确 定</el-button>
      </span>
    </el-dialog>

    <section class="meat-dishs">
      肉
      <dish-card :data-source="meatDishs" remove />
    </section>
    <section class="green-dishs">
      素
      <dish-card :data-source="greenDishs" remove />
    </section>
  </div>
</template>

<script>
import { DishCard } from '../components';
export default {
  components: {
    'dish-card': DishCard,
  },
  data() {
    return {
      meatDishs: [],
      greenDishs: [],
      selectedDishs: [],
      meat: '',
      green: '',
      currentWeek: '',
      addVisible: false,
      randomVisible: false,
    };
  },
  mounted() {
    this.meatDishs = JSON.parse(window.localStorage.getItem('meatDishs') || '[]');
    this.greenDishs = JSON.parse(window.localStorage.getItem('greenDishs') || '[]');

    const curr = new Date();
    const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1))
      .toLocaleString('zh')
      .split(' ')[0];
    const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7))
      .toLocaleString('zh')
      .split(' ')[0];
    this.currentWeek = `${firstday} - ${lastday}`;
  },
  methods: {
    openRandom() {
      if (!this.meatDishs.length) {
        this.$message.error('请添加菜品');
      } else if (this.meatDishs.every(item => item.selected)) {
        this.$message.error('已经无法随机啦，请继续添加新的菜品');
      } else {
        this.random();
        this.randomVisible = true;
      }
    },
    random() {
      const selectedMeatDishs = this.meatDishs.filter(item => !item.selected);
      const selectedGreenDishs = this.greenDishs.filter(item => !item.selected);
      const meatIndex = Math.floor(Math.random() * selectedMeatDishs.length);
      const greenIndex = Math.floor(Math.random() * selectedGreenDishs.length);
      this.selectedDishs = [selectedMeatDishs[meatIndex], selectedGreenDishs[greenIndex]];
    },
    resolve() {
      for (const item of this.selectedDishs) {
        item.selected = true;
      }
      this.storage();
      this.randomVisible = false;
    },
    storage() {
      window.localStorage.setItem('meatDishs', JSON.stringify(this.meatDishs));
      window.localStorage.setItem('greenDishs', JSON.stringify(this.greenDishs));
    },
    add() {
      this.meatDishs.push({
        name: this.meat,
        selected: false,
      });
      this.greenDishs.push({
        name: this.green,
        selected: false,
      });
      this.storage();
      this.meat = '';
      this.green = '';
      this.addVisible = false;
    },

    remove(index) {
      this.dishs.splice(index, 1);
    },
    deleteAll() {
      this.meatDishs = [];
      this.greenDishs = [];
      this.storage();
    },
  },
};
</script>

<style lang="less">
.meat-dishs {
  max-width: 100%;
  padding: 20px;
  border: 1px solid red;
  margin: 20px 0;
}

.green-dishs {
  max-width: 100%;
  padding: 20px;
  border: 1px solid green;
}
</style>
