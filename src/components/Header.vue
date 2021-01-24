/**
* @auther: kid1999
* @date: 2020/10/7 23:48
* @desciption:  Header
*/
<template>
	<!-- 溢出隐藏 防止窗口变小 -->
	<div class='border-shadow4' style="overflow:hidden;background-color: rgb(246,246,246);">
		<a-row type='flex' justify='center' align='middle' style="flex-wrap: nowrap;background-color: #FFF;height: 64px;box-shadow:0px 2px 2px #EEEEEE;">
			<a-col :span='16' class='flex flex-nowrap align-center justify-between'>
				<div class="flex flex-nowrap align-center">
					<!-- logo begin -->
					<a style="font-size: 40px;margin-right: 20px;">logo</a>
					<!-- logo end -->
					<!-- 导航按钮 begin -->
					<a-menu v-model="current" mode="horizontal">
						<a-menu-item key="find">失物招领</a-menu-item>
						<a-menu-item key="buy">二手交易</a-menu-item>
						<a-menu-item key="love">表白墙</a-menu-item>
						<a-sub-menu>
							<span slot="title" class="submenu-title-wrapper">湾大岛屿</span>
							<a-menu-item-group title="Item 1">
								<a-menu-item key="island:1">
									Option 1
								</a-menu-item>
								<a-menu-item key="island:2">
									Option 2
								</a-menu-item>
							</a-menu-item-group>
							<a-menu-item-group title="Item 2">
								<a-menu-item key="island:3">
									Option 3
								</a-menu-item>
								<a-menu-item key="island:4">
									Option 4
								</a-menu-item>
							</a-menu-item-group>
						</a-sub-menu>
						<a-sub-menu>
							<span slot="title" class="submenu-title-wrapper">其他</span>
							<a-menu-item-group title="Item 1">
								<a-menu-item key="setting:1">
									Option 1
								</a-menu-item>
								<a-menu-item key="setting:2">
									Option 2
								</a-menu-item>
							</a-menu-item-group>
							<a-menu-item-group title="Item 2">
								<a-menu-item key="setting:3">
									Option 3
								</a-menu-item>
								<a-menu-item key="setting:4">
									Option 4
								</a-menu-item>
							</a-menu-item-group>
						</a-sub-menu>
					</a-menu>
					<!-- 导航按钮 end -->
					<!-- 搜索框 begin -->
					<!-- <a-input-search placeholder="搜索" style="width: 200px;margin-left: 20px;" /> -->
					<!-- 搜索框 end -->
				</div>
				<!-- 登录&注册&账号状态栏 begin -->
				<div>
					<div class="flex align-center" style="margin-left: 20px;" v-if="$store.getters.isLogin==true">
						<a-dropdown>
							<!-- <a-icon type="camera" theme='twoTone' style='font-size: 32px;margin-left: 20px;margin-right: 20px;'/> -->
							<a-avatar :src='$store.state.user.avatar' v-if='$store.getters.isLogin==true' :size='40' @click="e => e.preventDefault()" /><a-avatar v-else shape="square" icon="user" :size='40' />
							<a-menu slot="overlay">
								<a-menu-item>
								<a href="javascript:;">个人信息</a>
								</a-menu-item>
								<a-menu-item>
								<a @click="logout">退出登录</a>
								</a-menu-item>
							</a-menu>
						</a-dropdown>
					</div>
					<div v-else>
						<div class="flex flex-nowrap" style="margin-left: 20px;">
							<a class="login" @click="toLogin">登录</a>
							<a style="color: #9E9E9E;font-size: 20px;font-weight: 500;margin: 0px 5px 0px 5px;">|</a>
							<a class="login" @click="toRegister">注册</a>
						</div>
						<!-- 登录弹窗 begin -->
						<a-modal v-model="modalLogin" :closable='true' :centered='true' :footer="null" :maskClosable='false'>
							<div class="modalHeader flex justify-center">
								<a style="font-size: 40px;margin-right: 20px;">logo</a>
							</div>
							<div class="modalMiddle">
								<a-tabs defaultActiveKey='1' :activeKey='btnState' @tabClick='tabChange'>
									<a-tab-pane key="tab1" tab="登录">
										<div class="flex flex-column justify-center">
											<div style="margin-top: 20px;margin-bottom: 10px;">
												<a-input placeholder="请输入你的账号" v-model='username' @change="changeUsername" allow-clear>
													<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
												</a-input>
											</div>
											<div style="margin-top: 10px;margin-bottom: 10px;">
												<a-input-password placeholder="请输入你的密码" v-model='password' @change="changePassword" allow-clear>
													<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
												</a-input-password>
											</div>
											<div class='flex justify-between'  style="margin-top: 10px;margin-bottom: 30px;">
												<a-checkbox>记住我</a-checkbox>
												<a class="login-form-forgot" >忘记密码</a>
											</div>
											<a-button type="primary" html-type="submit" class="login-form-button" :disabled="logBtn" @click='login'>登录</a-button>
										</div>
									</a-tab-pane>
									<a-tab-pane key="tab2" tab="注册" force-render>
										<div class="flex flex-column justify-center">
											<div style="margin-top: 20px;margin-bottom: 10px;">
												<a-input placeholder="输入你喜欢的昵称" v-model='registerUsername' @change="changeRegisterUsername">
													<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
												</a-input>
											</div>
											<div style="margin-top: 10px;margin-bottom: 40px;">
												<a-input-password type="password" placeholder="请输入你的密码" v-model='registerPassword' @change="changeRegisterPassword" allow-clear>
													<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
												</a-input-password>
												<a-input-password type="password" placeholder="再输入一次" style='margin-top: 20px;' v-model='registerPasswordSec' @change="changeRegisterPasswordSec" allow-clear>
													<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
												</a-input-password>
											</div>
											<a-button type="primary" html-type="submit" class="login-form-button" :disabled="regBtn" @click='register'>注册</a-button>
										</div>
									</a-tab-pane>
								</a-tabs>
							</div>
						</a-modal>
						<!-- 登录弹窗 end -->
					</div>
				</div>
				<!-- 登录&注册&账号状态栏 end -->
			</a-col>
		</a-row>
    </div>
