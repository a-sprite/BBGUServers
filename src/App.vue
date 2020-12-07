<template>
  <div id="app" style="background-color: #FAFAFA;">
   <div id="header">
      <Header></Header>
    </div>
	<!-- 返回顶部 begin -->
	<a-back-top>
		<div class="ant-back-top-inner">
			<a-icon style='font-size: 36px;' type="vertical-align-top" />
		</div>
	</a-back-top>
	<!-- 返回顶部 end -->
    <router-view/>
  </div>
</template>




<script>
  import Header from '@/views/Header.vue'
  
  export default {
    name: 'Home',
    components: {
      Header,
    }
  }
</script>





<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
