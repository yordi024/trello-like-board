<template>
  <Header />
  <main class="main">
    <div class="content">
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
import Header from './Header.vue'
</script>

<style lang="css">
.main {
  @apply h-[calc(100vh-54px)] overflow-auto;
}
.content {
  @apply mx-auto w-full h-full;
}
</style>
