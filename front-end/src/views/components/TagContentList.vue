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
        computed: Vuex.mapState({
            tagContents: state => state.tagContentList.tagContentList,
            tagId: state => state.tagContentList.tagId,
            tags: state => state.tags.tagList
        }),
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
@import '../../assets/scss/components/tagContentList.scss';
</style>