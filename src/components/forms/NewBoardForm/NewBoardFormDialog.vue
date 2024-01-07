<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button class="ms-5" size="xs" variant="secondary">Add Board</Button></DialogTrigger
    >
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add new Board</DialogTitle>
        <DialogDescription> Setup your board initial configuration. </DialogDescription>
      </DialogHeader>
      <form class="w-full space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel>Board Title</FormLabel>
            <FormControl>
              <Input
                class="border border-input"
                type="text"
                placeholder="Enter board title"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription> You won't be able to change this later. </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="color">
          <FormItem class="space-y-1.5">
            <FormLabel>Accent Color</FormLabel>
            <div class="grid grid-cols-3 gap-2 py-1.5">
              <Button
                v-for="(color, index) in Object.keys(colors)"
                :key="index"
                variant="outline"
                class="h-8 justify-start px-3"
                :class="color === componentField.modelValue ? 'border-foreground border-2' : ''"
                @click="setFieldValue('color', color)"
              >
                <span
                  class="h-5 w-5 rounded-full flex items-center justify-center"
                  :style="{ backgroundColor: colors[color] }"
                >
                  <Check v-if="color === componentField.modelValue" class="h-3 w-3 text-white" />
                </span>
                <span class="ml-2 text-xs capitalize">
                  {{ color }}
                </span>
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter> <Button type="submit">Save Board</Button></DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Check } from 'lucide-vue-next'
import type { ColorObj } from '@/lib/types'
import { useBoard } from '@/lib/composables'
import { ref } from 'vue'

const { addNewBoard } = useBoard()

const colors: ColorObj = {
  gray: '#374151',
  rose: '#be123c',
  blue: '#1d4ed8',
  green: '#15803d',
  orange: '#c2410c',
  red: '#b91c1c',
  yellow: '#eab308',
  violet: '#6d28d9',
}

const open = ref(false)

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(3).max(50),
    color: z.string().min(3).max(50),
  }),
)

const { handleSubmit, setFieldValue, resetForm } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(({ title, color }) => {
  addNewBoard({
    title,
    color,
  })
  open.value = false
  resetForm()
})
</script>
