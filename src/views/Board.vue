<template>
  <section class="h-full flex flex-col overflow-hidden" v-if="activeBoard">
    <h3 class="text-white font-semibold text-xl mb-5">{{ activeBoard.title }}</h3>
    <Board :board="activeBoard" />
  </section>
</template>
<script setup lang="ts">
import { Board } from '@/components/board'
import { useBoard } from '@/lib/composables'
import { onMounted, ref, watch } from 'vue'
import type { Board as BoardType, Color } from '@/lib/types'
import { useRoute } from 'vue-router'

const route = useRoute()

const { getBoardById } = useBoard()

const activeBoard = ref<BoardType>()

const allColors: Color[] = ['rose', 'blue', 'green', 'orange', 'red', 'gray', 'yellow', 'violet']

watch(
  () => activeBoard.value?.color,
  (color) => {
    document.documentElement.classList.remove(...allColors.map((color) => `theme-${color}`))
    document.documentElement.classList.add(`theme-${color}`)
  },
)

onMounted(() => {
  activeBoard.value = getBoardById(route.params.boardId as string)

  document.documentElement.classList.add(`theme-${activeBoard.value?.color}`)

  const $content = document.querySelector('.content')

  $content?.classList.add('bg-primary')
})
</script>

<style lang="css"></style>
