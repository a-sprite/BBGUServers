/**
* @auther: 一瓶雪碧
* @date: 2020/12/1
* @desciption:  首页
*/
<template>
	<!-- 全局 bgein -->
	<div id='warp' class="home" style="min-width: 750px;">
		<!-- <myNavigation current="home" ref='nav'></myNavigation> -->
		<!-- 全局栅格 begin -->
		<a-row type="flex" justify="center" style='margin-top: 20px;margin-bottom: 20px;'>
			<a-col :span='16'>
				<!-- 左侧内容 begin -->
				<a-col :span="5">
					<SideNav></SideNav>
				</a-col>
				<!-- 左侧内容 end -->
				<!-- 中间内容 begin -->
				<a-col :span="14" style='text-align: left;padding: 0px 20px 0px 20px;'>
					<!-- <a-tabs default-active-key="1" style="margin: 0px;">
						<a-tab-pane key="1" tab="热门" style="margin: 0px;"> -->
							<!-- 发布内容 begin -->
							<div class="border-shadow4" style="background-color: #FFFFFF;border-radius: 5px;padding: 10px;margin-bottom: 20px;" v-if="$store.getters.isLogin==true">
								<!-- <a-textarea placeholder="你想分享一些什么好呢" v-model='releaseContent' :maxLength="150" allow-clear ref='sendInput' /> -->
								<a-mentions placeholder="你想分享一些什么好呢" style="font-size: 16px;" rows="3" :loading="loading" :prefix="['@','#']" :value="releaseContent" @search="getMentions" @change="getReleaseContent">
									<a-mentions-option v-for="(list,index) in mentionsList[prefix]||[]" :key="index" :value="list.nodeTitle+'#'">
										<span>{{ list.nodeTitle }}</span>
									</a-mentions-option>
								</a-mentions>
								<div class="flex align-start justify-between" style="margin-top: 10px;background-color: #FFFFFF;border-radius: 5px;">
									<div>
										<a-icon class="camera" style='font-size: 30px;color: #1088E9;margin-right: 10px;' type="smile" />
										<!-- 图片上传组件 begin -->
										<a-upload :file-list="imgList" :remove="handleRemove" :before-upload="beforeUpload" @preview="handlePreview">
											<a-icon v-if="imgList.length<9" class="camera" style="font-size: 30px;color: #1088E9;" type="camera" />
										</a-upload>
										<a class="flex justify-center" v-if="imgList.length>0" style="font-size: 14px;color: #a6a6a6;">{{imgList.length}}/9</a>
										<!-- 图片上传组件 end -->
									</div>
									<div class="flex align-center">
										<div v-if="releaseContent>0" style="margin-right: 10px;">{{releaseContent.length}}/150</div>
										<a-button v-if="releaseContent==''" type="primary" disabled>发送</a-button>
										<a-button v-else type="primary" @click="send">发送</a-button>
									</div>
								</div>
							</div>
							<!-- 发布内容 end -->
							<!-- 动态显示类型选择 begin -->
	<!-- 						<div class="flex justify-end" style="border-radius: 30%;margin-bottom: 20px;">
								<a-select default-value="early" style="width: 120px;border-radius: 30%;">
									<a-select-option value="early">最新回复</a-select-option>
									<a-select-option value="hot">最热门</a-select-option>
								</a-select>
							</div> -->
							<!-- 动态显示类型选择 end -->
							<!-- 动态 begin -->
							<div class="posts border-shadow4" v-for="(list,index) in messageList" :key='index'>
								<div class="posts-header flex justify-between align-start">
									<div class="flex align-center">
										<a-avatar @click.stop="toUser(list.userId)" :src='list.avatar' shape="square" :size="40"/>
										<div style="margin-left: 10px;">
											<div class="posts-header-username" @click.stop="toUser(list.userId)">
												{{list.username}}
											</div>
											<div class="posts-header-time">
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
								<div class="posts-content" style="padding-top: 0px;" @click="toMsg(list.id)">
									<div class="posts-content-message" >
										{{list.content}}
										<!-- @人以及话题内容如何高亮与跳转 -->
										<!-- 1.发布时，识别" @用户 "显示选择框艾特的用户(这里有 antd的提及)
										2.上传数据库用特别符号括起来。
										3.前端读取动态时，后端判断每一条是否有艾特人，有就查询该用户id，然后" @用户 "前后分数组存储，若是正常内容则is@=false
										若是艾特用户则is@=true
										4.数据 到达前端，在渲染动态内容时，再循环判断每一个content数组的子数组，是正常内容还是艾特用户，然后分别用p或a标签渲染。 -->
									</div>
									<div style="margin-top: 10px;margin-bottom: 10px;text-align: left;width:40%;pointer-events:auto" >
										<!-- <img class="post-content-img" v-for="(img,index2) in list.imgs" @click="preview(img.url)" :src="img.url" :key='index2'/> -->
										<img class="posts-content-img" v-if="list.pictures.length!=0" v-for="(pictureUrl,index2) in list.pictures" :key="index2" @click.stop="preview(pictureUrl)" :src="pictureUrl" @error="imgError(list.pictures,index2)"/>
									</div>
								</div>
								<div class="posts-topics">
									<!-- <div class='post-topics-icon flex align-center justify-center'>
										<i class="iconfont icon-yuzhou" style='color: #1088e9;font-size: 14px;'></i>
									</div> -->
									<i class="iconfont icon-yuzhou" style='color: #1088e9;font-size: 14px;'></i>
									<a-tooltip class="posts-topics-title">
										{{list.nodeTitle}}
										<template slot="title">
											{{list.nodeTitle}}
										</template>
									</a-tooltip>
									<!-- <div class='posts-topics-icon flex align-center justify-center' style="background-color: #EEEEEE;">
										<a-icon style='color: #9E9E9E;font-size: 12px;' type="caret-right" />
									</div> -->
								</div>
								<div class="posts-footer flex justify-around">
									<a-button type="link" icon='share-alt' size='large' style="color: #424242;"></a-button>
									<a-button type="link"  icon='message' size='large' style="color: #424242;" @click='comment(list.id)'>{{list.commentNumber}}</a-button>
									<a-button type="link" size='large' @click='like(index,list.id)'><a v-if="list.userLike==true&&$store.getters.isLogin==true"><a-icon style='color: #E91E63;' type="like" theme="filled"/></a><a v-else style='color: #424242;'><a-icon type="like" /></a><a v-if="list.userLike==true&&$store.getters.isLogin==true" style='color: #E91E63;'>{{list.likeNumber}}</a><a v-else style='color: #424242;'>{{list.likeNumber}}</a></a-button>
								</div>
							</div>
							<!-- 动态 end -->
					<!-- 	</a-tab-pane>
						<a-tab-pane key="2" tab="最新" force-render>
							暂未更新
						</a-tab-pane>
					</a-tabs> -->
				</a-col>
				<!-- 中间内容 end -->
				<!-- 右侧内容 begin -->
				<a-col :span="5">
					<!-- 搜索 begin -->
					<div class="border-shadow4" style="padding: 10px;background-color: #FFFFFF;border-radius: 5px;">
						<a-input-search placeholder="输入关键字搜索" style="width: 100%" @search="" />
					</div>
					<!-- 搜索 end -->
