<template>
  <ScrollArea class="w-full h-full">
    <draggable
      class="nowrap flex flex-row gap-5 w-full items-start list"
      ghost-class="ghost-board"
      drag-class="dragging-board"
      :scroll-sensitivity="500"
      :force-fallback="true"
      :list="columns"
      group="columns"
      @start="drag = true"
      @end="drag = false"
      handle=".handle"
      item-key="id"
    >
      <template #item="{ element }">
        <div>
          <BoardColumn :key="element.id" :column="element" />
        </div>
      </template>
      <template #footer>
        <div class="flex bg-card shadow rounded-2xl p-4 w-[400px]">
          <Input
            type="text"
            v-model="columnInput"
            placeholder="New Column Name"
            @keydown.enter="
              addBoardColumn(board.id, columnInput, () => {
                columnInput = ''
                loadColumns()
              })
            "
          />
        </div>
      </template>
    </draggable>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
</template>
<script setup lang="ts">
import { BoardColumn } from '@/components/board'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import type { Board, Column } from '@/lib/types'
import { onMounted, ref } from 'vue'
import { Input } from '@/components/ui/input'
import draggable from 'vuedraggable'
import { useBoard } from '@/lib/composables'

const { board } = defineProps<{
  board: Board
}>()

const { addBoardColumn, getBoardColumns } = useBoard()

const columns = ref<Column[]>()

const columnInput = ref<string>('')

const drag = ref(false)

function loadColumns() {
  columns.value = getBoardColumns(board.id)
}

onMounted(() => {
  loadColumns()
})
</script>

<style>
.ghost-board > div {
  @apply opacity-50;
}
.ghost-board > div > div {
  @apply invisible;
}

.dragging-board {
  @apply shadow-2xl transform rotate-2 cursor-grabbing;
}

.list .sortable-chosen {
  overflow: hidden;
  opacity: 1 !important;
}
</style>
