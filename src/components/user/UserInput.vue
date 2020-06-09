<template>
  <div class="container user__wrapper d-flex justify-content-center align-items-center">
    <b-card-group deck>
      <b-card header="Registro">
        <b-card-body>
          <b-form @submit.prevent="sendData()">
            <!-- username -->
            <b-form-group label="Nombre" label-for="username">
              <b-form-input
                v-model="username"
                type="text"
                required="required"
                placeholder="Ingresa tu nombre"
                @keyup="onInputUsername()"
              ></b-form-input>
            </b-form-group>

            <!-- password -->
            <b-form-group label="Contraseña" label-for="password" v-if="adminAccess">
              <b-form-input
                v-model="password"
                type="password"
                required="required"
                placeholder="Contraseña"
                @keyup="onInputPassword()"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" v-if="username" @click="sendData()">Ingresar</b-button>
          </b-form>
        </b-card-body>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { EventBus } from '../../event-bus'

export default {
  data () {
    return {
      username: null,
      password: null,
      adminAccess: false,
      isAdmin: false
    }
  },

  methods: {
    sendData () {
      EventBus.$emit('on-get-user', { name: this.username, isAdmin: this.isAdmin })
    },

    onInputUsername () {
      this.adminAccess = (this.username === 'wenargente')
    },

    onInputPassword () {
      this.isAdmin = this.adminAccess ? (this.password === 'master') : false
    }
  }
}
</script>
