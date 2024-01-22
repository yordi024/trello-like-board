<template>
  <Dialog v-model:open="open">
    <VisuallyHidden>
      <DialogTitle></DialogTitle>
    </VisuallyHidden>
    <DialogContentTask class="bg-transparent border-none shadow-none" :style="modalStyle">
      <Textarea
        autogrow
        class="py-2 px-3 resize-none overflow-hidden block"
        :style="{ height: modalStyle?.height }"
        v-model="taskTitle"
        @keydown.enter="saveNewTitle()"
      ></Textarea>
      <DialogClose class="text-left">
        <Button @click="saveNewTitle()" size="sm" class="mt-3 w-[100px]"> Save </Button>
      </DialogClose>
    </DialogContentTask>
  </Dialog>
</template>

<script setup lang="ts">
import { VisuallyHidden } from 'radix-vue'
import { ref, watch } from 'vue'
import { Button } from '@/components/ui'
import { Dialog, DialogClose, DialogContentTask, DialogTitle } from '@/components/ui/dialog'
import { useBoard } from '@/lib/composables'
import { Textarea } from '@/components/ui/textarea'
import type { Task } from '@/lib/types'

const open = defineModel<boolean>()

const { task } = defineProps<{
  task?: Task
}>()

const emits = defineEmits(['onUpdated'])

const { updateColumnTask, modalStyle, setModalStyle } = useBoard()

const taskTitle = ref()

watch(
  () => open.value,
  () => {
    if (!open.value) {
      return setModalStyle({})
    }

    taskTitle.value = task?.title
  },
)

function saveNewTitle() {
  if (!taskTitle.value || !task) return

  updateColumnTask({
    ...task,
    title: taskTitle.value.trim(),
  })

  emits('onUpdated')

  open.value = false
}
</script>

<style></style>
