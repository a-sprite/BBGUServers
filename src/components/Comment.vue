/**
* @auther: 一瓶雪碧
* @date: 2020/12/1
* @desciption:  评论组件
*/
<template>
	<div class="comment flex">
		<div  style='min-width: 35px;padding-right: 10px;'>
			<!-- shape="square" -->
			<a-avatar @click.stop="toUser(commentUserId)" :src='avatar'/>
		</div>
		<div style="min-width: 200px;width: 100%;">
			<div class="username flex align-center justify-between">
				<a class="username-a" @click.stop="toUser(commentUserId)">{{username}}</a>
				<!-- <a-tag v-if='id==3' color="#87d068" style='margin-left: 10px;'>作者</a-tag> -->
				<!-- <a>#{{id}}</a> -->
				<!-- 动态菜单 begin -->
				<a-dropdown v-if="$store.state.user.id==postUserId">
					<a class="ant-dropdown-link" @click="e => e.preventDefault()"><a-icon style='font-size: 25px;' type="ellipsis" /></a>
					<a-menu slot="overlay">
						<a-menu-item>
							<a href="javascript:;"><a-icon type="up" style="margin-right: 5px;" />置顶</a>
						</a-menu-item>
					</a-menu>
				</a-dropdown>
				<!-- 动态菜单 end -->
			</div>
			<div class="comment-content">
				<a style="font-size: 14px;pointer-events: none;color: #000000;">{{content}}</a>
			</div>
			<!-- 子评论 begin -->
			<div class="children" v-if="childrenUsername!=''">
				<div class="flex">
					<a-avatar style="margin-right: 10px;" @click.stop="toUser(childrenUserId)" :size='30' :src='childrenAvatar'/>
					<div class="flex flex-column">
						<div class="flex align-center" style="height: 30px;">
							<a  @click.stop="toUser(childrenUserId)" style="color: #1088E9;font-size: 16px;pointer-events: none;font-weight: 700;">{{childrenUsername}}</a>
						</div>
						<div style="background-color: #FFFFFF;padding: 10px;border-radius: 5px;">
							<a style="font-size: 14px;pointer-events: none;color: #000000;">{{childrenContent}}</a>
						</div>
					</div>
				</div>
				<a class="flex justify-end" style="font-size: 12px;pointer-events: none;color: #000000;">{{childrenTime}}</a>
			</div>
			<!-- 子评论 end -->
			<div class="comment-footer flex align-center justify-between">
				<div class="flex align-center">
					<button style="border: none;background-color:transparent;outline:none;font-size: 16px;color: #9E9E9E;" @click="like"><a-icon style='color: #9e9e9e;margin-right: 5px;' type="like" />{{likeNumber}}</button>
					<a style="color: #9e9e9e;margin-left: 20px;" @click="reply">回复</a>
					<a style="color: #9e9e9e;margin-left: 20px;font-size: 12px;" v-if="$store.state.user.id==postUserId" @click="visible=true">删除</a>
				</div>
				<div class="flex align-center">
					<a style="color: #9e9e9e;margin-right: 20px;font-size: 12px;">举报</a>
					<a class="time">{{time}}</a>
				</div>
			</div>
			<a-divider style='margin-top: 10px;margin-bottom: 10px;' />
		</div>
		<!-- 删除评论提示弹窗 begin -->
		<a-modal v-model="visible" title="提示" @ok="handleOk">
		  <p>确定删除评论吗</p>
		</a-modal>
		<!-- 删除评论提示弹窗 end -->
	</div>
</template>

<script>
	import { postDeleteComment } from '@/apis/axios'
	import qs from 'qs'
	
    export default {
        name: "Comment",
        data(){
            return{
				visible:false
            }
        },
		beforeCreate() {
		},
		props: {//参数传递需要在props里面声明
			'msgId': {
				type: String,
				default: ''
			},
			'commentUserId': {
				type: String,
				default: ''
			},
			'postUserId': {
				type: String,
				default: ''
			},
			'username': {
				type: String,
				default: ''
			},
			'avatar': {
				type: String,
				default: ''
			},
			'commentId': {
				type: String,
				default: ''
			},
			'time':{
				type:String,
				default:''
			},
			'content':{
				type:String,
				default:''
			},
			'likeNumber':{
				type:String,
				default:'0'
			},
			'childrenUserId':{
				type:String,
				default:''
			},
			'childrenUsername':{
				type:String,
				default:''
			},
			'childrenAvatar':{
				type:String,
				default:''
			},
			'childrenContent':{
				type:String,
				default:''
			},
			'childrenTime':{
				type:String,
				default:''
			}
		},
		methods: {
			//事件传递需要通过$emit来传递，参数refresh要与父组件@后面的属性相对应
			reply(){
				this.$emit('reply',this.commentId,this.id,this.username);
			},
			handleOk(){//这个传到父组件操作吧
				postDeleteComment(qs.stringify({
						commentId:this.commentId,
						msgId:this.msgId
					})
				)
				.then(res => {
					console.log(res)
					if(res.code==200){
						this.$message.success('评论已删除');
					}else if(res.code==401){//删除评论失败
						this.$message.error('删除评论失败！');
					}
				})
				.catch(error => {
					console.log(error)
				})
				this.visible=false
			},
			toUser(id){
				this.$router.push({path:"/user",query:{id:id}})
			},
			like(){
				
			}
		}
    }
</script>

<style>
	.username{
		text-align: left;
	}
	.username-a{
		font-size: 16px;
		color: black;
		font-weight: 800;
	}
	.time{
		float: right;
		font-size: 12px;
		color: #c1c1c1;
		pointer-events: none;
	}
	.comment{
		/* padding: 0px 0px 0px 10px; */
	}
	.comment-left{
		float: left;
	}
	.comment-content{
		background-color: #FFFFFF;
		padding: 10px;
		border-radius: 5px;
		margin-top: 10px;
		margin-bottom: 10px;
		font-size: 16px;
	}
	.comment-footer{
		/* padding-bottom: 10px; */
	}

	.children{
		background-color: #eeeeee;
		border-radius: 5px;
		/* margin: 10px 10px 10px 0px; */
		margin-bottom: 10px;
		padding: 10px;
	}
</style>
