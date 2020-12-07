<template>
	<div>
		<!-- 导航栏 begin -->
		<a-row type='flex' justify='center' align='middle' style="background-color: #FFF;height: 64px;box-shadow:0px 2px 2px #EEEEEE;">
			<a-col :span='16'>
				<div style='display: flex;align-items: center;justify-content: space-between;'>
					<div style="display: flex;flex-wrap: nowrap;margin-left: 20px;align-items: center;">
						<!-- logo begin -->
							<img class="logo" src="../assets/logo.png"/>
						<!-- logo end -->
						<a-menu v-model="current" mode="horizontal">
							<a-menu-item key="home">首页</a-menu-item>
							<a-menu-item key="topic">话题</a-menu-item>
							<a-menu-item key="friend">邻岛</a-menu-item>
							<a-sub-menu>
								<span slot="title" class="submenu-title-wrapper">
								我的小岛
								</span>
								<a-menu-item key="my1">
								我的小岛
								</a-menu-item>
								<a-menu-item key="my2">
								个人设置
								</a-menu-item>
								<a-menu-item key="my3">
								我的钱包
								</a-menu-item>
							</a-sub-menu>
						</a-menu>
						<a-input-search placeholder="输入关键字" style="width: 20%px;margin-left: 20px;" @search="onSearch" />
					</div>
					<div style="display: flex;align-items: center;" v-if="isLogin==true">
						<a-icon type="camera" theme='twoTone' style='font-size: 32px;margin-right: 20px;'/>
						<span v-if="notice!=0" @click="noticeLess">
							<a-badge :count="notice"><a-avatar shape="square" icon="user"/></a-badge>
						</span>
						<span v-else @click="noticeAdd">
							<a-badge><a-avatar shape="square" icon="user"/></a-badge>
						</span>
					</div>
					<div v-else>
						<a class="login" @click="toLogin">登录</a>
						<a style="color: #9E9E9E;font-size: 20px;font-weight: 500;margin: 0px 5px 0px 5px;">|</a>
						<a class="login" @click="toRegister">注册</a>
						<!-- 登录弹窗 begin -->
						<a-modal v-model="modalLogin" :closable='true' :centered='true' :footer="null" :maskClosable='false'>
							<div class="modalHeader">
								<img style="width: 200px;" src="../assets/logo.png" />
							</div>
							<div class="modalMiddle">
								<a-tabs defaultActiveKey='1' :activeKey='btnState' @tabClick='tabChange'>
									<a-tab-pane key="tab1" tab="登录">
										<a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit">
											<a-form-item>
												<a-input v-decorator="['userName',{ rules: [{ required: true, message: '请输入你的账号' }] }]" placeholder="请输入你的账号">
													<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
												</a-input>
											</a-form-item>
											<a-form-item>
												<a-input v-decorator="['password',{ rules: [{ required: true, message: '请输入你的密码' }] },]" type="password" placeholder="请输入你的密码">
													<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
												</a-input>
											</a-form-item>
											<a-form-item>
												<a-checkbox v-decorator="['remember',{valuePropName: 'checked',initialValue: true,},]">
												Remember me
												</a-checkbox>
												<a class="login-form-forgot" href="">
												Forgot password
												</a>
												<a-button type="primary" html-type="submit" class="login-form-button" @click='login'>
												Log in
												</a-button>
											</a-form-item>
										</a-form>
									</a-tab-pane>
									<a-tab-pane key="tab2" tab="注册" force-render>
										1111111111
									</a-tab-pane>
								</a-tabs>
							</div>
						</a-modal>
						<!-- 登录弹窗 end -->
					</div>
				</div>
			</a-col>
		</a-row>
		<!-- 导航栏 end -->
	</div>
</template>

<script>
	// import {mapState, mapGetters,mapMutations} from 'vuex'//定位store
	export default{
		data(){
			return{
				modalLogin: false,//登录弹窗
				isLogin:false,//登录状态
				btnState:'',//判断点击登录还是注册
				notice:0//通知数
			}
		},
		beforeCreate() {
			this.form = this.$form.createForm(this, { name: 'normal_login' });
		},
		props: {//参数传递需要在props里面声明
			'current': {
				type: String,
				default: ''
			},
		},
		// computed: {
		// 	...mapState(['isLogin'])
		// }
		methods: {
			//事件传递需要通过$emit来传递，参数refresh要与父组件@后面的属性相对应
			// refresh(){
			// 	this.$emit('refresh');
			// }
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
			handleSubmit(e) {//表单验证
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if (!err) {
						console.log('Received values of form: ', values);
					}
				});
			},
			login(){
				//测试用，后续不会这也么暴力用的...
				this.$store.state.isLogin=true
				this.isLogin=this.$store.state.isLogin
				this.modalLogin=false
				// console.log(this.isLogin,this.$store.state.isLogin)
			}
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
		display: flex;
		justify-content: center;
	}
	.modalMiddle{
		padding: 0px 40px 0px 40px;
	}
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
