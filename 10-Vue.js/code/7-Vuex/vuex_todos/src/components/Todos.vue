<template>
  <div class="container">
    <a-row :gutter="['10', '24']">
      <a-col :span="7">
        <a-input
          class="my_ipt"
          :value="inputValue"
          @change="inputChange"
        ></a-input>
      </a-col>
      <a-col :span="2">
        <a-button type="primary" @click="addTodo">添加事务</a-button>
      </a-col>
    </a-row>
    <a-row :gutter="['10', '24']">
      <a-col :span="7">
        <a-list :data-source="dymaicData" bordered>
          <a-list-item slot="renderItem" slot-scope="item">
            <a-checkbox
              :checked="item.done"
              @change="changeTodoStatus(item.id)"
            >
            </a-checkbox>
            &nbsp;{{ item.info }}
            <a slot="actions" @click="removeTodo(item.id)">删除</a>
          </a-list-item>
          <div slot="footer" class="todosFooter">
            <span>{{ unDoneLength }} 条剩余</span>
            <a-button-group>
              <a-button
                :type="viewKey === 'all' ? 'primary' : 'default'"
                @click="changeList('all')"
              >
                全部
              </a-button>
              <a-button
                :type="viewKey === 'undone' ? 'primary' : 'default'"
                @click="changeList('undone')"
              >
                未完成
              </a-button>
              <a-button
                :type="viewKey === 'done' ? 'primary' : 'default'"
                @click="changeList('done')"
              >
                已完成
              </a-button>
            </a-button-group>
            <a slot="actions" @click="clear">清除已完成</a>
          </div>
        </a-list>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  methods: {
    inputChange(event) {
      this.$store.commit('inputChange', event.target.value)
    },
    addTodo() {
      if (this.inputValue.trim().length <= 0) {
        // 使用 antd 的提示框提示一下用户错误信息
        return this.$message.warning('文本框内容不可为空')
      }
      // 向列表中新增 item 项
      this.$store.commit('addTodo')
    },
    removeTodo(id) {
      this.$store.commit('removeTodo', id)
      this.$message.success('删除成功')
    },
    changeTodoStatus(id) {
      this.$store.commit('changeTodoStatus', id)
      this.$message.success('修改状态成功')
    },
    // 清除所有已完成
    clear() {
      this.$store.commit('clear')
      this.$message.success('清除成功')
    },
    changeList(key) {
      this.$store.commit('changeViewKey', key)
    }
  },
  computed: {
    ...mapState(['data', 'inputValue', 'viewKey']),
    ...mapGetters(['unDoneLength', 'dymaicData'])
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 10px;
  overflow-x: hidden;
}
.todosFooter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
