<template>
  <section
    class="p-4 sm:px-6 lg:px-8 h-full flex flex-col overflow-hidden"
    v-if="activeBoard"
    :style="{
      backgroundImage: `url(https://pixabay.com/get/gb7de7866f4658751341a05febe68e53cbdfe75b7a163e35e9379f3e98db4be5a82a716c85036a2cff8b0135927bd6f453f0f3cd1730771279f938fabfa98daf8_1280.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
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

<style></style>
