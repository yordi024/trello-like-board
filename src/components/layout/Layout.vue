<template>
  <main class="main">
    <div class="content">
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style lang="css">
.main {
  @apply h-screen overflow-auto;
}
.content {
  @apply p-4 h-full;
}
</style>
