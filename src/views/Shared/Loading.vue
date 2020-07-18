<template>
  <div>
    <div
      v-if="!this.$store.state.errorFatal"
      class="vh-100
            d-flex
            flex-column
            justify-content-center
            align-items-center
            bg-dark text-light"
    >
      <b-spinner
        style="width: 3rem; height: 3rem;"
        label="Large Spinner"
        class="mb-4"
      />
      <strong>Cargando...</strong>
      <strong>{{ this.$store.state.currentTask }}</strong>
    </div>
    <div
      v-else
      class="vh-100
            d-flex
            flex-column
            justify-content-center
            align-items-center
            bg-danger text-white"
    >
      <div class="rounded p-2 bg-dark">
        <h1 class="text-white text-center">Error fatal</h1>
        <h3
          class="h6
                text-white
                text-monospace
                font-weight-bold"
        >
          {{ this.$store.state.errorFatalEvent }}
        </h3>
        <h3
          class="h6
                text-white
                text-monospace
                font-weight-bold"
        >
          {{ this.$store.state.errorFatalDescription }}
        </h3>
      </div>
    </div>
  </div>
</template>
