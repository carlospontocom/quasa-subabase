<template>
  <section id="login">
    <div class="login-content">
      <h1 class="title">acesso ao sistema</h1>
      <q-form class="q-pa-md flex column q-gutter-lg" @submit="handleLogin">
        <q-input 
          type="email" 
          placeholder="E-mail" 
          v-model="email" 
          outlined 
          required
        />
        <q-input 
          type="password" 
          placeholder="Password" 
          v-model="password" 
          outlined 
          required
        />
        <q-btn 
          label="entrar" 
          color="primary" 
          type="submit" 
          :loading="loading"
        />

        <q-btn 
          label="nada" 
          to="/Nada"
        />
      </q-form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useUsuario } from '@/composable/useUsuario';

const { email, password, loading, handleLogin } = useUsuario();
</script>

<style scoped>
#login {
  padding: 20px;
}
.login-content {
  border-radius: 5px;
  box-shadow: 0 0 10px #00000050;
  padding: 2rem .5rem;
  margin: 2rem auto;
  width: 100%;
  max-width: 500px;
}

.title {
  text-transform: capitalize;
  text-align: center;
  margin: 2rem 0 0 0;
}
</style>