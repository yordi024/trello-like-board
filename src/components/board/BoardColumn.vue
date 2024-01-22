<template>
  <div class="shadow rounded-2xl p-4 w-[450px] bg-card">
    <div class="flex items-center mb-4">
      <GripVertical class="h5 w-5 handle" />
      <h2 class="font-semibold text-lg mr-2">{{ column.title }}</h2>
      <Badge>{{ tasks?.length }} </Badge>
    </div>
    <draggable
      class="list-body space-y-4 list-reset"
      ghost-class="ghost-card"
      drag-class="dragging-card"
      :scroll-sensitivity="500"
      :force-fallback="true"
      :list="tasks"
      group="tasks"
      @start="drag = true"
      @end="drag = false"
      @sort="handleSort"
      @change="handleCardChange"
      item-key="id"
    >
      <template #item="{ element }">
        <div>
          <BoardColumnTask
            :key="element.id"
            :columnId="column.id"
            :task="element"
            @onTitleEdit="editTaskTitle"
            @onEdit="editTask"
          ></BoardColumnTask>
        </div>
      </template>
    </draggable>
    <Input
      class="mt-4"
      placeholder="+ Enter new task"
      @keyup.enter="
        addColumnTask(column.id, taskInput.trim(), () => {
          taskInput = ''
          loadTasks()
        })
      "
      v-model="taskInput"
    />
  </div>
  <teleport to="body">
    <TaskTitleForm
      v-model="openTaskTitleEditModal"
      :task="selectedTask"
      @onUpdated="taskUpdated()"
    />
    <TaskDetailForm v-model="openEditTaskModal" :task="selectedTask" @onUpdated="taskUpdated()" />
  </teleport>
</template>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import BoardColumnTask from './BoardColumnTask.vue'
import type { Column, Task } from '@/lib/types'
import { onMounted, ref } from 'vue'
import { GripVertical } from 'lucide-vue-next'
import draggable from 'vuedraggable'
import { useBoard } from '@/lib/composables'
import { TaskDetailForm, TaskTitleForm } from '@/components/forms'

const { column } = defineProps<{
  column: Column
}>()

const store = useBoard()

const { getTasksColumn, addColumnTask } = store

const tasks = ref<Task[]>()

const selectedTask = ref<Task>()

const taskInput = ref<string>('')

const drag = ref(false)

const openTaskTitleEditModal = ref(false)

const openEditTaskModal = ref(false)

function loadTasks() {
  tasks.value = getTasksColumn(column.id)
}

async function handleSort(e: any) {
  console.log({ sort: e })
}

async function handleCardChange(e: any) {
  console.log({ change: e })
}

function taskUpdated() {
  selectedTask.value = undefined
}

function editTaskTitle(task: Task) {
  selectedTask.value = task
  openTaskTitleEditModal.value = true
}

function editTask(task: Task) {
  selectedTask.value = task
  openEditTaskModal.value = true
}

onMounted(() => {
  loadTasks()
})
</script>

<style lang="css">
.handle {
  @apply cursor-grab;
}

.ghost-card {
  @apply !bg-gray-100 dark:!bg-gray-700 rounded-lg;
}
.ghost-card > div {
  @apply invisible;
}

.dragging-card {
  @apply transform rotate-2 shadow-xl !cursor-grabbing;
}
.sortable-chosen {
  opacity: 1 !important;
  cursor: grabbing;
}
</style>
