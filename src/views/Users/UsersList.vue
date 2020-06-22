<template>
  <div>
    <b-container class="pt-4">
      <h2>Administración de usuarios</h2>
    </b-container>

    <b-container class="pt-3">
      <div>
        <b-table
          table-variant="dark"
          striped
          responsive
          hover
          bordered
          :fields="fields"
          :items="this.$store.state.users.users"
        ></b-table>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('users/bindUsers')
  },

  data: () => ({
    fields: [
      {
        key: 'email',
        label: 'Email',
        sortable: false
      },
      {
        key: 'nickname',
        label: 'Nombre de usuario',
        sortable: true
      },
      {
        key: 'fullname',
        label: 'Nombre completo',
        sortable: true
      }
    ]
  })
}
</script>
