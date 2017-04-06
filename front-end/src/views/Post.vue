<template lang="html">
  <div class="my-post">
    <form class="my-form">
      表单
      <section class="form-item">
        <!-- <label for="title">标题</label> -->
        <input type="text" name="title" placeholder="Name">
      </section>
      <section class="form-item">
        <!-- <label for="author">作者</label> -->
        <input type="text" name="author" placeholder="Auhor">
      </section>
      <section class="form-item">
        <!-- <label for="content">内容</label> -->
        <textarea name="content" rows="5" cols="18" placeholder="Content"></textarea>
      </section>
      <button type="button" onsubmit="" name="button">提交</button>
    </form>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .my-post {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .my-form {
      display: inline-block;
      width: 300px;
      border: 1px solid #eee;
      input, textarea {
        width: 200px;

      }
    }
  }
</style>
