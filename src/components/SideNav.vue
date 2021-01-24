/**
* @auther: 一瓶雪碧
* @date: 2020/12/5
* @desciption:  侧边导航栏
*/
<template>
	<div style="min-width: 150px;text-align: center;">
		<div class="border-shadow4" style="margin-bottom: 20px;background-color: #FFFFFF;border-radius: 5px;" >
			<!-- 个人信息卡 begin -->
			<div class="infor-card" v-if="$store.getters.isLogin">
				<div class="infor-card-header flex flex-column align-center justify-center" @click.stop="toUser">
					<a-avatar :src='$store.state.user.avatar' :size='45'/>
					<p style="font-size: 20px;margin-top: 10px;color: #FFFFFF;">{{$store.state.user.username}}</p>
				</div>
				<div class="flex justify-between" style="margin:20px;">
					<!-- 后面再添加点击效果 -->
					<div class="flex flex-column">
						<a style="color: #000000;">动态</a>
						<!-- <a-icon style='font-size: 20px;' type="camera" /> -->
						{{$store.state.user.msgNumber}}
					</div>
					<div class="flex flex-column">
						<a style="color: #000000;">关注</a>
						{{$store.state.user.followNumber}}
						<!-- {{$store.state.user.commentNumber}} -->
					</div>
					<div class="flex flex-column">
						<a style="color: #000000;">粉丝</a>
						{{$store.state.user.fansNumber}}
						<!-- {{$store.state.user.likeNumber}} -->
					</div>
				</div>
			</div>
			<!-- 个人信息卡 end -->
			<!-- 侧边导航栏 begin -->
			<a-menu style='text-align: left;border-radius: 5px;' mode="inline">
				<a-menu-item key="1">
					<a-icon style='font-size: 20px;' type="tag" />
					话题
				</a-menu-item>
				<a-menu-item key="5">
					<a-icon style='font-size: 20px;' type="bell" />
					通知
				</a-menu-item>
				<a-menu-item key="2">
					<i class="iconfont icon-daoyu" style="margin-right: 15px;"></i>
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
		<div class="one border-shadow4" >
			<div class="one-header flex flex-nowrap align-center justify-center">
				<h3 style="line-height: 18px;">ONE</h3>
			</div>
			<div class="one-content flex flex-nowrap">
				<a style="color: #000000;pointer-events: none;text-align: left;">
					<div class="one-content-date border-shadow">
						<p style="font-size: 45px;line-height: 45px;text-align: center;height: 45px;margin-bottom: 0px;">{{one.date.day}}</p>
						<p style="font-size: 14px;display: inline;">{{one.date.mon}}</p>
						<p style="font-size: 14px;display: inline;"> {{one.date.year}}</p>
					</div>
					{{one.content}}
				</a>
			</div>
			<img id='oneimg' style="width: 100%; padding: 10px;" @click="preview(one.picture)" :src="one.picture" />
		</div>
		<!-- ONE end -->
		<!-- 网愈云 begin -->
		<div class="music">
			网愈云
		</div>
		<!-- 网愈云 end -->
		<Modal :isOpen='modalImg' :imgUrl='imgPreview' @changeModal='changeModal' ></Modal>
	</div>
</template>

<script>
	import Modal from '@/components/Modal.vue'
	import { postOne } from '@/apis/axios'

	export default {
		name: 'SideNav',
		components: {
			Modal
		},
		data(){
			return{
				imgPreview:'',//预览图片URL
				modalImg:false,//弹窗预览图
				one:{
					content:'',
					picture:'',
					date:{
						day:'',
						mon:'',
						year:''
					}
				}
			}
		},
		mounted(){
			this.getData()
		},
		methods:{
			preview(imgUrl){
				this.imgPreview=imgUrl
				this.modalImg=true
			},
			changeModal(){
				this.modalImg=false
			},
			getData(){
				postOne()
				.then(res => {
					// 请求成功
					// console.log(res)
					this.one=res
				})
				.catch(error => {
					console.log(error)
				})
			},
			toUser(){
				this.$router.push({path:"/user",query:{id:this.$store.state.user.id}})
			}
		}
	}
</script>

<style>
	/* 首页个人资料卡 */
	.infor-card{
		border-radius: 5px;
		background-color: #FFFFFF;
	}
	.infor-card-header {
		padding: 10px;
		border-radius: 5px 5px 0px 0px;
		background-color: #FFFFFF;
		background-image: url(https://cdn.w3cbus.com/mdui.org/docs/assets/docs/img/card.jpg!webp);
		background-size: cover;
	}
	
	/* ONE */
	.one{
		background-color: #FFFFFF;
		border-radius: 5px;
	}
	.one-header{
		padding-top: 10px;
		font-size: 18px;
	}
	.one-content{
		padding: 0px 10px 10px 10px;
	}
	.one-content-date{
		display: inline;
		float: left;
		min-height:40px;
		margin-right: 10px;
		padding: 5px;
	}
</style>
