<script>
export default {
  name: "ShitheadLogin",
};
</script>

<script setup>
import { ref } from "vue";
// import { supabase } from "../../supabase";
// const loading = ref(false);

const email = ref();
const password = ref();

const emailEl = ref(null);
const passwordEl = ref(null);

const errors = ref([]);
const EMAIL_REQ = "Email address required";
const PASSWORD_REQ = "Password required";

const handleLogin = async () => {
  if (!email.value) {
    emailEl.value.classList.add("required");
    if (!errors.value.includes(EMAIL_REQ)) errors.value.push(EMAIL_REQ);
  } else {
    emailEl.value.classList.remove("required");
    const index = errors.value.findIndex((el) => el === EMAIL_REQ);
    if (index > -1) errors.value.splice(index, 1);
  }

  if (!password.value) {
    passwordEl.value.classList.add("required");
    if (!errors.value.includes(PASSWORD_REQ)) errors.value.push(PASSWORD_REQ);
  } else {
    passwordEl.value.classList.remove("required");
    const index = errors.value.findIndex((el) => el === PASSWORD_REQ);
    if (index > -1) errors.value.splice(index, 1);
  }
};
</script>

<template>
  <div class="row">
    <div class="col-8 offset-2">
      <form class="login-form">
        <!-- email -->
        <input
          v-model="email"
          ref="emailEl"
          type="email"
          id="email"
          name="email"
          placeholder="email"
          aria-label="email"
          class="form-control"
          required
        />
        <!-- ./email -->

        <!-- PASSWORD -->
        <input
          v-model="password"
          ref="passwordEl"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          aria-label="password"
          class="form-control"
          required
        />
        <!-- ./PASSWORD -->
        <button type="button" class="btn btn-dark" @click.prevent="handleLogin">
          Login
        </button>

        <div class="form-text">
          Don't have an account?
          <router-link to="/signup"> Sign up here</router-link>
        </div>

        <ul class="errors">
          <li v-for="error in errors" :key="error">
            {{ error }}
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 2rem;
  border: 1px solid black;
  border-radius: 15px;

  .form-control {
    &.required {
      border-color: $error;
    }

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
