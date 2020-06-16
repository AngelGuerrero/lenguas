<template>
  <aside id="aside__wrapper" v-show="visible" :class="[mobile ? 'mobile' : 'desktop']">

    <header>
      <slot name="header"></slot>
    </header>

    <main>
      <slot></slot>
    </main>

    <footer>
      <slot name="footer"></slot>
    </footer>
  </aside>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },

    mobile: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
$aside-background: #f8f9fa

#aside__wrapper
  width: 250px
  height: 100%
  overflow-y: auto
  background-color: $aside-background

.mobile
  height: calc(100vh - 50px) !important
  position: absolute
  box-shadow: none

.desktop
  height: 100%
  box-shadow: 0px 0px 10px 6px darken($aside-background, 5)
</style>
