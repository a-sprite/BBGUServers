<template>
  <div id="app" style="background-color: #f6f6f6;">
   <div id="header">
      <Header></Header>
    </div>
	<router-view></router-view>
	<!-- 页面留存 -->
<!-- 	<keep-alive >
	  <router-view v-if="$route.meta.keepAlive"></router-view>
	</keep-alive> -->
	
	<!-- 返回顶部 begin -->
	<a-back-top>
		<div class="ant-back-top-inner">
			<a-icon style='font-size: 36px;' type="vertical-align-top" />
		</div>
	</a-back-top>
	<!-- 返回顶部 end -->
	<Footer></Footer>
  </div>
</template>




<script>
	import Header from '@/components/Header.vue'
	import Footer from '@/components/Footer.vue'
  
	export default {
		name: 'Home',
		components: {
			Header,
			Footer
		}
	}
</script>





<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

	/* 返回顶部 */
	.ant-back-top-inner {
		height: 40px;
		width: 40px;
		line-height: 40px;
		border-radius: 4px;
		background-color: #1088e9;
		color: #fff;
		text-align: center;
		font-size: 20px;
	}
</style>
