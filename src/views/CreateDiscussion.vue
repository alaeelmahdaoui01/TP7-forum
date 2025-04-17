<template>
  <div class="my-create-thread">
    <h1 class="my-create-thread-title">Share Your Ideas</h1>
    <form @submit.prevent="add" class="my-thread-form">
      <div class="form-group">
        <label for="my-title" class="form-label">Thread Title:</label>
        <input type="text" id="my-title" v-model="title" class="form-input">
      </div>
      <div class="form-group">
        <label for="my-content" class="form-label">Thread Content:</label>
        <textarea id="my-content" v-model="content" class="form-textarea"></textarea>
      </div>
      <div class="form-group">
        <label for="my-tags" class="form-label">Tags (separated by space):</label>
        <input type="text" id="my-tags" v-model="tags" class="form-input">
      </div>

      <!-- Error Message -->
      <p v-if="error" class="error-message">{{ error }}</p>

      <button type="submit" class="my-submit-button">Join the Discussion</button>
    </form>
    <div class="blur-circle"></div>
  </div>
</template>

<script>
import { addNewThread } from '@/Firebase/firestore/addDisc';
import { getUser } from '@/Firebase/Authentification/getUser';

export default {
  name: 'MyCreateThread',
  data() {
    return {
      title: '',
      content: '',
      tags: '',
      error:''
    };
  },
  methods: {
    add() {
      if (!this.title.trim() || !this.content.trim() || !this.tags.trim()) {
        this.error = 'Please fill in all fields before submitting.';
        return;
      }

      this.error = '';

      const uid = getUser().uid;
      const tagsArray = this.tags.trim().split(' ');
      const data = {
        title: this.title,
        content: this.content,
        tags: tagsArray
      };
      addNewThread(uid, data); 
      this.$router.push({ path: '/dashboard' });
    }
  }
};
</script>

<style scoped>
.my-create-thread {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1e1e2f;
  color: white;
  padding: 2rem;
  overflow: hidden;
}

.my-create-thread-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(to right, rgba(253, 114, 158, 0.6), rgba(253, 114, 158, 0.3));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.my-thread-form {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 700px;
  z-index: 1;
}

.form-group {
  margin-bottom: 1.8rem;
  margin-left: -20px;
  padding-right : 10px
}

.form-label {
  font-size: 1.1rem;
  display: block;
  margin-bottom: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  font-size: 1rem;
  color: white;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  border-color: rgba(253, 114, 158, 0.6);
  outline: none;
  box-shadow: 0 0 0 3px rgba(253, 114, 158, 0.2);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-textarea {
  min-height: 180px;
  resize: vertical;
}

.my-submit-button {
  background: linear-gradient(135deg, rgba(253, 114, 158, 0.8), rgba(189, 28, 60, 0.8));
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(253, 114, 158, 0.3);
}

.my-submit-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(253, 114, 158, 0.4);
  background: linear-gradient(135deg, rgba(253, 114, 158, 0.9), rgba(189, 28, 60, 0.9));
}

.blur-circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(253, 114, 158, 0.2), transparent 70%);
  filter: blur(100px);
  top: 20%;
  left: 10%;
  z-index: 0;
  animation: float 15s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(30px, 30px);
  }
}

@media (max-width: 768px) {
  .my-create-thread {
    padding: 1.5rem;
  }
  
  .my-create-thread-title {
    font-size: 2rem;
  }
  
  .my-thread-form {
    padding: 2rem;
  }
  
  .blur-circle {
    width: 300px;
    height: 300px;
    filter: blur(60px);
  }
}

.error-message {
  color: #ff5e5e;
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}
</style>