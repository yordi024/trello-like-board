<template>
  <header class="h-[54px] py-2 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="flex justify-between items-center">
        <Button class="px-0" as-child variant="link" size="sm">
          <RouterLink to="/"><BookText /></RouterLink>
        </Button>
        <div>
          <div id="header-action"></div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui'
import { BookText } from 'lucide-vue-next'
</script>
