<template>
    <div>
        <vNav></vNav>
        <header class="a-header">
            <nav class="main-nav">
                <h1>{{headerName}}</h1>
            </nav>
        </header>
        <div class="tag-list">
            <ul>
                <li v-for="(tag, index) in tags">
                    <a @click="update(index, tag.tagName, tag.objectId)" :class="{'tag-list-active' : index === selected}">
                           {{tag.tagName}}
                        </a>
                </li>
            </ul>
        </div>
        <tag-content-list></tag-content-list>
    </div>
</template>

<script>
    export default {
        components: {
            TagContentList: function(resolve) {
                require(['./components/TagContentList'], resolve)
            },
            vHeader: function(resolve) {
                require(['./components/Header'], resolve)
            },
            vNav: function(resolve) {
                require(['./components/Nav'], resolve)
            }
        },
        data() {
            return {
                selected: 0,
                headerName: ''
            }
        },
        created() {
            this.$store.dispatch('getTags')
        },
        computed: {
            tags() {
                return this.$store.state.tags.tagList
            }
        },
        watch: {
            'tags': function (val) {
                if (val) {
                    this.headerName = val[0].tagName
                }
            }  
        },
        methods: {
            update(index, tagName, tagId) {
                this.selected = index
                this.headerName = tagName
                this.$store.dispatch('getTagContentList', tagId)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .a-header {
        height: 65vh;
        min-height: 180px;
        background: url(http://bannerdesign.cn/wp-content/uploads/2015/10/2015101401242887.jpeg) no-repeat 50% 100%;
        background-size: cover;
        @media screen and (max-width: 900px) {
            height: 45vh;
        }
        @media screen and (max-width: 500px) {
            height: 30vh;
        }
        .main-nav {
            display: flex;
            justify-content: center;
            align-items: center;
            height: inherit;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
            h1 {
                font-size: 3rem;
                font-weight: 400;
                color: #fff;
                font-family: "Comic Sans MS", curslve, sans-serif;
            }
        }
    }
    
    .tag-list {
        margin: 2rem auto;
        ul {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            li {
                list-style: none;
                margin: .3rem;
                @media screen and (max-width: 768px) {
                    margin: .2rem;
                }
                a {
                    display: block;
                    cursor: pointer;
                    font-size: 1.2rem;
                    padding: .3rem 1.6rem;
                    margin: 0;
                    border: 1px solid #d2d2d2;
                    border-radius: .5rem;
                    color: rgba(0, 0, 0, .8);
                    background-color: #f7f7f7;
                    transition: all .4s;
                    @media screen and (max-width: 768px) {
                        padding: .2rem .5rem;
                    }
                    &:hover {
                        background-color: #555555;
                        border-color: #555555;
                        color: #fff;
                    }
                }
            }
        }
        .tag-list-active {
            background-color: #555555;
            border-color: #555555;
            color: #fff;
        }
    }
</style>