</template>

<script>
	import { postLogin,postRegister } from '@/apis/axios'
	import qs from 'qs'
	
    export default {
        name: "Header",
        data(){
            return{
				current:['main'],
				modalLogin: false,//登录弹窗
				btnState:'',//判断点击登录还是注册
				notice:0,//通知数
				logBtn:true,//登录按钮状态
				regBtn:true,//注册按钮状态
				username:'',
				password:'',
				registerUsername:'',
				registerPassword:'',
				registerPasswordSec:''
            }
        },
		beforeCreate() {
			this.form = this.$form.createForm(this, { name: 'normal_login' });
		},
		methods: {
			onSearch(value) {
				console.log(value);
			},
			toLogin(){
				this.modalLogin=true
				this.btnState = 'tab1'
			},
			toRegister(){
				this.modalLogin=true
				this.btnState = 'tab2'
			},
			tabChange(){
				if(this.btnState == 'tab1'){
					this.btnState = 'tab2'
				}else{
					this.btnState = 'tab1'
				}
			},
			noticeLess(){
				this.notice-=1
			},
			noticeAdd(){
				this.notice+=1
			},
			login(){
				if(this.username!=''&&this.password!=''){
					postLogin(qs.stringify({
							username:this.username,
							password:this.password
						})
					)
					.then(res => {
						// 请求成功
						console.log(res)
						if(res.status==200){
							this.$store.state.user=res.user
							this.modalLogin=false
							this.$message.success('登录成功了!');
						}else if(res.status==400){
							this.$message.warning(res.message);
						}
					})
					.catch(error => {
						this.$message.error(error)
					})
				}else{
					this.$message.warning('账号或密码没有输入哦~');
				}
			},
			logout(){
				this.$store.state.user=''
			},
			register(){
				if(this.registerUsername.length<3){
					this.$message.warning('用户名长度不能小于3，要三个字或数字字母以上才可');
				}else if(this.registerPassword.length<6){
					this.$message.error('密码长度不能小于6');
				}else if(this.registerPassword!=this.registerPasswordSec){
					this.$message.warning('两次输入的密码不一样鸭~');
				}else{
					postRegister(qs.stringify({
							username:this.registerUsername,
							password:this.registerPassword
						})
					)
					.then(res => {
						if(res.code==200){
							this.$message.success('注册成功~');//直接登录
							this.username=this.registerUsername
							this.password=this.registerPassword
							this.registerUsername=''
							this.registerPassword=''
							this.btnState = 'tab1'
							this.logBtn=false
						}else if(res.code==400){
							this.$message.error('用户名和密码不能为空');
						}else if(res.code==401){
							this.$message.error('用户名长度不能小于3');
						}else if(res.code==402){
							this.$message.error('密码长度不能小于6');
						}else if(res.code==409){
							this.$message.waring('账号已被注册啦');
						}else if(res.code==444){
							this.$message.error('注册失败！');
						}
					})
					.catch(error => {
						this.$message.error(error)
					})
				}
			},
			//监听登录输入username和password变化而改变登录按钮的状态
			changeUsername(){
				if(this.username!=''&&this.password!=''){
					this.logBtn=false
				}else{
					this.logBtn=true
				}
			},
			changePassword(){
				if(this.username!=''&&this.password!=''){
					this.logBtn=false
				}else{
					this.logBtn=true
				}
			},
			//监听注册输入username和password变化而改变注册按钮的状态
			changeRegisterUsername(){
				if(this.registerUsername!=''&&this.registerPassword!=''&&this.registerPasswordSec!=''){
					this.regBtn=false
				}else{
					this.regBtn=true
				}
			},
			changeRegisterPassword(){
				if(this.registerUsername!=''&&this.registerPassword!=''&&this.registerPasswordSec!=''){
					this.regBtn=false
				}else{
					this.regBtn=true
				}
			},
			changeRegisterPasswordSec(){
				if(this.registerUsername!=''&&this.registerPassword!=''&&this.registerPasswordSec!=''){
					this.regBtn=false
				}else{
					this.regBtn=true
				}
			},
		}
    }
</script>

<style>
	/* logo */
	.logo{
		width: 200px;
		height: 50px;
	}

	/* login */
	.login{
		font-size: 20px;
	}

	/* 弹窗 */
	.modalHeader{
		background-color: #FFFFFF;
	}
	.modalMiddle{
		padding: 0px 40px 0px 40px;
	}
	
	/* 登录&注册 */
	#components-form-demo-normal-login .login-form {
		max-width: 300px;
	}
	#components-form-demo-normal-login .login-form-forgot {
		float: right;
	}
	#components-form-demo-normal-login .login-form-button {
		width: 100%;
	}
</style>
