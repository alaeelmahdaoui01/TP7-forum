<template>
  <form @submit.prevent="handleLogin" class="login">
    <input type="email" required placeholder="Your email" v-model="email">
    <input type="password" required placeholder="Your password" v-model="password">
    <input type="submit" value="Login">
    <div class="error">{{ error }}</div>
  </form>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: "LoginForm",
  components: {},
  data(){
    return {
      email : "", 
      password: "",
      error:""
    }
  },
  methods :{
    handleLogin() {
      firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(()=>{
          this.$router.push("/home");
          this.error="";
          console.log(firebase.auth().currentUser.uid);
        }).catch(err => {
          if (err.code === 'auth/user-not-found') {
            this.error = "No account found with this email.";
          } else if (err.code === 'auth/wrong-password') {
            this.error = "Incorrect password.";
          } else {
            this.error = err.message;
          }
        })
    }
  }
};
</script>
  
<style scoped>

.login {
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

.login input[type="email"],
.login input[type="password"] {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

.login input[type="email"]:focus,
.login input[type="password"]:focus {
  border-color: #5c9ded;
  outline: none;
}

.login input[type="submit"] {
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #5c9ded;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login input[type="submit"]:hover {
  background-color: #407ec9;
}

.error {
  color: #d9534f;
  font-size: 0.9rem;
  text-align: center;
}
</style>

