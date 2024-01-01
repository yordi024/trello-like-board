<script setup lang="ts">
import { ref } from 'vue'
import { isClient } from '@vueuse/shared'
import { useDraggable } from '@vueuse/core'

const el = ref<HTMLElement | null>(null)

const innerWidth = isClient ? window.innerWidth : 200

const { x, y, style } = useDraggable(el, {
  initialValue: { x: innerWidth / 4.2, y: 80 },
  preventDefault: true,
})
</script>

<template>
  <div class="">
    <p class="italic op50 text-center">Check the floating boxes</p>
    <div
      ref="el"
      p="x-4 y-2"
      class="p-3 rounded-lg bg-background shadow fixed bg-$vp-c-bg select-none cursor-move z-24"
      :style="style"
    >
      👋 Drag me!
      <div class="text-sm opacity-50">I am at {{ Math.round(x) }}, {{ Math.round(y) }}</div>
    </div>
  </div>
</template>
