/**
* @auther: 一瓶雪碧
* @date: 2020/12/1
* @desciption:  图片预览弹窗
*/

/*	
	1.弹窗显示时禁止页面滚动条滚动
*/
<template>
	<!-- 弹窗 begin -->
	<div class="modal flex justify-center align-center flex-column" @click.self='change' v-if="isOpen==true">
		<img style="Height: auto;height: 200px;max-Height: 100%;max-height: 100%;" :style="{height:imgHeight+ 'px'}" :src="imgUrl" />
		<div style="position: absolute;bottom: 30px;width: 300px; text-align: center;">
			<div class="flex flex-column align-center" style="width: 100%;">
				<div>
					<!-- <a-icon @click.stop="enlarge" style='font-size:40px;margin-top: 20px;color: #FFFFFF;' type="fullscreen" />
					<a-icon @click='change' style='font-size:40px;margin-top: 20px;color: #FFFFFF;' type="close-circle" />
					<a-icon @click.stop="narrow" style='font-size:40px;margin-top: 20px;color: #FFFFFF;' type="fullscreen-exit" /> -->
				</div>
				<a-slider :min="400" :max="700" :tooltipVisible="false" :value='imgHeight' style='width: 200px;margin-top: 20px;' @change="changeSize"/>
			</div>
		</div>
	</div>
	<!-- 弹窗 end -->
</template>

<script>
    export default {
        name: "Modal",
        data(){
            return{
				imgHeight:400
            }
        },
		beforeCreate() {
		},
		props: {//参数传递需要在props里面声明
			'isOpen': {
				type: Boolean,
				default: ''
			},
			'imgUrl':{
				type:String,
				default:''
			}
		},
		mounted(){
            
		},
		methods: {
			//事件传递需要通过$emit来传递，参数refresh要与父组件@后面的属性相对应
			change(){
				this.$emit('changeModal');
			},
			// 页面滚动距顶部距离判断滚笼向上向下
			enlarge(){
				if(this.imgHeight<700){
					this.imgHeight+=50
					// console.log(this.imgHeight)
				}
			},
			narrow(){
				if(this.imgHeight>100){
					this.imgHeight-=50
				}
			},
			changeSize(value){
				this.imgHeight=value
				// console.log(value)
			}
		}
    }
</script>

<style>
	/* 弹窗 */
	.modal{
		position: fixed;
		Height: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,0.3);
		z-index:10;
	}
</style>
