<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 本地</el-breadcrumb-item>
                <el-breadcrumb-item>本地管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <hr style="width: 100%"/>
        <div class="col-md-12" style="padding: 0px">


            <div id="content">
                <!-- ********* Start of Content *********  -->
                <div id="rightcolumn">
                    <div id="video_title"><h3 class="post-title text"><a href="#" rel='bookmark'>code title</a></h3>
                    </div> <!-- end of video_title -->
                    <div class="post-body">
                        <table id="video_jacket_info">
                            <tr>
                                <td style="vertical-align: top;">
                                    <div id="video_jacket">
                                        <img id="video_jacket_img" src="/static/img/default.png" width="600"
                                             height="403" border="0"/></div> <!-- end of video_jacket -->
                                </td>
                                <td style="vertical-align: top;">
                                    <div id="video_info">
                                        <div id="video_id" class="item">
                                            <table>
                                                <tr>
                                                    <td class="header">识别码:</td>
                                                    <td class="text">code</td>
                                                    <td class="icon"></td>
                                                </tr>
                                            </table>
                                        </div> <!-- end of video_id -->
                                        <div id="video_date" class="item">
                                            <table>
                                                <tr>
                                                    <td class="header">发行日期:</td>
                                                    <td class="text">2016-04-01</td>
                                                    <td class="icon"></td>
                                                </tr>
                                            </table>
                                        </div> <!-- end of video_date -->
                                        <div id="video_length" class="item">
                                            <table>
                                                <tr>
                                                    <td class="header">长度:</td>
                                                    <td><span class="text">225</span> 分钟</td>
                                                    <td class="icon"></td>
                                                </tr>
                                            </table>
                                        </div> <!-- end of video_length -->
                                        <div id="video_director" class="item">
                                            <table>
                                                <tr>
                                                    <td class="header">导演:</td>
                                                    <td class="text"><span id="director1546" class="director"><a
                                                        href="##vl_director.php?d=kicq"
                                                        rel="tag">director</a> &nbsp;</span></td>
                                                    <td class="icon"></td>
                                                </tr>
                                            </table>
                                        </div> <!-- end of video_director -->
                                        <div id="video_maker" class="item">
                                            <table>
                                                <tr>
                                                    <td class="header">制作商:</td>
                                                    <td class="text"><span id="maker5" class="maker"><a
                                                        href="##vl_maker.php?m=aa" rel="tag">maker</a> &nbsp;</span>
                                                    </td>
                                                    <td class="icon"></td>
                                                </tr>
                                            </table>
                                        </div> <!-- end of video_maker -->
                                        <div id="video_label" class="item">
                                            <table>
                                                <tr>
                                                    <td class="header">发行商:</td>
                                                    <td class="text"><span id="label8720" class="label"><a
                                                        href="##vl_label.php?l=deka" rel="tag">label</a> &nbsp;</span>
                                                    </td>
                                                    <td class="icon"></td>
                                                </tr>
                                            </table>
                                        </div> <!-- end of video_label -->
                                        <div id="video_review" class="item">
                                            <table>
                                                <tr>
                                                    <td class="header">使用者评价:</td>
                                                    <td class="text">
                                                        <input class="star {split:2} required" type="radio"
                                                               name="reviewscore" value="1"/>
                                                        <input class="star {split:2}" type="radio" name="reviewscore"
                                                               value="2"/>
                                                        <input class="star {split:2}" type="radio" name="reviewscore"
                                                               value="3"/>
                                                        <input class="star {split:2}" type="radio" name="reviewscore"
                                                               value="4"/>
                                                        <input class="star {split:2}" type="radio" name="reviewscore"
                                                               value="5"/>
                                                        <input class="star {split:2}" type="radio" name="reviewscore"
                                                               value="6"/>
                                                        <input class="star {split:2}" type="radio" name="reviewscore"
                                                               value="7"/>
                                                        <input class="star {split:2}" type="radio" name="reviewscore"
                                                               value="8"/>
                                                        <input class="star {split:2}" type="radio" name="reviewscore"
                                                               value="9" checked="checked"/>
                                                        <input class="star {split:2}" type="radio" name="reviewscore"
                                                               value="10"/>
                                                        &nbsp;<span class="score">(9.40)</span>
                                                    </td>
                                                    <td class="icon"><img id="video_icn_review_edit" class="icn_edit"
                                                                          title="编辑"></td>
                                                    <!-- src="../img/icn-edit.gif"-->
                                                </tr>
                                            </table>
                                        </div> <!-- end of video_review -->
                                        <div id="\" class="item">
                                            <table>
                                                <tr>
                                                    <td class="header">类别:</td>
                                                    <td class="text">
                                                        <span id="genre2" class="genre"><a href="##vl_genre.php?g=a4"
                                                                                           rel="category tag">genre</a></span>
                                                        <span id="genre18" class="genre"><a href="##vl_genre.php?g=lq"
                                                                                            rel="category tag">genre</a></span>
                                                    </td>
                                                    <td class="icon"></td>
                                                </tr>
                                            </table>
                                        </div> <!-- end of video_genres -->
                                        <div id="video_cast" class="item">
                                            <table>
                                                <tr>
                                                    <td class="header">演员:</td>
                                                    <td class="text">
                                                    <span id="cast28841" class="cast">
                                                        <span class="star"><a href="##vl_star.php?s=ayote" rel="tag">cast</a></span>
                                                    </span>
                                                    </td>
                                                    <td class="icon"></td>
                                                </tr>
                                            </table>
                                        </div> <!-- end of video_cast -->
                                    </div> <!-- end of video_info -->
                                </td>
                            </tr>
                        </table><!-- end of video_jacket_info -->
                    </div><!-- end of post-body -->

                    <div class="socialmedia">
