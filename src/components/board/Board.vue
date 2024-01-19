<template>
  <ScrollArea class="w-full h-full">
    <draggable
      class="nowrap flex flex-row gap-5 w-full items-start"
      :list="board.columns"
      group="columns"
      @start="drag = true"
      @end="drag = false"
      handle=".handle"
      item-key="id"
    >
      <template #item="{ element }">
        <BoardColumn :key="element.id" :column="element" />
      </template>
      <template #footer>
        <div class="flex bg-gray-50 shadow rounded-2xl p-4 w-[400px]">
          <Input
            type="text"
            v-model="columnInput"
            placeholder="New Column Name"
            @keydown.enter="
              addColumn(columnInput, () => {
                columnInput = ''
              })
            "
          />
        </div>
      </template>
    </draggable>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>

  <EditTaskTitleModal />
  <TaskDetailModal />
</template>
<script setup lang="ts">
import { BoardColumn } from '@/components/board'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import type { Board } from '@/lib/types'
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import draggable from 'vuedraggable'
import { useBoard } from '@/lib/composables'
import EditTaskTitleModal from './EditTaskTitleModal.vue'
import TaskDetailModal from './TaskDetailModal.vue'

defineProps<{
  board: Board
}>()

const { addColumn } = useBoard()

const columnInput = ref<string>('')

const drag = ref(false)
</script>
