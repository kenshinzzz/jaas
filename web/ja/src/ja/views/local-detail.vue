<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 本地</el-breadcrumb-item>
                <el-breadcrumb-item>本地管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <hr style="width: 100%"/>

        <div class="container">
        <h3>{{video.title}}</h3>
        <div class="row movie">
            <div class="col-md-9 screencap">
                <a class="bigImage" href="" >
                    <img src=""></a>
            </div>
            <div class="col-md-3 info">
                <p><span class="header">识别码:</span> <span style="color:#CC0000;">{{video.code}}</span></p>
                <p><span class="header">发行时间:</span> {{video.publishDate}}</p>
                <p><span class="header">长度:</span> {{video.length}}分钟</p>
                <p><span class="header">导演:</span> <a :href="video.urlDirector">{{video.director}}</a></p>
                <p class="header">制作商: </p>
                <p><a :href="video.urlMaker">{{video.maker}}</a></p>
                <p class="header">发行商: </p>
                <p><a :href="video.urlLabel">{{video.label}}</a></p>
                <p class="header">系列:</p>
                <p><a :href="video.urlSrial">{{video.serial}}</a></p>
                <p class="header">类别:</p>
                <p>
                    <span class="genre" v-for="item in video.genres"><a href="item.url">{{item.name}}</a></span>
                </p>
                <p><span class="header">评分:</span> {{video.rate}} <el-rate v-model="video.rate" :max="10" :allow-half="true"></el-rate></p>
            </div>
        </div>

        <h4>演员</h4>
        <div id="avatar-waterfall">
            <a class="avatar-box" v-for="item in video.casts" :href="item.url">
                <div class="photo-frame">
                    <img :src="item.img">
                </div>
                <span>{{item.name}}</span>
            </a>
        </div>

        <div class="clearfix"></div>
        <h4>样品图像</h4>
        <div id="sample-waterfall">
            <a class="sample-box" v-for="item in video.images" :href="item.bigImg" >
                <div class="photo-frame">
                    <img :src="item.img">
                </div>
            </a>
        </div>
        <div class="clearfix"></div>

    </div>
        <vue-images :imgs="images"
                    :modalclose="modalclose"
                    :keyinput="keyinput"
                    :mousescroll="mousescroll"
                    :showclosebutton="showclosebutton"
                    :showcaption="showcaption"
                    :imagecountseparator="imagecountseparator"
                    :showimagecount="showimagecount"
                    :showthumbnails="showthumbnails">
        </vue-images>
    </div>
</template>
<style>
@import "../../assets/css/main.css";
@import "../../assets/css/detail.css";
</style>
<script>
    // import {httpPost} from 'common/utils/http-util'
    import axios from 'axios'
    import * as Constants from 'common/const/constants'
    import vueImages from 'vue-images'
    export default{
      components: {
        vueImages: vueImages
      },
      data () {
        return {
          video: {
            code: 'GVG-030',
            publishDate: '2017-05-31',
            length: '123',
            title: 'title',
            director: 'director',
            urlDirector: '#',
            maker: 'maker',
            urlMaker: '#',
            label: 'GLORY QUEST',
            urlLabel: '#',
            serial: 'serial',
            urlSerial: '#',
            genres: [
              {name: 'single', url: '#'}, {name: 'single2', url: '#'}
            ],
            rate: 9,
            casts: [
              {name: 'cast1', img: '', url: '#'}, {name: 'cast2', img: '', url: '#'}
            ],
            images: [
              {img: '', bigImg: '/static/img/default.png'},
              {img: '', bigImg: '/static/img/default.png'},
              {img: '', bigImg: '/static/img/default.png'},
              {img: '', bigImg: '/static/img/default.png'},
              {img: '', bigImg: '/static/img/default.png'},
              {img: '', bigImg: '/static/img/default.png'},
              {img: '', bigImg: '/static/img/default.png'},
              {img: '', bigImg: '/static/img/default.png'}
            ]
          },
          images: [
            {
              imageUrl: 'https://images.unsplash.com/photo-1454991727061-be514eae86f7?dpr=2&auto=format&w=1024',
              caption: '<a href="#">Photo by 1</a>'
            },
            {
              imageUrl: 'https://images.unsplash.com/photo-1455717974081-0436a066bb96?dpr=2&auto=format&w=1024',
              caption: 'Photo by 2'
            },
            {
              imageUrl: 'https://images.unsplash.com/photo-1460899960812-f6ee1ecaf117?dpr=2&auto=format&w=1024',
              caption: 'Photo by 3'
            },
            {
              imageUrl: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?dpr=2&auto=format&w=1024',
              caption: 'Photo by 4'
            },
            {
              imageUrl: 'https://images.unsplash.com/photo-1452274381522-521513015433?dpr=2&auto=format&w=1024',
              caption: 'Photo by 5'
            },
            {
              imageUrl: 'https://images.unsplash.com/photo-1471145653077-54c6f0aae511?dpr=2&auto=format&w=1024',
              caption: 'Photo by 6'
            },
            {
              imageUrl: 'https://images.unsplash.com/photo-1471005197911-88e9d4a7834d?dpr=2&auto=format&w=1024',
              caption: 'Photo by 7'
            },
            {
              imageUrl: 'https://images.unsplash.com/photo-1470583190240-bd6bbde8a569?dpr=2&auto=format&w=1024',
              caption: 'Photo by 8'
            },
            {
              imageUrl: 'https://images.unsplash.com/photo-1470688090067-6d429c0b2600?dpr=2&auto=format&w=1024',
              caption: 'Photo by 9'
            },
            {
              imageUrl: 'https://images.unsplash.com/photo-1470742292565-de43c4b02b57?dpr=2&auto=format&w=1024',
              caption: 'Photo by 10'
            }
          ],
          modalclose: true,
          keyinput: true,
          mousescroll: true,
          showclosebutton: true,
          showcaption: true,
          imagecountseparator: 'of',
          showimagecount: true,
          showthumbnails: true
        }
      },
      created () {
        this.getDetail()
      },
      methods: {
        getDetail: function () {
          let param = {
            'insType': 'travel',
            'pageNo': this.currentPage
          }
          httpPost(Constants.SYSTEM.JAS, 'localDetail.json', param).then((data) => {
            this.video = data.video
          }, (data) => {
            this.$message({
              showClose: true,
              message: data,
              type: 'error'
            })
          })
        },
      }
    }
</script>