<span id="middletextbanner" style="position: absolute; bottom:0px; left:480px; font: 12px normal arial;">
</span>
                        <hr class="grey"/>

                        <div id="videoimages">
                            <table>
                                <tr>
                                    <td><a class="prev">&nbsp;</a></td>
                                    <td>
                                        <div id="video_images"></div>
                                    </td>
                                    <td><a class="next">&nbsp;</a></td>
                                </tr>
                            </table>
                            <hr class="grey"/>
                        </div> <!-- end of videoimages -->

                        <div id="video_icn_comment_edit"><input type="button" class="largebutton" value="加入文章"/></div>
                        <br/>

                    </div> <!--  end of right column -->
                </div>
            </div>
        </div>

    </div>
</template>
<style>
@import "../../assets/css/main.css";
@import "../../assets/css/videocensored.css";
</style>
<script>
    // import {httpPost} from 'common/utils/http-util'
    import axios from 'axios'
    import * as Constants from 'common/const/constants'

    export default{
      data () {
        return {
          currentPage: 1,
          pageSize: 10,
          totalRecord: 1,
          productList: [
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
        this.getProductList()
      },
      methods: {
        getProductList: function () {
          let param = {
            'insType': 'travel',
            'pageNo': this.currentPage
          }
          axios.get('/static/data/ITSI203001.json').then( (res) => {
          // httpPost(Constants.SYSTEM.IFSP, 'ITSI203001', param).then((data) => {
            let data = res.data
            let totalRecord = Number(data.totalRecord)
            let pageSize = Number(data.pageSize)
            this.totalRecord = totalRecord
            this.pageSize = pageSize
            this.productList = data.productList
            this.responseMessage = data.header.responseMessage
          }, (data) => {
            this.$message({
              showClose: true,
              message: data,
              type: 'error'
            })
          })
        },
        imageSrc (productId) {
          return 'static/image/product/' + productId + '/productLogo.png'
        },
        handleSizeChange (val) {
          console.log(`每页 ${val} 条`)
        },
        /** 翻页加载 */
        handleCurrentChange (val) {
          this.currentPage = val
          this.getProductList()
          console.log(`当前页: ${val}`)
        }
      }
    }
    // ../js/main.css
    // ../js/videocensored.css

</script>
