<template>
    <div class="list-wrapper">
        <transition name="fade">
            <ul class="list-container" v-if="show">
                <li v-for="item in tagContents" :key="item.objectId">
                    <router-link :to="{ name: 'article', params: {id: item.objectId} }">
                        <p class="list-title" v-text="item.title"></p>
                        <p class="list-updated" v-text="item.createdAt"></p>
                        <p class="list-abstract" v-text="item.abstract"></p>
                    </router-link>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: true
            }
        },
        computed: {
            tagContents () {
                return this.$store.state.tagContentList.tagContentList
            },
            tagId () {
                return this.$store.state.tagContentList.tagId
            },
            tags () {
                return this.$store.state.tags.tagList
            }
        },
        watch: {
            'tagContents': function(val, oldVal) {
                this.show = false
                setTimeout(() => {
                    this.show = true
                }, 400)
            },
            'tags': function (val, oldVal) {
                if (val) {
                    this.$store.dispatch('getTagContentList', val[0].objectId)
                }
            }
        }
    }
</script>

<style lang="scss">
    .list-wrapper {
        width: 80%;
        margin: 0 auto;
        @media screen and (max-width: 768px) {
            width: 100%;
        }
        .list-container {
            li {
                border-bottom: 1px solid #eee;
                list-style: none;
                a {
                    padding: 1rem 1.5rem;
                    border-radius: .5rem;
                    display: block;
                    transition: all .3s;
                    margin: 0;
                    &:hover {
                        background-color: Rgba(0, 0, 0, .02);
                    }
                }
                .list-title {
                    font-size: 2.2rem;
                    font-weight: 400;
                    color: #404040;
                    margin-top: 0;
                }
                .list-abstract {
                    font-size: 1.4rem;
                    color: #919191;
                    font-weight: 300;
                }
                .list-updated {
                    font-family: "Comic Sans MS", curslve, sans-serif;
                    font-size: 1.4rem;
                    color: #8b8b8b;
                    padding: 5px 0;
                }
            }
        }
    }
</style>