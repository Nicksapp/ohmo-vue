<template>
    <footer>
      <div class="pagination">
          <router-link :to="{name: 'Index'}" class="new-post">
              <span>←</span> Newer Post 
          </router-link>
          <span class="page-number">
              Page 1 of 2
          </span>
          <router-link :to="{name: 'Index'}" class="older-post">
              Older Post <span>→</span>
          </router-link>
      </div>
    
      <div class="footer-info">
        <span><strong>Ohmo</strong> © 2017</span>
        <span>Proudly Made By <strong>Nickj</strong></span>
      </div>
    </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  footer {
    .pagination {
        position: relative;
        width: 80%;
        max-width: 710px;
        margin: 0 auto 4rem;
        font-family: "Open Sans", sans-serif;
        font-size: 1rem;
        color: #9EABB3;
        text-align: center;
        .page-number {
            display: inline-block;
            padding: 2px 0;
            min-width: 100px;
            line-height: 2rem;
        }
        .older-post {
            color: #9EABB3;
            transition: all .3s ease;
            right: 0;
        }
        .new-post {
            color: #9EABB3;
            transition: all .3s ease;
            left: 0; 
        }
        .older-post, .new-post {
            position: absolute;
            display: inline-block;
            padding: 6px 15px;
            border: #bfc8cd 1px solid;
            border-radius: 4px;
            &:hover {
                color: #889093;
                border-color: #98a0a4;
            }
        }
    }
    .footer-info {
      margin-top: 8rem;
      font-size: .75em;
      color: #BBC7CC;
      display: flex;
      justify-content: space-between;
      padding: 1em 15px;
    }
  }
</style>