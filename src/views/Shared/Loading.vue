<template>
  <div
    class="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-light"
  >
    <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" class="mb-4" />
    <strong>Cargando...</strong>
    <strong>{{ this.$store.state.currentTask }}</strong>
  </div>
</template>
