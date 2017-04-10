<template>
<div>

  <xm-header title="收入"  :sty="stobj">
    <mt-button slot="right" @click="login" v-show='!isLogon'>LOGIN</mt-button>
    <mt-button slot="right" @click="logout"  v-show='isLogon'>LOGOUT</mt-button>
  </xm-header>

  <xm-row class="tAc">
    <router-link to="/acct/income" slot="col" class="home-row-item">
      <span>Income</span>
    </router-link>
    <router-link to="/acct/income" slot="col" class="home-row-item">
      <span>Note</span>
    </router-link>
    <router-link to="/acct/income" slot="col" class="home-row-item">
      <span>J</span>
    </router-link>
  </xm-row>
</div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data () {
      return {
      }
    },
    methods: {
      login: function () {
        this.$router.push({'path': '/user/login'})
      },
      logout: function () {
        this._logout()
      },
      ...mapActions({
        _logout: 'logout'
      })
    },
    computed: {
      ...mapGetters([
        'isLogon'
      ])
    },
    mounted () {
    }
  }
</script>
<style>
  .home-row{
     background: #f5f5f9;
  }
  .home-row-item{
    height: 70px;
    line-height: 70px;
    outline: none;
    background: #fff;
    text-decoration: none;
    color: #000;
    box-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.3);
  }
</style>
