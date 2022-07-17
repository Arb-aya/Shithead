<script>
export default {
  name: "ShitheadLogin",
};
</script>

<script setup>
import { ref, inject } from "vue";
import { supabase } from "@/supabase";

const email = ref();
const password = ref();

const emailEl = ref(null);
const passwordEl = ref(null);

const errors = ref([]);
const EMAIL_REQ = "Email address required";
const PASSWORD_REQ = "Password required";

const createToast = inject("createToast");

const addError = (error) => {
  if (!errors.value.includes(error)) errors.value.push(error);
};

const removeError = (error) => {
  const index = errors.value.findIndex((el) => el === error);
  if (index > -1) errors.value.splice(index, 1);
};

const validateInput = () => {
  if (!email.value) {
    addError(EMAIL_REQ);
  } else {
    emailEl.value.classList.remove("required");
    removeError(EMAIL_REQ);
  }

  if (!password.value) {
    passwordEl.value.classList.add("required");
    addError(PASSWORD_REQ);
  } else {
    passwordEl.value.classList.remove("required");
    removeError(PASSWORD_REQ);
  }

  return errors.value.length === 0;
};

const handleLogin = async () => {
  if (validateInput()) {
    const { user, error } = await supabase.auth.signIn({
      email: email.value,
      password: password.value,
    });

    if (error) {
      createToast("error", "Could not log in");
      console.log(error);
    }
  }
};
</script>

<template>
  <div class="row">
    <div class="col-8 offset-2">
      <form class="login-form">
        <!-- EMAIL -->
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
        <!-- ./EMAIL -->

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