<!-- 					<div class="flex justify-around">
						<div style="width: 10px;height: 20px;background-color: #FFFFFF;"></div>
						<div style="width: 10px;height: 20px;background-color: #FFFFFF;"></div>
					</div> -->
					<!-- 热门榜单 begin -->
					<div class="hot border-shadow4" style="margin-top: 20px;">
						<div class="hot-title flex justify-center align-center flex-nowrap">
							<div>热门榜</div>
							<!-- <icon-font style='font-size: 36px;' type="icon-remenbangdan" /> -->
						</div>
						<div class="hot-content">
							<a class="hot-list-a-title" v-for="(list,index) in hotList" :key='index' @click="toMsg(list.id)">{{index+1}}.{{list.title}}</a>
						</div>
					</div>
					<!-- 热门榜单 end -->
				</a-col>
				<!-- 右侧内容 end -->
			</a-col>
		</a-row>
		<!-- 全局栅格 end -->
		<!-- 加载数据 begin-->
		<div class="loding-data flex align-center justify-center" v-if="loading==false" @click="getMsg" >
			点击加载更多
			<a-icon style='margin-left: 10px;' type="sync" spin />
		</div>
		<div class="flex justify-center" style="height: 50px;font-size: 16px;font-weight: 300;" v-if="loading==true" @click="toSendMsg" >
			即使前路混沌，你在，便是人间。想拥有更多的美好，想要与你一起看到。
		</div>
		<!-- 加载数据 end-->
		<!-- 图片预览弹窗 begin -->
		<Modal :isOpen='modalImg' :imgUrl='imgPreview' @changeModal='changeModal' ></Modal>
		<!-- 图片预览弹窗 end -->
	</div>
	<!-- 全局 end -->
