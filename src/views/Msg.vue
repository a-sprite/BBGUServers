/**
* @auther: 一瓶雪碧
* @date: 2020/12/10
* @desciption:  动态详情
*/
<template>
	<!-- 全局 bgein -->
	<div id='warp' class="msg">
		<!-- 全局栅格 begin -->
		<a-row type="flex" justify="center" style='margin-top: 20px;'>
			<a-col :span='16'>
				<a-col :span='5'>
					<SideNav></SideNav>
				</a-col>
				<a-col :span='19' style='min-width: 300px;padding-left: 20px;'>
					<div class="detailsPost border-shadow4">
						<div class="detailsPost-header flex flex-nowrap justify-between" style="margin-top: 0px;">
							<div class="flex flex-nowrap align-center">
								<a-avatar @click.stop="toUser(message.userId)" :src='message.avatar' shape="square" :size="35"/>
								<div style="margin-left: 10px;">
									<div class="detailsPost-header-username" @click.stop="toUser(message.userId)">
										{{message.username}}
									</div>
									<div class="detailsPost-header-time">
										{{message.time}}
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
									<a-menu-item v-if="$store.getters.isLogin==true&&$store.state.user.id==message.userId">
										<a @click.stop="deleteModal=true"><a-icon type="delete" />删除</a>
									</a-menu-item>
									<a-modal v-model="deleteModal" title="Basic Modal" @ok="deleteMsg(message.id)">
										<p>确认删除当前选中动态吗？</p>
									</a-modal>
									<a-menu-item>
										<a href="javascript:;"><a-icon type="warning" />举报</a>
									</a-menu-item>
								</a-menu>
							</a-dropdown>
							<!-- </div> -->
						</div>
						<div class="detailsPost-content">
							<p style="font-size: 16px;">{{message.content}}</p>
							<div class="detailsPost-imgs">
								<img v-if="message.pictures.length!=0" v-for="(pictureUrl,index) in message.pictures" :key="index" :src="pictureUrl" @click="previewImg(pictureUrl)" @error="imgError(message.pictures,index)"/>
								<!-- <img @click="previewImg(list.url)" v-for="(list,index) in messageList[$route.query.id-1].imgs" :key='index' :src="list.url"/> -->
							</div>
						</div>
						<div class="detailsPost-topic flex">
							<!-- <div class='detailsPost-topic-icon flex align-center justify-center'>
								<a-icon style='color: #9E9E9E;font-size: 14px;' type="tag" />
							</div> -->
							<i class="iconfont icon-yuzhou" style='color: #1088e9;font-size: 14px;'></i>
							<a-tooltip class="detailsPost-topic-title">
								{{message.nodeTitle}}
								<template slot="title">
									{{message.nodeTitle}}
								</template>
							</a-tooltip>
							<!-- <div class='detailsPost-topic-icon flex align-center justify-center' style="background-color: #EEEEEE;">
								<a-icon style='color: #9E9E9E;font-size: 12px;' type="caret-right" />
							</div> -->
						</div>
						<div class="detailsPost-love flex flex-wrap align-center">
							<!-- 这里若用户已登录要判断该用户是否点了喜欢这条动态 -->
							<a-icon style='font-size: 25px;color: #E91E63;' @click='like(message.id)' type="like" theme="filled" v-if="likeList.userLike==true" />
							<a-icon style='font-size: 25px;color: #9e9e9e;' @click='like(message.id)' type="like" v-else/>
							<a-avatar style='margin-left: 5px;margin-right: 5px;' v-for="(list,index) in likeList.like" :key='index' :src='list.avatar' :size="25" @click="toUser(list.userId)" />
							<a-icon style='font-size: 25px;' type="ellipsis" v-if='likeList.length==10' />
						</div>
					</div>
					<div class="comment">
						<div class="comment-header">
							<h1 style="font-size: 24px;font-weight: 300;line-height: 24px;white-space: nowrap;">评论<a style="font-size: 14px;color: #9E9E9E;pointer-events:none">|共{{commentList.length}}条</a></h1>
						</div>
						<a-textarea :placeholder="placeholder" v-model='comment' :maxLength="150" @keyup.delete="delectCommentObject" allow-clear/>
						<div class="flex justify-between">
							<a-icon class="expression" style='margin: 10px 0px 10px 0px;font-size: 26px;' type="smile" />
							<a-button v-if="comment!=''" style='margin: 10px 0px 10px 0px;' type="primary" @click='send'>评论</a-button>
							<a-button v-else style='margin: 10px 0px 10px 0px;' type="primary" @click='send' disabled>评论</a-button>
						</div>
					</div>
					<div class="empty flex justify-center">
						<img style="width: 150px;" v-if="commentList.length==0" src="../assets/empty.png" />
					</div>
					<div class="comment-list" v-if="commentList.length!=0">
						<Comment v-for="(list,index) in commentList" :key='index'
						@reply="reply"
						:msgId='message.id'
						:commentUserId='list.commentUserId' 
						:postUserId='message.userId'
						:commentId='list.commentId' 
						:username='list.commentUsername' 
						:avatar='list.commentUserAvatar' 
						:time='list.commentTime' 
						:content='list.commentContent' 
						:likeNumber='list.commentLikeNumber' 
						:childrenUserId="list.children?list.children.commentUserId:''"
						:childrenUsername="list.children?list.children.commentUsername:''"
						:childrenAvatar="list.children?list.children.commentUserAvatar:''"
						:childrenTime="list.children?list.children.commentTime:''"
						:childrenContent="list.children?list.children.commentContent:''">
						</Comment>
					</div>
					<div class="flex justify-center" style="margin: 20px;">
						<a-pagination simple :current="currentPage" :default-current="1" :total="commentNumber" @change="changePages" />
					</div>
				</a-col>
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
	import SideNav from '@/components/SideNav.vue'
	import Modal from '@/components/Modal.vue'
	import Comment from '@/components/Comment.vue'
	import { postLike,postGetMsgDetails,postGetMsgLikeUser,postGetMsgComment,postSendComment,postDeleteMsg } from '@/apis/axios'
	import qs from 'qs'
	
	export default {
		name: 'Msg',
		components: {
			SideNav,
			Modal,
			Comment
		},
		data(){
			return{
				modalImg:false,//弹窗显示状态
				imgPreview:'',//预览图片地址
				comment:'',//评论框的model
				toCommentId:null,//回复的评论的id
				toUserId:null,
				placeholder:'想说点什么呢',//评论框默认提示内容
				msgId:0,
				message:[],
				likeList:[],
				commentList:[],
				currentPage:1,//当前评论页数
				commentNumber:0,//评论数量   可以直接用commentList长度
				deleteModal:false//删除确认弹窗
			}
		},
		mounted(){
			this.msgId=this.$route.query.id
			this.getMsgComment()
			this.getMsgDetails()
			this.getMsgLikeUser()
		},
		methods:{
			//获取动态内容
			getMsgDetails(){
				postGetMsgDetails(qs.stringify({
						msgId:this.msgId,
						userId:this.$store.getters.isLogin==true?this.$store.state.user.id:'0'
					})
				)
				.then(res => {
					// 请求成功
					console.log(res);
					this.message=res.msg
				})
				.catch(error => {
					console.log(error)
				})
			},
			//获取点赞列表头像
			getMsgLikeUser(){
				postGetMsgLikeUser(qs.stringify({
						msgId:this.msgId,
						userId:this.$store.getters.isLogin==true?this.$store.state.user.id:'0'
					})
				)
				.then(res => {
					// 请求成功
					// console.log(this.msgId,this.$store.getters.isLogin==true?this.$store.state.user.id:'0',res)
					this.likeList=res
				})
				.catch(error => {
					console.log(error)
				})
			},
			//获取评论
			getMsgComment(){
				postGetMsgComment(qs.stringify({
						msgId:this.msgId,
					})
				)
				.then(res => {
					// 请求成功
					// console.log(res);
					this.commentList=res.comment
					this.commentNumber=this.commentList.length
				})
				.catch(error => {
					console.log(error)
				})
			},
			toUser(id){
				this.$router.push({path:"/user",query:{id:id}})
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
						if(res.code==200){
							// this.message.likeNumber++;
							this.likeList.userLike=true
						}else if(res.code==201){
							// this.message.likeNumber--;
							this.likeList.userLike=false
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
						this.$router.push({path:"/"})
					}else if(res.status==400){
						this.$message.error("删除动态失败！请稍后再试...")
					}
				})
				.catch(error => {
					this.$message.error(error)
				})
				this.deleteModal=false
			},
			send(){
				// console.log(this.$store.getters.isLogin)
				if(this.$store.getters.isLogin!=true){
					this.$message.error('你还没登录鸭');
					return;
				}
				if(this.comment==''){
					this.$message.error('先把你想说的话敲上去');
				}else{
					postSendComment(qs.stringify({
							msgId:this.message.id,
							userId:this.$store.state.user.id,
							toUserId:this.toUserId,
							toCommentId:this.toCommentId,
							comment:this.comment
						})
					)
					.then(res => {
						// console.log(res)
						if(res.code==200){
							this.$message.success('评论成功！');
							this.comment=''
						}
						this.getMsgComment()
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
			changeModal(){
				this.modalImg=false
			},
			//获取回复的评论的id
			reply(toCommentId,toUserId,toUsername){
				this.toCommentId=toCommentId
				this.toUserId=toUserId
				this.placeholder='回复 '+toUsername
			},
			//清除回复评论对象内容，改回直接评论动态
			delectCommentObject(){
				if(this.comment==""){
					this.toCommentId=null
					this.toUserId=null
					this.placeholder='想说些什么呢'
				}
			},
			// 图片加载失败显示默认图片
			imgError(list,index){
				list[index]=require('../assets/imgError.png');
			},
			changePages(pages){
				this.currentPage=pages
				console.log(pages)
			}
		}
	}
</script>

<style>
	/* 全局 */
	.msg{
		text-align: left;
		min-width: 750px;
	}
	
	/* 动态详情 */
	.detailsPost{
		background-color: #FFFFFF;
		/* margin-right: 20px; */
		border-radius: 5px;
		padding: 10px 20px 10px 20px ;
	}
	.detailsPost-header{
		/* padding: 10px 20px 10px 20px; */
	}
	.detailsPost-header-username{
		font-size: 16px;
		color: black;
	}
	.detailsPost-header-time{
		font-size: 12px;
		color: #9e9e9e;
	}
	.detailsPost-content{
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.detailsPost-imgs{
	}
	.detailsPost-imgs img{
		width: auto;
		height: auto;
		max-width: 30%;
		max-height: 30%;
		margin: 5px 5px 5px 0px ;
	}
	.detailsPost-topic{
		width:auto;
		display:inline-block !important;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		background-color: #EEEEEE;
		max-width: 120px;
		height: 20px;
		border-radius: 5px;
		/* margin: 0px 20px 0px 20px; */
		padding: 0px 5px 0px 5px;
	}
	.detailsPost-topic-title{
		margin: 0px 5px 0px 5px;
		font-size: 10px;
		/* line-height: 20px; */
		color: #1088e9;
	}
	.detailsPost-topic-icon{
		background-color: #EEEEEE;
		/* background-color: #E0E0E0; */
		border-radius: 5px;
		height: 20px;
		width: 20px;
	}
	.detailsPost-love{
		margin-top: 5px ;
		margin-bottom: 5px;
		/* padding: 10px 20px 10px 20px; */
		/* padding-bottom: 20px; */
	}
	
	/* 评论区 */
	.expression :hover{
		color: #1088E9;
	}
	.comment{
		margin-top: 20px;
		/* margin-right: 20px; */
		/* background-color: #FFFFFF; */
	}
	.comment-list{
		/* background-color: #FFFFFF; */
		margin-top: 20px;
		/* padding:10px 20px 10px 20px; */
		border-radius: 10px;
	}
</style>
