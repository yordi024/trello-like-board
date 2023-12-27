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
      <Button class="ms-5" size="xs" variant="secondary" @click="addNewBoard">Add Board</Button>
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
import { Button } from '@/components/ui'
import { Board } from '@/components/board'
import { useBoard } from '@/lib/composables'
import { onMounted, ref } from 'vue'

const { boards, activeBoard, setActiveBoard, addNewBoard } = useBoard()

const currentBoard = ref('')

onMounted(() => {
  currentBoard.value = activeBoard.value?.id || ''
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
