import type {
  BaseFormComponentType,
  ExtendedFormApi,
  SaasFormProps,
} from './types';

import { defineComponent, h, isReactive, onBeforeUnmount, watch } from 'vue';

import { useStore } from '@saas-core/shared/store';

import { FormApi } from './form-api';
import SaasUseForm from './saas-use-form.vue';

export function useSaasForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: SaasFormProps<T>) {
  const IS_REACTIVE = isReactive(options);
  const api = new FormApi(options);
  const extendedApi: ExtendedFormApi = api as never;
  extendedApi.useStore = (selector) => {
    return useStore(api.store, selector);
  };

  const Form = defineComponent(
    (props: SaasFormProps, { attrs, slots }) => {
      onBeforeUnmount(() => {
        api.unmount();
      });
      api.setState({ ...props, ...attrs });
      return () =>
        h(SaasUseForm, { ...props, ...attrs, formApi: extendedApi }, slots);
    },
    {
      name: 'SaasUseForm',
      inheritAttrs: false,
    },
  );
  // Add reactivity support
  if (IS_REACTIVE) {
    watch(
      () => options.schema,
      () => {
        api.setState({ schema: options.schema });
      },
      { immediate: true },
    );
  }

  return [Form, extendedApi] as const;
}
