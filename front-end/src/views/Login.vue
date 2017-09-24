<template>
    <div class="main-container">
        <div class="formWrap">
            <h1>OhMo</h1>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="ruleForm.username" auto-complete="off" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" auto-complete="off" style="width: 200px;"></el-input>
                </el-form-item>
            
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" @keyup.enter="submitForm('ruleForm')" style="width: 200px;">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import router from '../router'
    export default {
        data() {
            var checkUserName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error("用户名不可为空！"))
                } else {
                    callback();
                }
            }
            var checkPassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error("密码不可为空！"))
                } else {
                    callback();
                }
            }
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {validator: checkUserName, trigger: 'blur'}
                    ],
                    password: [
                        {validator: checkPassword, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(vaild => {
                    if (vaild) {
                        this.$store.dispatch('loginUser', this.ruleForm)

                        setTimeout(() => {
                            let isLogin = this.$store.state.user.isLogin
                            if (isLogin) {
                                sessionStorage.setItem('username', this.$store.state.user.username)
                                this.ruleForm.password = ''
                                router.push('/')
                                this.$message({
                                    message: '登录成功!',
                                    type: 'success'
                                });
                            } else {
                                this.$message({
                                    message: '用户名或密码错误！',
                                    type: 'warning'
                                });
                                return false;
                            }
                        }, 400)
                        
                    } else {
                        console.log('err')
                        return false;
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/login.scss';
</style>
