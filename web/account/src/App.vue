<template>
  <div id="app">
    <div>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
  header {
    height: 45px;
    background: #ececea;
    border-bottom: 1px solid #ddd;
  }

  .header {
    width: 100%;
    text-align: center;
    color: #4e4a49;
    font-size: 1em;
    height: 45px;
    line-height: 45px;
    position: relative;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
