<template>
  <form @submit.prevent="handleSignUP" class="register">
    <h2></h2>
    <input type="text" required placeholder="Display name" v-model="displayName">
    <input type="email" required placeholder="Your email" v-model="email">
    <input type="password" required placeholder="Your password" v-model="password">
    <input type="submit" value="Sign up">
    <div class="error">{{ error }}</div>
  </form>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import db from "../Firebase/Config"

export default {
  name: "SignupForm",
  components: {},
  data(){
    return {
      displayName: "",
      email : "", 
      password: "",
      error:""
    }
  },
  methods :{
    async handleSignUP() {
  try {
    const firebaseAuth = firebase.auth();
    const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
    const result = createUser;
    
    const dataBase = db.collection("users").doc(result.user.uid);
    this.error = "";

    await dataBase.set({
      displayName: this.firstName,
      email: this.email,
    });

    this.$router.push("/home");
  } catch (err) {
    this.error = err.message; // This will show the error in your <div class="error">{{ error }}</div>
  }
}
  }
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Segoe UI', sans-serif;
}

.register h2 {
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #333;
}

.register input[type="text"],
.register input[type="email"],
.register input[type="password"] {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

.register input:focus {
  border-color: #5c9ded;
  outline: none;
}

.register input[type="submit"] {
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #5c9ded;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register input[type="submit"]:hover {
  background-color: #407ec9;
}

.error {
  color: #d9534f;
  font-size: 0.9rem;
  text-align: center;
}
</style>
