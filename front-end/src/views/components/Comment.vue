<template>
    <div class="comment">
        <h1>评论</h1>
        <ul class="comments-list">
            <li class="comment-item" v-for="item in CommentsList">
                <div class="item-title">
                    <span class="title-name" v-text="item.name"></span>
                    <span class="title-createdAt" v-text="item.createdAt"></span>
                </div>
                <!--评论回复-->
                <div v-if="item.reply" class="item-reply">
                    <div class="item-title">
                        <span class="title-name" v-text="item.reply.name"></span>
                        <span class="title-createdAt" v-text="item.reply.createdAt"></span>
                    </div>
                    <p class="item-content" v-text="item.reply.content"></p>
                </div>
    
                <p class="item-content" v-text="item.content"></p>
                <div class="comment-reply">
                    <a href="javascript:void(0)" @click="reply(item.objectId, item.name)" class="reply">回复</a>
                </div>
            </li>
        </ul>
        <!--回复输入栏-->
        <a id="firstAnchor"></a>
        <h1 id="comment-form-title">回复 {{replyName}}</h1>
        <div class="comment-form">
            <input class="form-name" v-model="formName" type="text" placeholder="你的昵称？" maxlength="20" />
            <textarea class="form-content" v-model="formContent" cols="30" rows="10" placeholder="欢迎发表你的评论-……-"></textarea>
            <div class="comment-reply">
                <a @click="submit()" class="reply reply-submit">提交</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formName: '',
                formContent: '',
                formReply: '',
                replyName: '',
                articleId: this.$route.params.id
            }
        },
        created() {
            this.$store.dispatch('getCommentsList', this.articleId)
        },
        computed: {
            CommentsList() {
                return [].slice.call(this.$store.state.commentsList.commentsList).map((item, index, arr) => {
                    if (item.reply) {
                        const replyToId = item.reply
                        let obj = {}
                        let reply = arr.find(data => data.objectId === replyToId)
                        obj.objectId = item.objectId
                        obj.name = item.name
                        obj.createdAt = item.createdAt
                        obj.content = item.content
                        obj.reply = reply
    
                        return obj
                    }
                    return item
                })
            }
        },
        methods: {
            submit() {
                if (!this.formName.trim() || !this.formContent.trim()) {
                    window.alert('昵称和内容不可为空')
                    return
                }
                const replyData = {
                    "name": this.formName,
                    "content": this.formContent,
                    "reply": this.formReply,
                    "articleId": this.articleId
                }
                console.log(replyData)
                this.$store.dispatch('submitComment', replyData)
                // this.formName = ''
                this.formContent = ''
                this.replyName = ''
                this.formReply = ''
                this.$store.dispatch('getCommentsList', this.articleId)
            },
            reply(replyToId, replyToName) {
                this.replyName = replyToName
                
                var anchor = this.$el.querySelector('#firstAnchor')
                document.body.scrollTop = anchor.offsetTop

                this.formReply = replyToId
            }
        }
    }
</script>

<style lang="scss">
    .comment {
        h1 {
            border-bottom: 1px dashed #d2d2d2;
            margin: 1rem;
            font-size: 2rem;
        }
        .comment-item {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: center;
            font-size: 1rem;
            .item-title {
                display: flex;
                justify-content: space-between;
                background-color: #f7f7f7;
                padding: .5rem 1rem;
                border-radius: .5rem;
                .title-name {
                    font-weight: bold;
                }
            }
            .item-content {
                padding: 1rem;
            }
            .item-reply {
                border: 1px solid #d2d2d2;
                border-radius: .5rem;
                margin: 1rem 1rem .5rem;
                color: #7c7c7c;
                .item-title {
                    background-color: #fbfbfb;
                }
            }
            .comment-reply {
                display: flex;
                justify-content: flex-end;
                .reply {
                    color: #333;
                    padding: 1rem;
                    transition: all .4s;
                }
                &:hover {
                    color: #838383;
                    cursor: pointer;
                }
            }
        }
        .comment-form {
            display: flex;
            flex-direction: column;
            padding: 1rem;
            .form-name,
            .form-content {
                border: 1px solid #d2d2d2;
                margin-bottom: 1rem;
                padding: 1rem;
                font-size: 1.2rem;
                border-radius: .5rem;
            }
            .form-name {
                height: 1rem;
            }
            .form-content {
                resize: none;
            }
            .comment-reply {
                display: flex;
                justify-content: flex-end;
                .reply-submit {
                    border: 1px solid #d2d2d2;
                    border-radius: .5rem;
                    padding: .6rem 1rem;
                    transition: all .4s;
                    font-size: 1.1rem;
                    &:hover {
                        background: #838383;
                        color: #fff;
                        border-color: #838383;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>