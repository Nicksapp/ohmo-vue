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
                <li v-for="(tag, index) in tags" :key="tag.objectId">
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
    import { mapState } from 'vuex'
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
        computed: mapState({
            tags: state => state.tags.tagList
        }),
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
@import '../assets/scss/tags.scss';
</style>