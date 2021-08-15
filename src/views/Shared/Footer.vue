<template>
  <footer class="dev page-footer dark">
    <div class="footer-copyright text-center py-3">
      Made by
      <a href="http://angelguerrero.vercel.app" target="_blank" class="link">
        Angel Guerrero
      </a>
      with
      <img
        class="img-responsive"
        width="20"
        src="@/assets/heart.png"
        alt="heart"
      />
    </div>
  </footer>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/_variables.sass'
.page-footer
  background: #3494E6
  background: $footer-bg
  color: $enfasis
  border: 1px solid pink
  font-size: 12px

.link
  color: pink
</style>
