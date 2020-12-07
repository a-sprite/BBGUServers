<template>
	<!-- 全局 bgein -->
	<div id='warp' class="about">
		<!-- <myNavigation current="home" ref='nav'></myNavigation> -->
		<!-- 全局栅格 begin -->
		<a-row type="flex" justify="center" style='margin-top: 20px;'>
			<a-col :span='16'>
				<!-- 全局顶部 begin -->
				<div style="max-height: 200px;">
					<!-- 轮播图 begin -->
					<a-col :span="18">
						<a-carousel autoplay class='border-shadow' style='margin-right: 10px;margin-left: 10px;background: #FFFFFF;border-radius: 10px;' ref="carousel" effect="fade" :after-change='onChange'>
							<div class="slick-slide" v-for="(list,index) in carouselList" :key='index' :style="{background:`rgb(${bgColor.toString()})`}">
								<div class="flex justify-center">
									<img :id="'lbImg'+index" style="height: 200px;" :src="list.url" />
								</div>
							</div>
						</a-carousel>
						<a-icon class="custom-slick-arrow" style='left: 20px;' @click="prevArrow" type="left-circle" v-if='carouselList.length>1' />
						<a-icon class="custom-slick-arrow" style='right: 20px;' @click='nextArrow' type="right-circle" v-if='carouselList.length>1' />
					</a-col>
					<!-- 轮播图 end -->
					<!-- 热门榜单 begin -->
					<a-col :span="6">
						<div class="hot border-shadow">
							<div class="hot-title flex justify-center align-center flex-nowrap">
								<div class="line"></div><a>热门榜</a><div class="line"></div>
								<!-- <icon-font style='font-size: 36px;' type="icon-remenbangdan" /> -->
							</div>
							<div class="hot-content">
								<div class="hot-list flex justify-between" v-for="(list,index) in hotList" :key='index'>
									<a class="hot-list-a-title">{{index+1}}.{{list.title}}</a><a class="hot-list-a-author">{{list.author}}</a>
								</div>
							</div>
						</div>
					</a-col>
					<!-- 热门榜单 end -->
				</div>
				<!-- 全局顶部 end -->
				<!-- 左侧内容 begin -->
				<a-col :span="18" style='text-align: left;'>
					<a-tabs default-active-key="1" style='margin-right: 10px;margin-left: 10px;'>
						<a-tab-pane key="1" tab="热门">
							<!-- 发布内容 begin -->
							<div style="margin-bottom: 20px;background-color: #FFFFFF;border:2px solid #EEEEEE;border-top-left-radius: 5px;border-top-right-radius: 5px;" v-if="$store.state.isLogin==true">
								<a-textarea placeholder="你想分享一些什么好呢" :value='tips' allow-clear />
								<a-icon style='font-size: 30px;' type='camera'/>
								<a-button type="primary" style='float: right;'>
								发送
								</a-button>
							</div>
							<!-- 发布内容 end -->
							<!-- 帖子 begin -->
							<div class="card border-shadow" v-for="(list,index) in messageList" :key='index'>
								<div class="card-header flex flex-nowrap justify-between">
									<div class="flex flex-nowrap">
										<span>
											<a-badge><a-avatar shape="square" icon="user"/></a-badge>
										</span>
										<div style="margin-left: 20px;">
											<div class="card-header-username">
												{{list.username}}
											</div>
											<div class="card-header-time">
												{{list.time}}
											</div>
										</div>
									</div>
									<!-- <div style="display: flex;align-items: center;"> -->
										<a-dropdown class='flex align-center'>
											<a class="ant-dropdown-link" @click="e => e.preventDefault()"><a-icon style='font-size: 25px;' type="ellipsis" /></a>
											<a-menu slot="overlay">
												<a-menu-item>
													<a href="javascript:;"><a-icon type="star" />收藏</a>
												</a-menu-item>
												<a-menu-item>
													<a href="javascript:;"><a-icon type="warning" />举报</a>
												</a-menu-item>
											</a-menu>
										</a-dropdown>
									<!-- </div> -->
								</div>
								<div class="card-content">
									<div class="card-content-message">
										{{list.message}}
									</div>
									<div style="margin-top: 10px;text-align: left;">
										<img class="card-content-img" @click="preview(list.img)" :src="list.img" />
									</div>
								</div>
								<div class="card-topic flex flex-nowrap">
									<div class='card-topic-icon flex align-center justify-center'>
										<a-icon style='color: #9E9E9E;font-size: 14px;' type="tag" />
									</div>
									<div class="card-topic-title flex align-center">
										{{list.topic}}
									</div>
									<div class='card-topic-icon flex align-center justify-center' style="background-color: #EEEEEE;">
										<a-icon style='color: #9E9E9E;font-size: 12px;' type="caret-right" />
									</div>
								</div>
								<div class="card-footer flex justify-around">
									<a-button type="link" icon='share-alt' size='large'></a-button>
									<a-button type="link"  icon='message' size='large' @click='comment(index)'>{{list.comment}}</a-button>
									<a-button type="link" size='large' @click='heart(index)'><a v-if="list.heart%2==0"><a-icon type="heart" /></a><a v-else><a-icon style='color: #E91E63;' type="heart" theme="filled"/></a>{{list.heart}}</a-button>
								</div>
							</div>
							<!-- 帖子 end -->
						</a-tab-pane>
						<a-tab-pane key="2" tab="最新" force-render>
							暂未更新
						</a-tab-pane>
					</a-tabs>
				</a-col>
				<!-- 左内容 end -->
				<!-- 右侧内容 begin -->
				<a-col :span="6" style='margin-top: 45px;margin-bottom: 20px;'>
					<div style="margin-bottom: 20px;background-color: #FFFFFF" >
						<!-- 个人信息卡 begin -->
						<div class="infor-card" v-if="$store.state.isLogin">
							<div class="infor-card-header">
								<a-avatar size="large" icon="user" />
								<p style="font-size: 20px;">username</p>
								<div class="flex justify-between" style="padding: 0px 20px 0px 20px;">
									<!-- 后面再添加点击效果 -->
									<div>
										<a-icon style='font-size: 28px;' type="camera" />
										<p>123</p>
									</div>
									<div>
										<a-icon style='font-size: 28px;' type="message" />
										<p>123</p>
									</div>
									<div>
										<a-icon style='font-size: 28px;' type="heart" />
										<p>123</p>
									</div>
								</div>
							</div>
						</div>
						<!-- 个人信息卡 end -->
						<!-- 侧边导航栏 begin -->
						<a-menu style='text-align: left;padding-top: 20px;padding-bottom: 20px;' mode="inline">
							<a-menu-item key="1">
								<a-icon style='font-size: 20px;' type="tag" />
								话题
							</a-menu-item>
							<a-menu-item key="5">
								<a-icon style='font-size: 20px;' type="bell" />
								通知
							</a-menu-item>
							<a-menu-item key="2">
								<icon-font style='font-size: 20px;' type="icon-daoyu" />
								邻岛
							</a-menu-item>
							<a-menu-item key="3">
								<a-icon  style='font-size: 20px;' type="user" />
								个人主页
							</a-menu-item>
							<a-menu-item key="4">
								<a-icon  style='font-size: 20px;' type="setting" />
								个人设置
							</a-menu-item>
						</a-menu>
						<!-- 侧边导航栏 end -->
					</div>
					<!-- ONE begin -->
					<div class="one border-shadow" >
						<div class="one-header flex flex-nowrap align-center justify-center">
							<div class="line2"></div><a>ONE</a><div class="line2"></div>
						</div>
						<div class="one-content flex flex-nowrap">
							<a style="color: #000000;">
								<div class="one-content-date border-shadow">
									<p style="font-size: 45px;line-height: 45px;text-align: center;height: 45px;margin-bottom: 0px;">4</p>
									<p style="font-size: 14px;display: inline;">Dec</p>
									<p style="font-size: 14px;display: inline;"> 2020</p>
								</div>
								{{one.content}}
							</a>
						</div>
						<img id='oneimg' style="width: 100%; padding: 10px;" :src="one.img" />
					</div>
					<!-- ONE end -->
				</a-col>
				<!-- 右侧内容 end -->
			</a-col>
		</a-row>
		<!-- 全局栅格 end -->
		<!-- 加载数据 begin-->
		<div class="loding-data border-shadow flex align-center justify-center" v-if="reachBottom==true" @click="getData">
			点击加载更多
			<a-icon style='margin-left: 10px;' type="sync" spin />
		</div>
		<!-- 加载数据 end-->
		<!-- 底部 begin -->
		<a-layout-footer style="text-align: center">
		BBGU Islands ©2020 Created by 一瓶雪碧
		</a-layout-footer>
		<!-- 底部 end -->
		<!-- 图片预览 begin -->
		<a-modal v-model="modalImg" :closable='true' :centered='true' :footer="null">
			<img style="width: auto;height: auto;max-width: 100%;max-height: 100%;" :src="imgPreview" />
		</a-modal>
		<!-- 图片预览 end -->
	</div>
	<!-- 全局 end -->
