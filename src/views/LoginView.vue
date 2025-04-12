<template>
  <div class="tout">
  <div class="welcome container d-flex flex-column justify-content-center align-items-center min-vh-100">
    <div class="form-container">
      <h2 v-if="resetp">Reset Password</h2>
      <h2 v-else-if="showLogin">Login</h2>
      <h2 v-else>Sign up</h2>
      
      <div v-if="resetp">
        <ForgotPassword @reset="returntologin" />
      </div>
      <div v-else-if="showLogin">
        <LoginForm @login="enterForum" />
        <p>No account yet? <span @click="showLogin = false">Signup</span> instead.</p>
        <p>Forgot Password? <span @click="resetp = true">Reset Password</span></p>
      </div>
      <div v-else>
        <SignupForm @signup="returntologin" />
        <p>Already registered? <span @click="showLogin = true">Login</span> instead.</p>
      </div>
    </div>
  </div>
  <div class="auth-side-content">
      <h1>Welcome Back!</h1><br><br>
      <p>Join us and explore a world of possibilities.</p>
      <p>Your journey starts here.</p>
      
  </div>
</div>
</template>

<script>
import SignupForm from '../components/SignupForm.vue';
import LoginForm from '../components/LoginForm.vue';
import ForgotPassword from '../components/ForgotPassword.vue';

export default {
  components: { SignupForm, LoginForm, ForgotPassword },
  data() {
    return {
      showLogin: true, // Default to login view
      resetp: false,
    };
  },
  methods: {
    enterForum() {
      this.$router.push('/home');
    },
    returntologin() {
      this.resetp = false; // Reset the reset password flag
      this.showLogin = true; // Show the login form
    },
  },
};
</script>



  <style scoped>

  h1{
    color : #407ec9;
  }

  #app {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: rgb(245, 66, 101);
    background-image: linear-gradient(to bottom right, rgb(11, 9, 9) 0%, rgb(179, 55, 80) 100%);
    background-size: cover;
  }
  
  .welcome {
    text-align: center;
    font-size: 125%;
    height: 100%;
    justify-content: center;
    background-size: cover;
    width : 1000px;
  }
  
  .form-container {
    width: 80%;
    max-width: 600px;
    background-color: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    color: #000;
    margin-bottom: 20px;
  }
  
  p {
    color: #000;
  }
  
  span {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
  .tout{
    display: flex; 
    flex-direction : row;
    gap : 10px
  }

  .auth-side-content{
    width : 300px ;
    margin-top : 200px;
    margin-left: -150px
  }

  </style>
  