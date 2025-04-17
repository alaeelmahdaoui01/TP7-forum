<template>
  <div class="padding-container">
    <div v-if="user" class="profile-container">
      <div class="profile-header">
        <h1>Profile</h1>
        <p>Name: <span class="profile-detail">{{ user.displayName }}</span></p>
        <p>Email: <span class="profile-detail">{{ user.email }}</span></p>
        <p>Creation Time: <span class="profile-detail">{{ formattedDate(user.createdAt) }}</span></p>
      </div>

      <div class="threads-section">
        <h2>Shared Discussions:</h2>
        <ListThread v-if="threads.length > 0" :threads="threads" />
        <div v-else>No discussions yet!</div>
      </div>

      <div class="update-profile">
        <button @click="toggleUpdateForm" class="update-button">Update Profile</button>

        <div v-if="showUpdateForm" class="update-form">
          <div class="form-group">
            <label for="name" class="form-label">Name:</label>
            <input type="text" id="name" v-model.trim="updatedName" class="form-input">
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Email:</label>
            <input type="email" id="email" v-model.trim="updatedEmail" class="form-input">
          </div>

          <button @click="updateProfile" class="update-button">Update</button>
        </div>
      </div>
    </div>
    <div class="blur-circle"></div>
  </div>
</template>

<script>
import ListThread from '@/components/DiscussionList.vue';
import { getUserById, updateUserProfile } from '@/Firebase/Authentification/getUser';
import { getThreadsByIds } from '@/Firebase/firestore/getDisc.js';

export default {
  name: 'ProfileView',
  components: { ListThread },
  data() {
    return {
      user: null,
      threads: [],
      updatedName: '',
      updatedEmail: '',
      showUpdateForm: false
    };
  },
  methods: {
    async updateProfile() {
  try {
    const userId = this.$route.params.id;
    await updateUserProfile(userId, {
      displayName: this.updatedName,
      email: this.updatedEmail
    });
    alert('Profile updated successfully!');
  } catch (error) {
    console.error('Error updating profile:', error.code || error.message || error);
    alert('Failed to update profile. Please try again.');
  }
},

    toggleUpdateForm() {
      this.showUpdateForm = !this.showUpdateForm;
      if (this.showUpdateForm && this.user) {
        this.updatedName = this.user.displayName || '';
        this.updatedEmail = this.user.email || '';
      }
    },
    formattedDate(date) {
      return date instanceof Date ? date.toLocaleString() : date;
    }
  },
  async created() {
    try {
      const userId = this.$route.params.id;
      this.user = await getUserById(userId);
      if (this.user) {
        if (this.user.createdAt?.toDate) {
          this.user.createdAt = this.user.createdAt.toDate();
        }

        const { posts, load } = await getThreadsByIds(this.user.threads || []);
        await load();
        this.threads = posts.value;
      } else {
        console.error('User not found.');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
};
</script>

<style scoped>
.padding-container {
  padding: 2rem;
  position: relative;
  min-height: 100vh;
  background-color: #1e1e2f;
  color: white;
  overflow: hidden;
}

.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.profile-header {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.profile-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #ffffff, #c9d6ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center;
}

.profile-detail {
  color: rgba(253, 114, 158, 0.8);
  font-weight: 500;
}

.profile-header p {
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
}

.threads-section {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.threads-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: white;
  background: linear-gradient(to right, rgba(253, 114, 158, 0.8), rgba(253, 114, 158, 0.5));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.update-profile {
  margin-top: 2rem;
  text-align: center;
}

.update-button {
  background: linear-gradient(135deg, rgba(253, 114, 158, 0.8), rgba(189, 28, 60, 0.8));
  color: white;
  border: none;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(253, 114, 158, 0.3);
}

.update-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(253, 114, 158, 0.4);
  background: linear-gradient(135deg, rgba(253, 114, 158, 0.9), rgba(189, 28, 60, 0.9));
}

.update-form {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  padding: 2rem;
  margin-top: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.875rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  border-color: rgba(253, 114, 158, 0.6);
  outline: none;
  box-shadow: 0 0 0 3px rgba(253, 114, 158, 0.2);
}

.blur-circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(253, 114, 158, 0.2), transparent 70%);
  filter: blur(100px);
  bottom: -100px;
  right: -100px;
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
  .padding-container {
    padding: 1.5rem;
  }
  
  .profile-header h1 {
    font-size: 2rem;
  }
  
  .profile-header,
  .threads-section,
  .update-form {
    padding: 1.5rem;
  }
  
  .blur-circle {
    width: 300px;
    height: 300px;
    filter: blur(60px);
  }
}
</style>