/**
* @auther: 一瓶雪碧
* @date: 2020/12/15
* @desciption:  用户页面
*/
<template>
	<!-- 全局 bgein -->
	<div id='warp' class="home" style="min-width: 750px;">
		<!-- <myNavigation current="home" ref='nav'></myNavigation> -->
		<!-- 全局栅格 begin -->
		<a-row type="flex" justify="center" style='margin-top: 20px;margin-bottom: 20px;'>
			<a-col :span='16'>
				<!-- 个人信息头部 begin -->
				<div style="position: relative;">
					<img style="width: 100%;border-radius: 5px;" src="../assets/user_bg.jpg" />
					<div style="position: absolute;left:0; right:0; bottom:2%;margin:auto;text-align: center;max-width: 30%;">
						<a-avatar :src='userList.avatar' :size='64' @click="previewImg(userList.avatar)"/>
						<a class="text-line-one" style="font-size: 18px;color: #FFFFFF;">{{userList.username}}</a>
						<a class="text-line-one" style="font-size: 14px;color: #FFFFFF;">{{userList.introduce}}</a>
						<div style="margin-top: 10px;" v-if="$store.state.user.id!=userList.userId">
							<a-button type="primary" @click.stop="followUser(userList.userId)" v-if="userList.isFollow==true">已关注</a-button>
							<a-button type="primary" @click.stop="followUser(userList.userId)" v-else>关注</a-button>
							<a-button style="margin-left: 20px;">私信</a-button>
						</div>
					</div>
				</div>
				<!-- 个人信息头部 end -->
				<!-- 左侧内容 begin -->
				<a-col :span="5">
					<div class="user-follow-list border-shadow4">
						<div class="user-follow-list-header flex justify-between align-center">
							<h3 style="font-weight: 200;">关注列表({{userList.followNumber}})</h3>
							<h4 style="font-weight: 200;">更多<a-icon type="double-right" /></h4>
						</div>
						<div class="user-follow-list-content">
							<div v-if="followUserList==undefined || followUserList.length<=0">
								还没有关注别人哦
							</div>
							<div class="user-follow-list-content-user flex align-center" v-for="(list,index) in followUserList" @click="toUser(list.userId)" :key="index">
								<div class="user-follow-list-content-user-avatar">
									<a-avatar :src='list.avatar' :size='40'/>
								</div>
								<div class="user-follow-list-content-user-username">
									<a style="color: #000000;font-size: 14px;font-weight: 550;">{{list.username}}</a>
									<a-tooltip class="text-line-one" style="color: #000000;font-size: 10px;font-weight: 300;">
										{{list.introduce}}
										<template slot="title">
											{{list.introduce}}
										</template>
									</a-tooltip>
								</div>
							</div>
						</div>
					</div>
				</a-col>
				<!-- 左侧内容 end -->
				<!-- 中间内容 begin -->
				<a-col :span="14" style='padding: 0px 10px 0px 10px;'>
					<a-tabs default-active-key="1" style="margin: 0px;text-align: center;">
						<a-tab-pane key="1" tab="动态" style="margin: 0px;text-align: left;">
							<!-- 动态 begin -->
							<div class="user-posts border-shadow4" v-for="(list,index) in messageList" :key='index'>
								<div v-if="list.top==1" style="border-bottom: 0.5px solid #E0E0E0;padding:5px 20px 5px 20px">
									图标  置顶
								</div>
								<div class="user-posts-header flex justify-between align-start">
									<div class="flex align-center">
										<a-avatar :src='list.avatar' shape="square" :size="40"/>
										<div style="margin-left: 10px;">
											<div class="user-posts-header-username">
												{{list.username}}
											</div>
											<div class="user-posts-header-time">
												{{list.time}}
											</div>
										</div>
									</div>
									<!-- 动态菜单 begin -->
									<a-dropdown>
										<a class="ant-dropdown-link" @click="e => e.preventDefault()"><a-icon style='font-size: 25px;' type="ellipsis" /></a>
										<a-menu slot="overlay">
											<a-menu-item>
												<a href="javascript:;"><a-icon type="star" />收藏</a>
											</a-menu-item>
											<a-menu-item v-if="$store.getters.isLogin==true&&$store.state.user.id==list.userId">
												<a @click.stop="deleteModal=true"><a-icon type="delete" />删除</a>
											</a-menu-item>
											<a-modal v-model="deleteModal" title="Basic Modal" @ok="deleteMsg(list.id)">
												<p>确认删除当前选中动态吗？</p>
											</a-modal>
											<a-menu-item>
												<a href="javascript:;"><a-icon type="warning" />举报</a>
											</a-menu-item>
										</a-menu>
									</a-dropdown>
									<!-- 动态菜单 end -->
								</div>
								<div class="user-posts-content" style="padding-top: 0px;" @click="toMsg(list.id)">
									<div class="user-posts-content-message" >
										{{list.content}}
									</div>
									<div style="margin-top: 10px;margin-bottom: 10px;text-align: left;width:40%;pointer-events:auto" >
										<img class="user-posts-content-img" v-if="list.pictures.length!=0" v-for="(pictureUrl,index2) in list.pictures" :key="index2" @click.stop="previewImg(pictureUrl)" :src="pictureUrl" @error="imgError(list.pictures,index2)"/>
									</div>
								</div>
								<div class="user-posts-topics">
									<!-- <div class='post-topics-icon flex align-center justify-center'>
										<i class="iconfont icon-yuzhou" style='color: #1088e9;font-size: 14px;'></i>
									</div> -->
									<i class="iconfont icon-yuzhou" style='color: #1088e9;font-size: 14px;'></i>
									<a-tooltip class="user-posts-topics-title">
										{{list.nodeTitle}}
										<template slot="title">
											{{list.nodeTitle}}
										</template>
									</a-tooltip>
									<!-- <div class='user-posts-topics-icon flex align-center justify-center' style="background-color: #EEEEEE;">
										<a-icon style='color: #9E9E9E;font-size: 12px;' type="caret-right" />
									</div> -->
								</div>
								<div class="user-posts-footer flex justify-around">
									<a-button type="link" icon='share-alt' size='large' style="color: #424242;"></a-button>
									<a-button type="link"  icon='message' size='large' style="color: #424242;" @click='comment(list.id)'>{{list.commentNumber}}</a-button>
									<a-button type="link" size='large' @click='like(index,list.id)'><a v-if="list.userLike==true&&$store.getters.isLogin==true"><a-icon style='color: #E91E63;' type="like" theme="filled"/></a><a v-else style='color: #424242;'><a-icon type="like" /></a><a v-if="list.userLike==true&&$store.getters.isLogin==true" style='color: #E91E63;'>{{list.likeNumber}}</a><a v-else style='color: #424242;'>{{list.likeNumber}}</a></a-button>
								</div>
							</div>
							<div v-if="!messageList" style="text-align: center;">
								TA还没有发过动态哦
							</div>
							<!-- 动态 end -->
							<!-- 加载数据 begin-->
							<div class="loding-data flex align-center justify-center" v-if="loading==false&&messageList.length%10==0" @click="getUserMsg" >
								点击加载更多
								<a-icon style='margin-left: 10px;' type="sync" spin />
							</div>
							<div class="loding-data flex align-center justify-center" v-else >
								已经到底了啦~
							</div>
							<!-- 加载数据 end-->
						</a-tab-pane>
						<a-tab-pane key="2" tab="点赞" force-render>
							TA还没有点赞过动态哦
						</a-tab-pane>
						<a-tab-pane key="3" tab="评论" force-render>
							TA还没有发表过评论哦
						</a-tab-pane>
					</a-tabs>
				</a-col>
				<!-- 中间内容 end -->
				<!-- 右侧内容 begin -->
				<a-col :span="5">
					<div class="user-fans-list border-shadow4">
						<div class="user-fans-list-header flex justify-between align-center">
							<h3 style="font-weight: 200;">粉丝列表({{userList.fansNumber}})</h3>
							<h4 style="font-weight: 200;">更多<a-icon type="double-right" /></h4>
						</div>
						<div class="user-fans-list-content">
							<div v-if="fansUserList==undefined || fansUserList.length<=0">
								还没有人关注TA诶
							</div>
							<div class="user-fans-list-content-user flex align-center" v-for="(list,index) in fansUserList" @click="toUser(list.userId)" :key="index">
								<div class="user-fans-list-content-user-avatar">
									<a-avatar :src='list.avatar' :size='40'/>
								</div>
								<div class="user-fans-list-content-user-username">
									<a style="color: #000000;font-size: 14px;font-weight: 550;">{{list.username}}</a>
									<a-tooltip class="text-line-one" style="color: #000000;font-size: 10px;font-weight: 300;">
										{{list.introduce}}
										<template slot="title">
											{{list.introduce}}
										</template>
									</a-tooltip>
								</div>
							</div>
						</div>
					</div>
				</a-col>
				<!-- 右侧内容 end -->
			</a-col>
		</a-row>
		<!-- 全局栅格 end -->
		<!-- 图片预览弹窗 begin -->
		<Modal :isOpen='modalImg' :imgUrl='imgPreview' @changeModal='changeModal' ></Modal>
		<!-- 图片预览弹窗 end -->
	</div>
	<!-- 全局 end -->
