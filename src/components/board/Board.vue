<template>
  <ScrollArea class="w-full h-full">
    <div class="nowrap flex flex-row p-5 gap-5 w-full items-start">
      <BoardColumn
        v-for="(column, index) in board.columns"
        :index="index"
        :key="column.id"
        :column="column"
      />

      <div class="flex bg-gray-50 shadow rounded-2xl p-4 w-[400px]">
        <Input
          type="text"
          v-model="columnInput"
          placeholder="New Column Name"
          @keydown.enter="addColumn"
        />
      </div>
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
</template>
<script setup lang="ts">
import { BoardColumn } from '@/components/board'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import type { Board } from '@/lib/types'
import { useBoardStore } from '@/stores/board'
import { ref } from 'vue'
import { Input } from '@/components/ui/input'

defineProps<{
  board: Board
}>()

const store = useBoardStore()

const { addBoardColumn } = store

const columnInput = ref<string>('')

function addColumn() {
  if (!columnInput.value.trim()) return

  addBoardColumn({
    id: 'column-' + new Date().getTime(),
    title: columnInput.value.trim(),
    tasks: [],
  })
  columnInput.value = ''
}
</script>
