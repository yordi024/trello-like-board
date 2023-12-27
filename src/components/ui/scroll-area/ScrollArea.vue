<script setup lang="ts">
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from 'radix-vue'
import ScrollBar from './ScrollBar.vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<ScrollAreaRootProps & { class?: string; viewPortClass?: string }>(),
  {
    class: '',
    orientation: 'vertical',
    viewPortClass: '',
  },
)
</script>

<template>
  <ScrollAreaRoot :type="type" :class="cn('relative overflow-hidden', props.class)">
    <!-- <div
      data-radix-scroll-area-viewport
      :class="cn('h-full w-full rounded-[inherit]', props.viewPortClass)"
    >
    </div> -->
    <ScrollAreaViewport :class="cn('h-full w-full rounded-[inherit]', props.viewPortClass)">
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
