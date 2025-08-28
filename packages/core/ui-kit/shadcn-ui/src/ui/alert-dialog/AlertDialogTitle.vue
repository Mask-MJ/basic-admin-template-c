<script setup lang="ts">
import type { AlertDialogTitleProps } from 'radix-vue';

import { computed } from 'vue';

import { cn } from '@saas-core/shared/utils';

import { AlertDialogTitle, useForwardProps } from 'radix-vue';

const props = defineProps<AlertDialogTitleProps & { class?: any }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <AlertDialogTitle
    v-bind="forwardedProps"
    :class="
      cn('text-lg leading-none font-semibold tracking-tight', props.class)
    "
  >
    <slot></slot>
  </AlertDialogTitle>
</template>
