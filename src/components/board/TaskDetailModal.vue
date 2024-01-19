<template>
  <Dialog v-model:open="open">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Task Details</DialogTitle>
      </DialogHeader>

      <form class="w-full space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel>Task Title</FormLabel>
            <FormControl>
              <Textarea
                autogrow
                class="py-2 h-[43px] px-3 resize-none overflow-hidden block"
                v-bind="componentField"
              ></Textarea>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                autogrow
                class="py-2 px-3 min-h-[100px] resize-none overflow-hidden block"
                v-bind="componentField"
              ></Textarea>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <DialogFooter>
          <Button variant="secondary"> Cancel </Button>
          <Button type="submit"> Save </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { Button } from '@/components/ui'
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useBoard } from '@/lib/composables'
import { Textarea } from '@/components/ui/textarea'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

// TODO: implement dynamic modal opening and task details modal

const { editBoardColumnTask, selectedTask, currentForm, setSelectedTask } = useBoard()

const open = ref(false)

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(3).max(256),
    description: z.string().max(256).optional(),
  }),
)

const { handleSubmit, setFieldValue, resetForm } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(({ title, description }) => {
  if (!selectedTask.value) return

  editBoardColumnTask(selectedTask.value?.columnId as string, selectedTask.value.id, {
    ...selectedTask.value,
    title,
    description: description ?? '',
  })

  open.value = false
  setTimeout(() => {
    resetForm()
  }, 50)
})

watch(
  () => selectedTask.value,
  () => {
    if (selectedTask.value?.id && currentForm.value === 'task-details') {
      setFieldValue('title', selectedTask.value.title)
      setFieldValue('description', selectedTask.value.description)
      open.value = true
    }
  },
)

watch(
  () => open.value,
  () => {
    if (!open.value) {
      setSelectedTask()
    }
  },
)
</script>