</template>
<script>
	import ColorThief from "colorthief"
	import { Icon } from 'ant-design-vue';
	import Modal from '@/components/Modal.vue'
	import { postGetUserMsg,postGetUserInformation,postLike,postDeleteMsg,postFollowUser } from '@/apis/axios'
	import qs from 'qs'
	
	//项目图标库有更新需要更新url
	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2247340_qbzy7zjrwr.js',
	});
	
	export default {
		components: {
			IconFont,
			Modal
		},
		data() {
			return {
				imgPreview:'',//预览图片URL
				modalImg:false,//弹窗预览图
				loading:false,//判断是否加载完全部内容
				page:0,//页数
				messageList:[],
				userList:[],
				followUserList:[],//关注的用户
				fansUserList:[],//粉丝用户
				deleteModal:false//删除确认弹窗
			};
		},
		watch:{
			$route(to,from){//监听地址栏参数变化
			  // console.log(from.path,from.query);//从哪来
			  // console.log(to.path,from.query);//到哪去
			  this.messageList=[]
			  this.page=0
			  this.getUserMsg()
			  this.getUserInformation()
			}
		},
		mounted() {
			this.getUserMsg()
			this.getUserInformation()
		},
		methods: {
			getUserMsg(){
				this.page++
				postGetUserMsg(qs.stringify({
						page:this.page,
						userId:this.$route.query.id,
						myUserId:this.$store.getters.isLogin==true?this.$store.state.user.id:'0'
					})
				)
				.then(res => {
					// 请求成功
					if(res.code=="444"){//动态已加载完
						this.loading=true
					}else{
						this.messageList=this.messageList.concat(res.msg)
					}
					console.log(this.page,res)
				})
				.catch(error => {
					console.log(error)
				})
			},
			getUserInformation(){
				postGetUserInformation(qs.stringify({
						userId:this.$route.query.id,
						myUserId:this.$store.getters.isLogin?this.$store.state.user.id:'0'
					})
				)
				.then(res => {
					// 请求成功
					if(res.status==200){
						this.userList=res.user
						this.followUserList=res.follow
						this.fansUserList=res.fans
						console.log(res)
					}else if(res.status==400){
						this.$message.error(res.message)
						this.$router.back(-1);
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			// 点赞
			like(id){
				if(this.$store.getters.isLogin==false){
					this.$message.warning('还没登录哦，不能点赞！');
				}else{
					postLike(qs.stringify({
							msgId:id,
							userId:this.$store.state.user.id
						})
					)
					.then(res => {
						// 请求成功
						console.log(res);
						if(res.status==200&&res.code==200){
							this.message.likeNumber++;
							this.likeList.userLike=true
						}else if(res.status==200&&res.code==201){
							this.message.likeNumber--;
							this.likeList.userLike=false
						}else if(res.status==400){
							this.$message.error(res.message);
						}
						this.getMsgLikeUser()
					})
					.catch(error => {
						this.$message.error(error)
					})
				}
			},
			deleteMsg(id){
				postDeleteMsg(qs.stringify({
						userId:this.$store.state.user.id,
						msgId:id
					})
				)
				.then(res => {
					if(res.status==200){
						this.$message.success("删除动态成功！")
					}else if(res.status==400){
						this.$message.error("删除动态失败！请稍后再试...")
					}
					// console.log(res)
					this.messageList=[]
					this.page=0
					this.getUserMsg()
				})
				.catch(error => {
					this.$message.error(error)
				})
				this.deleteModal=false
			},
			followUser(userId){
				if(this.$store.getters.isLogin!=true){
					this.$message.warning('还没登录哦，不能点关注哦！');
				}else if(this.$store.getters.isLogin==true&&this.$store.state.user.id==userId){
					this.$message.warning('不能关注自己哦');
				}else{
					postFollowUser(qs.stringify({
							userId:this.$store.state.user.id,
							toUserId:userId
						})
					)
					.then(res => {
						if(res.status==200){
							this.$message.success(res.message)
							this.getUserInformation()
						}else if(res.status==400){
							this.$message.error(res.message)
						}
					})
					.catch(error => {
						this.$message.error(error)
					})
				}
			},
			previewImg(url){
				this.imgPreview=url
				this.modalImg=true
			},
			toMsg(id){
				this.$router.push({path:"/msg",query:{id:id}})
			},
			toUser(id){
				this.$router.push({path:"/user",query:{id:id}})
			},
			comment(id){
				if(this.$store.getters.isLogin==false){
					this.$router.push({path:"/msg",query:{id:id}})
					// this.$message.warning('还没登录哦，不能评论哦！');
				}else{
					//如果已登录就显示评论框
					this.$router.push({path:"/msg",query:{id:id}})
				}
			},
			changeModal(){
				this.modalImg=false
			},
			// 图片加载失败显示默认图片
			imgError(list,index){
				list[index]=require('../assets/imgError.png');
			}
		}
	};
</script>
<style>		
	/* 帖子 */
	.user-posts{
		background-color: #FFFFFF;
		border-radius: 5px;
		margin: 0px 10px 20px 10px;
	}
	.user-posts-header{
		padding: 10px 10px 10px 10px;
	}
	.user-posts-header-username{
		font-size: 16px;
		color: black;
	}
	.user-posts-header-time{
		text-align: left;
		font-size: 12px;
		color: #9e9e9e;
	}
	.user-posts-content{
		width: calc(100%-20px);
		margin-left: 10px;
		margin-right: 10px;
	}
	.text-blue{
		font-size: 16px;
		color: #1088E9;
	}
	.user-posts-content-message{
		font-size: 16px;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:4; 
	}
	.user-posts-content-img{
		width: auto;
		height: auto;
		max-width: 30%;
		max-height: 30%;
		margin: 5px 5px 5px 0px ;
	}
	.user-posts-footer{
		/* border-top: 1px solid #EEEEEE; */
		/* padding: 0px 10px 0px 10px ; */
		/* margin-top: 10px; */
	}
	.user-posts-topics{
		width:auto;
		display:inline-block !important;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		background-color: #EEEEEE;
		max-width: 120px;
		height: 20px;
		border-radius: 5px;
		margin: 0px 10px 0px 10px;
		padding: 0px 5px 0px 5px;
	}
	.user-posts-topics-title{
		/* width: 90px; */
		margin: 0px 5px 0px 5px;
		font-size: 10px;
		/* line-height: 20px; */
		color: #1088e9;
/* 		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap; */
	}
	.user-posts-topics-icon{
		background-color: #EEEEEE;
		/* background-color: #E0E0E0; */
		border-radius: 5px;
		height: 20px;
		width: 20px;
	}
	
	/* 关注列表 */
	.user-follow-list{
		border-radius: 5px;
		margin-top: 60px;
		padding: 10px;
		background-color: #FFFFFF;
	}
	.user-follow-list-header{
		/* padding: 10px; */
		border-bottom: 0.5px solid #9E9E9E;
		margin-bottom: 10px;
	}
	.user-follow-list-content-user{
		margin-bottom: 10px;
	}
	.user-follow-list-content-user-username{
		margin-left: 10px;
	}
	
	/* 粉丝列表 */
	.user-fans-list{
		border-radius: 5px;
		margin-top: 60px;
		padding: 10px;
		background-color: #FFFFFF;
	}
	.user-fans-list-header{
		/* padding: 10px; */
		border-bottom: 0.5px solid #9E9E9E;
		margin-bottom: 10px;
	}
	.user-fans-list-content-user{
		margin-bottom: 10px;
	}
	.user-fans-list-content-user-username{
		margin-left: 10px;
	}
	
	/* 底部加载数据 */
	.loding-data{
		height: 30px;
		/* background-color: #FFFFFF; */
	}

</style>