</template>
<script>
	import ColorThief from "colorthief"
	import { Icon } from 'ant-design-vue';
	
	//项目图标库有更新需要更新url
	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2247340_qbzy7zjrwr.js',
	});
	// const axios = require('axios');
	export default {
		components: {
			IconFont,
		},
		data() {
			return {
				tips:'',
				imgPreview:'',
				modalImg:false,
				bgColor:'',
				reachBottom:false,
				hotList:[
					{
						title:'没有人是一座孤岛',
						author:'一瓶雪碧'
					},
					{
						title:'新加坡新生男婴自带新冠抗体',
						author:'一瓶雪碧'
					},
					{
						title:'女副县长策马为当地旅游代言',
						author:'一瓶雪碧'
					},
					{
						title:'女副县长策马为当地旅游代言',
						author:'一瓶雪碧'
					},
					{
						title:'女副县长策马为当地旅游代言',
						author:'一瓶雪碧'
					}
				],
				messageList:[
					{
						username:'一瓶雪碧',
						time:'1秒前',
						message:'不加思考的热情就像是一条随波逐流的船。',
						img:'http://image.wufazhuce.com/FrybjNWwUPImm-4arwDwJTJyWz-c',
						comment:10,
						heart:199,
						topic:'随便聊聊'
					},
					{
						username:'一瓶雪碧',
						time:'1秒前',
						message:'不加思考的热情就像是一条随波逐流的船。',
						img:'http://image.wufazhuce.com/FrybjNWwUPImm-4arwDwJTJyWz-c',
						comment:10,
						heart:199,
						topic:'随便说说阿巴阿巴'
					},
					{
						username:'一瓶雪碧',
						time:'1秒前',
						message:'不加思考的热情就像是一条随波逐流的船。',
						img:'http://image.wufazhuce.com/FrybjNWwUPImm-4arwDwJTJyWz-c',
						comment:10,
						heart:199,
						topic:'随便想想'
					},
					{
						username:'一瓶雪碧',
						time:'1秒前',
						message:'不加思考的热情就像是一条随波逐流的船。',
						img:'https://www.luowenqiu.top/imgs/lb1.jpg',
						comment:10,
						heart:199,
						topic:'随便写写'
					}
				],
				one:{
					content:'我们仍有英雄之心的勇气，虽然被时间和命运耗损，但意志坚强，要斗争、要探索、要寻找，绝不屈服。',
					img:'http://image.wufazhuce.com/FrybjNWwUPImm-4arwDwJTJyWz-c',
				},
				carouselList:[
					{
						// url:'http://image.wufazhuce.com/FrybjNWwUPImm-4arwDwJTJyWz-c'
					},
					{
						// url:'http://image.wufazhuce.com/FrybjNWwUPImm-4arwDwJTJyWz-c'
					},
					{
						// url:'http://image.wufazhuce.com/FrybjNWwUPImm-4arwDwJTJyWz-c'
					}
				]
			};
		},
		mounted() {
			//监听滚到底部，执行事件
			var timer = 0;
			window.addEventListener('scroll', () => {
				if (!timer) {
					timer = setTimeout(() => {
						this.scrollBottom()
						timer = 0
					}, 250)
				}
			})
		},
		methods: {
			prevArrow(){
				this.$refs.carousel.prev();
			},
			nextArrow(){
				this.$refs.carousel.next();
			},
			comment(index){
				this.messageList[index].comment+=1
			},
			heart(index){
				this.messageList[index].heart+=1
			},
			scrollBottom() {
				// 判断滚动条滚到底部
				const el = document.getElementById("warp");
				const windowHeight = window.screen.height;
				const scrollTop =document.documentElement.scrollTop || document.body.scrollTop;
				const contentHeight = el.clientHeight;
				const toBottom = contentHeight - windowHeight - scrollTop;
				if (toBottom < 10) {
					this.reachBottom=true
				}else{
					this.reachBottom=false
				}
			},
			preview(imgUrl){
				this.imgPreview=imgUrl
				this.modalImg=true
			},
			getData(){
				// axios({
				// 	method:'post',
				// 	url:'http://www.luowenqiu.top/ceshi.php'
				// 	}).then(function(res){
				// 		// console.log(res.data);
				// 		this.messageList=this.messageList.concat(res.data)
				// 	}).catch(res => {
				// 		console.log('请求失败：'+res.status+','+res.statusText);
				// });
				//合并数组
				this.messageList=this.messageList.concat(this.messageList)
			},
			onChange(number){
				//取图主色调  这个方法太慢了  后续尝试一下后端取主色调再发到前端 只需取一次，不用改变一次取一次(跨域无法获取)
				// let targetImg = document.querySelector('#lbImg'+number);
				// let colorthief = new ColorThief();
				// this.bgColor=colorthief.getPalette(targetImg,2)[0]
				// console.log(this.bgColor)
			}
		}
	};
