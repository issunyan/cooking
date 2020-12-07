<template>
  <div class="list">
    <div
      v-for="({ name, selected }, index) in dataSource"
      :key="index"
      style="width: 235px; position: relative;"
    >
      <div v-if="selected && remove" class="selected">
        已选中
      </div>
      <el-card class="card" :body-style="{ padding: '0px' }">
        <div v-if="remove" @click="handleClose(index)" class="close el-icon-close"></div>
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
        />
        <div style="padding: 14px;">
          <span>{{ name }}</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DishCard',
  props: {
    dataSource: {
      type: Array,
    },
    remove: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose(index) {
      this.dataSource.splice(index, 1);
      this.$parent.storage();
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .selected {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);
    text-align: center;
    vertical-align: center;
  }
  .card {
    position: relative;
    .close {
      position: absolute;
      cursor: pointer;
      color: black;
      font-size: 20px;
      top: 5px;
      right: 10px;
    }
  }
}
</style>
