import type { Task } from '@/lib/types'
import { uuid } from '@/lib/utils'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  const tasks: Ref<Task[]> = ref<Task[]>([])

  function getTaskById(id: string) {
    return tasks.value.find((task) => task.id === id)
  }

  function getTasksColumn(columnId: string) {
    return tasks.value.filter((task) => task.columnId === columnId)
  }

  function addTask({ title, description, columnId }: any) {
    const task = {
      id: uuid(),
      title,
      description,
      columnId,
      order: 0,
      createdAt: new Date().toISOString(),
    }

    if (task.columnId) {
      const columnTasks = getTasksColumn(task.columnId)
      task.order = columnTasks.length + 1
    }

    tasks.value.push(task) // add the new task to the sorted array
  }

  function updateTask({ id, title, description, order }: Task): Task | undefined {
    const task = getTaskById(id)

    if (!task) return

    task.title = title
    task.description = description
    task.order = order

    return task
  }

  function deleteTask(id: string) {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  function updateTaskOrder(taskId: string, order: number) {
    const task = getTaskById(taskId)

    if (!task) return

    task.order = order
  }

  function orderTasks(tasksOrder: any) {
    for (const taskId in tasksOrder) {
      updateTaskOrder(taskId, tasksOrder[taskId] as number)
    }
  }

  return {
    getTaskById,
    getTasksColumn,
    addTask,
    updateTask,
    deleteTask,
    orderTasks,
  }
})
