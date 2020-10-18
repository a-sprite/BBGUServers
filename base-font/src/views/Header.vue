/**
* @auther: kid1999
* @date: 2020/10/7 23:48
* @desciption:  Header
*/
<template>
    <div>
        <a-menu v-model="current" mode="horizontal">

            <a-menu-item key="mail">BBGUServer</a-menu-item>
            <a-menu-item key="find"> <a-icon type="appstore" />失物招领</a-menu-item>
            <a-menu-item key="buy"> <a-icon type="appstore" />二手交易</a-menu-item>
            <a-menu-item key="love"> <a-icon type="github" />表白墙</a-menu-item>
            <a-menu-item key="talk"> <a-icon type="appstore" />讨论区</a-menu-item>
            <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper"
        ><a-icon type="setting" />其他</span>
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
            <a-input-search placeholder="搜索" style="width: 200px" @search="onSearch" />
            <a-menu-item>
                <Login></Login>
            </a-menu-item>
            <a-sub-menu>
                <span slot="title" class="submenu-title-wrapper">
                    <a-avatar style="backgroundColor:#87d068" icon="user" />
                </span>
                        <a-menu-item-group title="Item 1">
                            <a-menu-item key="setting:1">
                                个人资料
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
                                退出
                            </a-menu-item>
                    </a-menu-item-group>
            </a-sub-menu>

            <a-menu-item key="user">  </a-menu-item>

        </a-menu>

    </div>
</template>

<script>
    import Login from "../components/Login";
    export default {
        name: "Header",
        data(){
            return{
                current: ['mail'],
                is_login: false,
            }
        },
        components: {
           Login
        }
    }
</script>

<style scoped>

</style>