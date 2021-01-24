// 每个模块都应该有自己的接口文件去统一管理api
import { get, post } from '@/utils/request'


//公共
export const postLike = (params) => post('/someApps/wdsq/api/likeMsg.php', params);//点赞or取消
export const postDeleteMsg = (params) => post('/someApps/wdsq/api/deleteMsg.php', params);//删除动态
export const postFollowUser = (params) => post('/someApps/wdsq/api/followUser.php', params);//关注别人
export const postGetNode = (params) => post('/someApps/wdsq/api/getNode.php', params);//获取话题

//HOME
export const postGetHotMsg = (params) => post('/someApps/wdsq/api/getHotMsg.php', params);//获取热门榜单
export const postGetMsg = (params) => post('/someApps/wdsq/api/getMsg.php', params);//获取动态下一页
export const postReleaseMsg = (params) => post('/someApps/wdsq/api/releaseMsg.php', params);//发布动态

//MSG
export const postGetMsgDetails = (params) => post('/someApps/wdsq/api/getMsgDetails.php', params);//获取动态详情
export const postGetMsgLikeUser = (params) => post('/someApps/wdsq/api/getMsgLikeUser.php', params);//获取动态点赞的用户信息
export const postGetMsgComment = (params) => post('/someApps/wdsq/api/getMsgComment.php', params);//获取动态的评论
export const postSendComment = (params) => post('/someApps/wdsq/api/comment.php', params);//发表评论
export const postDeleteComment = (params) => post('/someApps/wdsq/api/deleteComment.php', params);//删除评论

//User
export const postGetUserInformation = (params) => post('/someApps/wdsq/api/getUserInformation.php', params);//获取用户信息
export const postGetUserMsg = (params) => post('/someApps/wdsq/api/getUserMsg.php', params);//获取用户动态
export const postMoreUserMsg = (params) => post('/someApps/wdsq/api/moreMsg.php', params);//获取动态下一页

//SideNav
export const postOne = (params) => post('/someApps/wdsq/api/one.php', params);//获取ONE

//Header
export const postLogin = (params) => post('/someApps/wdsq/api/login.php', params);//登录
export const postRegister = (params) => post('/someApps/wdsq/api/register.php', params);//注册