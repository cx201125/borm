import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储用户信息
    userId:localStorage.getItem("userId")?localStorage.getItem("userId"):0
  },
  mutations: {

    // 修改token，并将token存入localStorage
    changeLogin (state, payload) {

      //把用户信息存储到vuex中
      state.userId = payload.user.adminId;
      console.log(payload.user.adminId);
      //把用户信息存储到本地的localStorage中
      localStorage.setItem("userId",payload.user.adminId)
      //把token设置到本地存储库中
      localStorage.setItem('token', payload.token);
    }
  },
  actions: {
  },
  modules: {
  }
})
