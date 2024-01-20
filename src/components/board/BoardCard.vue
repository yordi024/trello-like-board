<template>
  <div class="shadow rounded-lg relative overflow-hidden max-w-[450px]">
    <div class="h-36 w-full relative z-[1]" :style="{ backgroundColor: colors[board.color] }">
      <!-- <img
        src="https://pixabay.com/get/gb7de7866f4658751341a05febe68e53cbdfe75b7a163e35e9379f3e98db4be5a82a716c85036a2cff8b0135927bd6f453f0f3cd1730771279f938fabfa98daf8_1280.jpg"
        alt="image"
        class="h-full w-full absolute object-cover z-[1]"
      /> -->
      <div class="absolute w-full h-full z-[2] bg-gradient-to-b from-black/25 to-transparent"></div>
    </div>
    <div class="flex items-center gap-2 absolute left-0 z-10 top-0 py-2 px-4">
      <RouterLink
        :to="{
          name: 'board',
          params: {
            boardId: board.id,
          },
        }"
        class="block font-semibold text-white"
        >{{ board.title }}</RouterLink
      >
      <Button variant="ghost" size="xs" class="text-white px-0"><Settings class="h-5" /></Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui'
import type { Board } from '@/lib/types'
import { Settings } from 'lucide-vue-next'
import { colors } from '@/lib/constants'

const { board } = defineProps<{
  board: Board
}>()
</script>