</script>
<style>	
	/* For 轮播图 */
	.slick-slide {
		height: 192px;
		line-height: 190px;
	/* 	background-color: #1F7199; */
		/* color: #FFFFFF; */
		overflow: hidden;
		border-radius:10px;
	}
	.custom-slick-arrow {
		width: 30px;
		height: 30px;
		font-size: 30px;
		color: #fff;
		position:absolute;
		top: 85px;
		z-index:99;
		opacity: 0.5;
	}
	.custom-slick-arrow:before {
		display: none;
	}
	.custom-slick-arrow:hover {
		opacity: 0.9;
	}
	/* 热门榜单 */
	.hot{
		width: 100%;
		height: 200px;
/* 		margin: 0px 10px 10px 0px; */
		background-color: #FFFFFF;
		border:2px solid #F5F5F5;
		border-radius:10px;
	}
	.hot-title{
		color:  #1890ff;
		font-size: 16px;
		margin-top: 5px;
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.line{
		background-color: #FFC400;
		width: 30px;
		height: 3px;
		margin-left: 10px;
		margin-right: 10px;
	}
	.line2{
		background-color: #9e9e9e;
		width: 30px;
		height: 3px;
		margin-left: 10px;
		margin-right: 10px;
	}
	.hot-content{
		width: 100%;
		height: 200px;
	}
	.hot-list{
		width: 100%;
		padding: 5px 10px 5px 10px;
	}
	.hot-list-a-title{
		width: 180px;
		font-size: 14px;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.hot-list-a-author{
		width: 60px;
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	/* 帖子 */
	.card{
		background-color: #FFFFFF;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		margin-bottom: 20px;
	}
	.card-header{
		padding: 20px 20px 10px 20px;
	}
	.card-header-username{
		font-size: 12px;
		color: black;
	}
	.card-header-time{
		text-align: left;
		font-size: 12px;
		color: #9e9e9e;
	}
	.card-content{
		width: 100%;
		padding: 0px 20px 10px 20px;
	}
	.card-content-message{
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.card-content-img{
		width: 100px;
	}
	.card-footer{
		/* border-top: 2px solid #EEEEEE; */
		padding: 0px 10px 0px 10px ;
	}
	.card-topic{
		background-color: #EEEEEE;
		color: #FFFFFF;
		max-width: 110px;
		height: 20px;
		border-radius: 5px;
		margin: 5px 20px 5px 20px;
	}
	.card-topic-title{
		width: 80px;
		padding: 0px 5px 0px 5px;
		font-size: 10px;
		color: #9E9E9E;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.card-topic-icon{
		background-color: #E0E0E0;
		border-radius: 5px;
		height: 20px;
		width: 20px;
	}
	
	/* ONE */
	.one{
		background-color: #FFFFFF;
		border-radius: 10px;
	}
	.one-header{
		padding-top: 10px;
		font-size: 18px;
	}
	.one-content{
		text-align: left;
		padding: 5px 10px 10px 10px;
	}
	.one-content-date{
		display: inline;
		float: left;
		min-height:40px;
		margin-right: 10px;
		padding: 5px;
	}
	
	/* 首页个人资料卡 */
	.infor-card{
		border-radius: 10px;
		padding: 20px;
		background-color: #FFFFFF;
	}
	.infor-card-header p{
		margin: 10px 0px 10px 0px;
	}
	
	/* 底部加载数据 */
	.loding-data{
		height: 50px;
		background-color: #FFFFFF;
	}
</style>
