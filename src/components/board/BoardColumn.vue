<template>
  <div class="column bg-slate-300">
    <div class="flex items-center mb-4">
      <GripVertical class="h5 w-5 handle" />
      <h2 class="font-semibold text-lg mr-2">{{ column.title }}</h2>
      <Badge>{{ column.tasks.length }} </Badge>
    </div>
    <draggable
      class="space-y-4 list-reset"
      :list="column.tasks"
      group="tasks"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
    >
      <template #item="{ element }">
        <BoardColumnTask :key="element.id" :columnId="column.id" :task="element"></BoardColumnTask>
      </template>
    </draggable>
    <Input class="mt-4" placeholder="+ Enter new task" @keyup.enter="addTask" v-model="taskInput" />
    <span>{{ inputError }}</span>
  </div>
</template>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import BoardColumnTask from './BoardColumnTask.vue'
import type { Column } from '@/lib/types'
import { ref } from 'vue'
import { useBoardStore } from '@/stores/board'
import { GripVertical } from 'lucide-vue-next'
import draggable from 'vuedraggable'

const props = defineProps<{
  column: Column
}>()

const store = useBoardStore()

const { addBoardColumnTask } = store

const taskInput = ref<string>('')

const inputError = ref('')

const drag = ref(false)

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

.handle {
  @apply cursor-grab;
}
</style>
