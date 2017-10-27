<template>
    <footer>
        <Pagination />
        <CopyRight />
    </footer>
</template>

<script>
import Pagination from './Pagination'
import CopyRight from './CopyRight'
export default {
    components: {
        Pagination,
        CopyRight
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/components/footer.scss';
</style>