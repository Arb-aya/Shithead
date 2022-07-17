<script>
export default {
  name: "ShitheadLogin",
};
</script>

<script setup>
// import { ref } from "vue";
// import { supabase } from "../../supabase";
// const loading = ref(false);

const handleLogin = async () => {};
</script>

<template>
  <div class="row">
    <div class="col-8 offset-2">
      <form class="login-form">
        <!-- email -->
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          aria-label="email"
          class="form-control"
        />
        <!-- ./email -->

        <!-- PASSWORD -->
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          aria-label="password"
          class="form-control"
        />
        <!-- ./PASSWORD -->
        <button type="button" class="btn btn-dark" @click.prevent="handleLogin">
          Login
        </button>

        <div class="form-text">
          Don't have an account? <a href="#" @click.stop=""> Register here</a>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.login-form {
  padding: 2rem;
  border: 1px solid black;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    &:first-of-type {
      margin-bottom: 0.3rem;
    }
  }

  button {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
}
</style>
