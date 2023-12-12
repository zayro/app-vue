<script>
import { useCurrencyInput } from 'vue-currency-input'
// eslint-disable-next-line vue/require-default-prop
export default {
  name: 'CurrencyInput',
  props: {
    modelValue: Number,
    options: Object
  },
  setup (props) {
    const { inputRef } = useCurrencyInput(props.options)

    return { inputRef }
  }
}
</script>

<template>
  <input ref="inputRef" type="text" />
</template>