</template>
<script>
	import ColorThief from "colorthief"
	import { Icon } from 'ant-design-vue';
	import SideNav from '@/components/SideNav.vue'
	import Modal from '@/components/Modal.vue'
	import { postGetHotMsg,postGetMsg,postLike,postReleaseMsg,postDeleteMsg,postGetNode } from '@/apis/axios'
	import qs from 'qs'
	
	//项目图标库有更新需要更新url
	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2247340_qbzy7zjrwr.js',
	});
	
	function getBase64(file) {
	  return new Promise((resolve, reject) => {
	    const reader = new FileReader();
	    reader.readAsDataURL(file);
	    reader.onload = () => resolve(reader.result);
	    reader.onerror = error => reject(error);
	  });
	}
	
	export default {
		components: {
			IconFont,
			SideNav,
			Modal
		},
		data() {
			return {
				imgPreview:'',//预览图片URL
				modalImg:false,//弹窗预览图
				loading:false,//判断是否加载完全部内容
				page:0,//页数
				hotList:[],//热门数组
				messageList:[],//动态的数组
				releaseContent:'',//发布的动态内容
				imgList: [],//发布动态上传的图片
				imgUrlList: [],//发布动态上传的图片的base64 url
				deleteModal:false,//删除确认弹窗
				loading: false,//提及数据加载状态
				mentionsList:{
					'@':[],
					'#':[]
				},//提及列表
				prefix:'@'//当前提及判断符号
			};
		},
		mounted() {
			this.getHotMsg()
			this.getMsg()
		},
		methods: {
			getHotMsg(){
				//热门榜单
				postGetHotMsg()
				.then(res => {
					// 请求成功
					console.log(res);
					this.hotList=res.hot
				})
				.catch(error => {
					console.log(error)
				})
			},
			getMsg(){
				let userId=this.$store.getters.isLogin?this.$store.state.user.id:'0'
				this.page++
				postGetMsg(qs.stringify({
						page:this.page,
						userId:userId
					})
				)
				.then(res => {
					// 请求成功
					if(res.code=="444"){//动态已加载完
						this.loading=true
					}else{
						this.messageList=this.messageList.concat(res.msg)
					}
					console.log(this.page,res);
					//可以v-html,但是不安全，用户如果插入一些html代码破坏就很麻烦。还是在后端正则匹配然后查询用户是否存在再高亮返回到前端
					//结合posts-content里边的注释一起解决
					// this.messageList.forEach((item,index) => {
					// 	var exp=/(?<=@).*?(?= )/
					// 	var username=item.content.match(exp)
					// 	item.content=item.content.replace("@"+username+" ",'<span class="text-blue">@' + username + '</span>')
					// })
				})
				.catch(error => {
					console.log(error)
				})
			},
			like(index,id){
				if(this.$store.getters.isLogin==false){
					this.$message.warning('还没登录哦，不能点赞！')
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
							this.messageList[index].likeNumber++;
							this.messageList[index].userLove=true
						}else if(res.code==201){
							this.messageList[index].likeNumber--;
							this.messageList[index].userLove=false
						}
					})
					.catch(error => {
						this.$message.error(error)
					})
				}
			},
			send(){
				if(this.releaseContent.length>150){
					this.$message.warning("字数超过150个字啦！！")
				}else{
					postReleaseMsg(qs.stringify({
							userId:this.$store.state.user.id,
							content:this.releaseContent,
							imgList:this.imgUrlList
						})
					)
					.then(res => {
						// 请求成功
						console.log(res)
						if(res.status==200){
							this.$message.success("发布成功！")
						}else if(res.status==400){
							this.$message.error("发布失败！请稍后再试...")
						}
						this.releaseContent=""
						this.imgUrlList=[]
						this.imgList=[]
						this.messageList=[]
						this.page=0
						this.getMsg()
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
					this.getMsg()
				})
				.catch(error => {
					this.$message.error(error)
				})
				this.deleteModal=false
			},
			getMentions(_, prefix){
				if(prefix=='#'){
					postGetNode()
					.then(res => {
						if(res.status==200){
							// console.log(res)
							this.mentionsList['#']=res.node
							this.prefix='#'
						}
					})
					.catch(error => {
						this.$message.error(error)
					})
				}
			},
			getReleaseContent(content){
				this.releaseContent=content
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
			preview(imgUrl){
				this.imgPreview=imgUrl
				this.modalImg=true
			},
			toMsg(id){
				this.$router.push({path:"/msg",query:{id:id}})
			},
			toUser(id){
				this.$router.push({path:"/user",query:{id:id}})
			},
			changeModal(){
				this.modalImg=false
			},
			// 图片加载失败显示默认图片
			imgError(list,index){
				list[index]=require('../assets/imgError.png');
			},
			// 发布动态input获取焦点
			toSendMsg(){
				if(this.$store.getters.isLogin==true){
					this.$refs.sendInput.focus()
				}else{
					this.$message.warning("请先登录哦")
				}
			},
			handleCancel() {
			  this.previewVisible = false;
			},
			async handlePreview(file) {
			  if (!file.url && !file.preview) {
				file.preview = await getBase64(file.originFileObj);
			  }
			  this.previewImage = file.url || file.preview;
			  this.previewVisible = true;
			},
			handleChange({ fileList }) {
			  this.imgList = fileList;
			},
			// 上传图片前校验
			beforeUpload(file) {
				const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
				if (!isJpgOrPng) {
					this.$message.error('只能上传jpg/jpeg/png格式的图片!')
					return false
				}
				const isLt1M = file.size / 1024 / 1024 < 1
				if (!isLt1M) {
					this.$message.error('图片不得大于1MB!')
					return false
				}
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = e => {
					file.thumbUrl = e.target.result;
					this.imgUrlList.push(e.target.result)
				};
				this.imgList = [...this.imgList, file]
				return false;
			},
			handleRemove(file) {
				const index = this.imgList.indexOf(file);
				const newimgList = this.imgList.slice();
				newimgList.splice(index, 1);
				this.imgList = newimgList;
			}
		}
	};
