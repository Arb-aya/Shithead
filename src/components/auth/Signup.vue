<script>
export default {
  name: "ShitheadSignup",
};
</script>

<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/supabase";

const router = useRouter();

const email = ref();
const password = ref();
const confirmPassword = ref();

const emailEl = ref(null);
const passwordEl = ref(null);
const confirmPasswordEl = ref(null);

const errors = ref([]);
const EMAIL_REQ = "Email address required";
const PASSWORD_REQ = "Password required";
const MIN_PASSWORD_LENGTH = "Password must be at least 6 characters long";
const CONFIRM_PASSWORD_REQ = "Confirm password is required";
const PASSWORDS_MATCH = "Passwords must match";

const createToast = inject("createToast");

const addError = (error) => {
  if (!errors.value.includes(error)) errors.value.push(error);
};

const removeError = (error) => {
  const index = errors.value.findIndex((el) => el === error);
  if (index > -1) errors.value.splice(index, 1);
};

const validateInput = () => {
  // EMAIL VALIDATION
  if (!email.value) {
    emailEl.value.classList.add("required");
    addError(EMAIL_REQ);
  } else {
    emailEl.value.classList.remove("required");
    removeError(EMAIL_REQ);
  }

  // PASSWORD VALIDATION
  if (!password.value) {
    passwordEl.value.classList.add("required");
    addError(PASSWORD_REQ);
  } else {
    removeError(PASSWORD_REQ);

    if (password.value.length >= 6) {
      passwordEl.value.classList.remove("required");
      removeError(MIN_PASSWORD_LENGTH);
    } else {
      addError(MIN_PASSWORD_LENGTH);
    }
  }

  //CONFIRM PASSWORD VALIDATION
  if (!confirmPassword.value) {
    confirmPasswordEl.value.classList.add("required");
    addError(CONFIRM_PASSWORD_REQ);
  } else {
    confirmPasswordEl.value.classList.remove("required");
    removeError(CONFIRM_PASSWORD_REQ);
  }

  if (password.value && confirmPassword.value) {
    if (password.value !== confirmPassword.value) {
      passwordEl.value.classList.add("required");
      confirmPasswordEl.value.classList.add("required");
      addError(PASSWORDS_MATCH);
    } else {
      passwordEl.value.classList.remove("required");
      confirmPasswordEl.value.classList.remove("required");
      removeError(PASSWORDS_MATCH);
    }
  }

  return errors.value.length === 0;
};

const handleSignup = async () => {
  if (validateInput()) {
    const { user, session, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      createToast("error", "Could not sign up");
    }

    if (user) {
      createToast("success", "Signed up");
      router.push({ name: "login" });
    }
  }
};
</script>

<template>
  <div class="row">
    <div class="col-8 offset-2">
      <form class="signup-form">
        <!-- email -->
        <input
          v-model="email"
          type="email"
          ref="emailEl"
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

        <!-- PASSWORD -->
        <input
          v-model="confirmPassword"
          ref="confirmPasswordEl"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          aria-label="Confirm Password"
          class="form-control"
          required
        />
        <!-- ./PASSWORD -->
        <button
          type="button"
          class="btn btn-dark"
          @click.prevent="handleSignup"
        >
          Sign up
        </button>

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
.signup-form {
  padding: 2rem;
  border: 1px solid black;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .form-control {
    &.required {
      border-color: $error;
    }
  }

  button {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
}
</style>
