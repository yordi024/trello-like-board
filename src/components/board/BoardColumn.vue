<template>
  <!-- <Drop @drop="onElementDrop">
    <Drag
      :data-transfer="{
        type: 'column',
        fromColumnIndex: index,
      }"
    > -->
  <div class="column bg-slate-300">
    <div class="flex items-center mb-4">
      <h2 class="font-semibold text-lg mr-2">{{ column.title }}</h2>
      <Badge>{{ column.tasks.length }} </Badge>
      <pre>index: {{ index }}</pre>
    </div>
    <div class="space-y-4 list-reset">
      <BoardColumnTask
        v-for="(task, taskIndex) in column.tasks"
        :index="taskIndex"
        :columnIndex="index"
        :key="task.id"
        :columnId="column.id"
        :task="task"
      ></BoardColumnTask>
    </div>
    <Input class="mt-4" placeholder="+ Enter new task" @keyup.enter="addTask" v-model="taskInput" />
    <span>{{ inputError }}</span>
  </div>
  <!-- </Drag>
  </Drop> -->
</template>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import BoardColumnTask from './BoardColumnTask.vue'
import type { Column } from '@/lib/types'
import { ref } from 'vue'
import { useBoardStore } from '@/stores/board'
import { Drag, Drop } from '@/components/draggable'
import { useDraggable } from '@/lib/composables'

const props = defineProps<{
  index: number
  column: Column
}>()

const store = useBoardStore()

const { addBoardColumnTask } = store

const taskInput = ref<string>('')

const inputError = ref('')

const { onElementDrop } = useDraggable(props)

function addTask() {
  if (!taskInput.value.trim()) {
    return
  }

  addBoardColumnTask(props.column.id, {
    id: 'task-' + new Date().getTime(),
    title: taskInput.value.trim(),
    description: '',
    createdAt: new Date().toISOString(),
  })
  taskInput.value = ''
}
</script>

<style scoped lang="css">
.column {
  @apply bg-gray-50 shadow rounded-2xl p-4 w-[450px];
}
</style>