</script>
<style>	
	/* 热门榜单 */
	.hot{
		width: 100%;
		padding: 10px;
		background-color: #FFFFFF;
		border-radius:5px;
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
	.hot-list{
	}
	.hot-list-a-title{
		margin: 10px;
		font-size: 14px;
		overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:1; 
	}
	
	/* 发布动态 */
	.camera :hover{
		color: #484848;
	}
	
	/* 帖子 */
	.posts{
		background-color: #FFFFFF;
		border-radius: 5px;
		margin-bottom: 20px;
	}
	.posts-header{
		padding: 10px 10px 10px 10px;
	}
	.posts-header-username{
		font-size: 16px;
		color: black;
	}
	.posts-header-time{
		text-align: left;
		font-size: 12px;
		color: #9e9e9e;
	}
	.posts-content{
		width: calc(100%-20px);
		margin-left: 10px;
		margin-right: 10px;
	}
	.text-blue{
		font-size: 16px;
		color: #1088E9;
	}
	.posts-content-message{
		font-size: 16px;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:4; 
	}
	.posts-content-img{
		width: auto;
		height: auto;
		max-width: 30%;
		max-height: 30%;
		margin: 5px 5px 5px 0px ;
	}
	.posts-footer{
		/* border-top: 1px solid #EEEEEE; */
		/* padding: 0px 10px 0px 10px ; */
		/* margin-top: 10px; */
	}
	.posts-topics{
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
	.posts-topics-title{
		margin: 0px 5px 0px 5px;
		font-size: 10px;
		color: #1088e9;
	}
	.posts-topics-icon{
		background-color: #EEEEEE;
		border-radius: 5px;
		height: 20px;
		width: 20px;
	}
	
	/* 底部加载数据 */
	.loding-data{
		height: 50px;
		/* background-color: #FFFFFF; */
	}

</style>
