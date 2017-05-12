<template>
    <div>
        <vHeader headline="标签"/>
        <div class="tag-list">
            <ul>
                <li v-for="(tag, index) in tags">
                    <a @click="update(index, tag.tagName, tag.objectId)" 
                       :class="{'tag-list-active' : index === selected}">
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
            }
        },
        data () {
            return {
                selected: 0
            }
        },
        created () {
            this.$store.dispatch('getTags')
        },
        computed: {
            tags () {
                return this.$store.state.tags.tagList
            }
        },
        methods: {
            update (index, tagName, tagId) {
                this.selected = index
                this.$store.dispatch('getTagContentList', tagId)
            }
        }
    }
</script>

<style lang="scss">
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