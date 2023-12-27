<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useEmitAsProps,
} from 'radix-vue'
import { X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<DialogContentProps & { class?: string; id?: string; style: any }>()
const emits = defineEmits<DialogContentEmits>()
const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 bg-background/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />

    <DialogContent
      aria-describedby="undefined"
      ref="dialog"
      :class="cn('fixed z-50 grid border bg-background shadow-lg  rounded-lg ', props.class)"
      v-bind="{ ...props, ...emitsAsProps }"
    >
      <slot />

      <DialogClose
        class="absolute top-3 right-3 p-0.5 transition-colors rounded-md hover:bg-secondary"
      >
        <X class="w-4 h-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
