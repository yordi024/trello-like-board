<template>
  <Tabs v-model="currentBoard" class="h-full flex flex-col">
    <TabsList class="bg-transparent text-white">
      <TabsTrigger
        @click="setActiveBoard(board)"
        v-for="board in boards"
        :key="'tab-' + board.id"
        :value="board.id"
        >{{ board.title }}</TabsTrigger
      >
      <NewBoardFormDialog />
    </TabsList>
    <TabsContent
      v-for="board in boards"
      :key="board.id"
      :value="board?.id"
      class="flex-1 overflow-none"
    >
      <Board v-if="activeBoard" :board="activeBoard" />
    </TabsContent>
  </Tabs>
</template>
<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Board } from '@/components/board'
import { useBoard } from '@/lib/composables'
import { onMounted, ref, watch } from 'vue'
import { NewBoardFormDialog } from '@/components/forms'
import type { Color } from '@/lib/types'

const { boards, activeBoard, setActiveBoard } = useBoard()

const currentBoard = ref('')

const allColors: Color[] = ['rose', 'blue', 'green', 'orange', 'red', 'gray', 'yellow', 'violet']

watch(
  () => activeBoard.value?.id,
  (newValue) => {
    if (!newValue) return

    currentBoard.value = newValue
    console.log(newValue)
  },
)

watch(
  () => activeBoard.value?.color,
  (color) => {
    document.documentElement.classList.remove(...allColors.map((color) => `theme-${color}`))
    document.documentElement.classList.add(`theme-${color}`)
  },
)

onMounted(() => {
  currentBoard.value = activeBoard.value?.id || ''
  document.documentElement.classList.add(`theme-${activeBoard.value?.color}`)
})
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-700 no-underline;
}

.column {
  @apply bg-gray-100 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.task-bg {
  background: rgba(0, 0, 0, 0.5);
}
</style>
