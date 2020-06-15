<template>
  <div class="pt-3" fluid>
    <h1>Admin panel</h1>

    <pre>{{ users }}</pre>

    <b-card-group class="mt-3 mb-3" v-for="user in users" :key="user.id">
      <b-card :header="user.name">
        <p
          class="mt-2"
          :class="user.isOnline ? 'text-success' : 'text-danger'"
        >Usuario {{ user.isOnline ? 'conectado' : 'desconectado' }}</p>

        <!-- Show the answers -->
        <b-list-group>
          <!-- If has anwers -->
          <div v-if="user.answers">
            <b-list-group-item
              v-for="answer in user.answers"
              :key="answer.id"
              class="d-flex justify-content-between align-items-center"
            >
              Lengua: {{ answer.module }}
              <div>
                <b-badge variant="danger" pill class="ml-2">Errores {{ answer.errors }}</b-badge>
                <b-badge
                  variant="danger"
                  pill
                  class="ml-2"
                  v-for="unmatch in answer.unmatched"
                  :key="unmatch"
                >{{ unmatch }}</b-badge>
                <b-badge variant="success" pill class="ml-2">Aciertos {{ answer.success }}</b-badge>
                <b-badge
                  variant="success"
                  pill
                  class="ml-2"
                  v-for="match in answer.matched"
                  :key="match"
                >{{ match }}</b-badge>
              </div>
            </b-list-group-item>
          </div>
        </b-list-group>

        <!-- Show details -->
        <b-list-group>
          <!-- If has anwers -->
          <div v-if="user.answers">
            <b-container v-for="answer in user.answers" :key="answer.id">
              <div>
                <p class="mt-2">
                  Lengua: {{ answer.module }}
                  <b-badge variant="success" pill class="ml-2">Aciertos {{ answer.success }}</b-badge>
                  <b-badge variant="danger" pill class="ml-2">Errores {{ answer.errors }}</b-badge>
                </p>
              </div>
              <div>
                <b-list-group-item
                  variant="danger"
                  class="ml-2"
                  v-for="unmatch in answer.unmatched"
                  :key="unmatch"
                >{{ unmatch }}</b-list-group-item>

                <b-list-group-item
                  variant="success"
                  class="ml-2"
                  v-for="match in answer.matched"
                  :key="match"
                >{{ match }}</b-list-group-item>
              </div>
            </b-container>
          </div>
        </b-list-group>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'

//
// CONST
const usersx = 'users'

export default {
  computed: {
    ...mapState(usersx, ['users'])
  }
}
</script>
