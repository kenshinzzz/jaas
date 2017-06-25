<template>
  <div>
      <div class="crumbs">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-menu"></i> 本地</el-breadcrumb-item>
              <el-breadcrumb-item>本地管理</el-breadcrumb-item>
          </el-breadcrumb>
      </div>

    <hr style="width: 100%" />
      <el-form :inline="true" >
          <el-form-item label="关键字">
              <el-input class="vip-search-input" v-model="key"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
      </el-form>

    <div class="col-md-12" style="padding: 0px">
      <div class="col-md-12">
        <div v-for="item in videoList" class="insur-containe col-md-4" :key="item.productId" >
          <div class="item">
            <div class="product-header">
              <img class="product-header-image" :src="item.cover" onerror="this.src='/static/img/default.png'" />
              <div class="product-header-title"></div>
              <div class="product-header-desc">{{item.title}}</div>
            </div>
            <div class="product-content">
              <router-link :to="{ path: '/local-detail', query: {id: item.id} }">
                <el-button type="primary" size="large" class="product-content-btn">去看看</el-button>
              </router-link>
              <div class="product-content-price">
                <p>
                  <span class="product-content-price-num">{{item.code}}</span>
                </p>
                <p>
                  <span style="color: #20A0FF">发行：{{item.publishDate}}</span>
                </p>
              </div>
            </div>
            <div class="clear" />
          </div>
        </div>
      </div>
    </div>
    <div class="block col-md-12" style="text-align:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalRecord">
      </el-pagination>
      <div class="clear" />
    </div>
  </div>
</template>

<script>
    import {httpPost} from 'common/utils/http-util'
    import axios from 'axios'
    import * as Constants from 'common/const/constants'

    export default{
      data () {
        return {
          key: '',
          currentPage: 1,
          pageSize: 10,
          totalRecord: 1,
          videoList: [
            {
              productId: '',
              productName: '',
              productDesc: '',
              minPrice: '',
              quantity: ''
            }
          ]
        }
      },
      created () {
        this.query()
      },
      methods: {
        query: function () {
          console.log('query')
          let param = {
            'insType': 'travel',
            'pageNo': this.currentPage
          }
          // httpPost('localList.json').then( (res) => {
          httpPost(Constants.SYSTEM.JAS, 'localList.json', param).then((data) => {
            // let data = res.data
            let totalRecord = Number(data.totalRecord)
            let pageSize = Number(data.pageSize)
            this.totalRecord = totalRecord
            this.pageSize = pageSize
            this.videoList = data.productList
            this.responseMessage = data.header.responseMessage
          }, (data) => {
            this.$message({
              showClose: true,
              message: data,
              type: 'error'
            })
          })
        },
        handleSizeChange (val) {
          console.log(`每页 ${val} 条`)
        },
        /** 翻页加载 */
        handleCurrentChange (val) {
          this.currentPage = val
          this.query()
          console.log(`当前页: ${val}`)
        }
      }
    }
</script>

<style scoped>
  .clear {
    clear: both;
  }
  .item {
    margin: 10px 10px 10px 10px;
    border: 1px solid #b8b8b8;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
  }
  .product-header {
    position: relative;
  }
  .product-header-image {
    padding: 10px;
    width: 100%;
  }
  .product-header-title {
    position: absolute;
    width: 100%;
    overflow: auto;
    margin: auto;
    top: 20px;
    left: 20px;
    font-size: 26px;
    font-family: "Microsoft Yahei";
  }
  .product-header-desc {
    margin-left: 10px;
    margin-right: 10px;
    height: 40px;ol
    font-size: 14px;
    font-family: "Microsoft Yahei";
  }
  .product-content {
    border-top: 1px solid #d2d2d2;
    margin: 10px;
  }
  .product-content-price {
    float: right;
    text-align: right;
    font-family: "Microsoft Yahei";
  }
  .product-content-price-num {
    font-size: 36px;
    color: #f63;
    font-family: arial;
  }
  .product-content-btn {
    margin-top: 25px;
    width: 40%;
  }
  .box-area {
    padding: 10px 10px 10px 10px;
    background-color: #d3dce6;
  }
  .box-header {
    font-size: 20px;
  }
  .box-item {
    border-top: 1px solid #b8b8b8;
    margin-top: 5px;
    padding-top: 10px;
  }
  .paper-plane {
    width: 100%;
    padding: 25px;
  }

</style>
