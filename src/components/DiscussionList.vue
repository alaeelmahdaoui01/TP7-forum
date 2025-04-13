<template>
  <div class="threads-container">
    <div class="thread-column" v-for="(column, index) in columns" :key="index">
      <div v-for="item in column" :key="item.id" class="thread-item">
        <h1 class="thread-title">{{ item.title }}</h1>
        <p class="thread-author">By {{ item.authorName }}</p>
        <router-link :to="'/discussion/' + item.id" class="view-link">
          <button class="view-button">Open Discussion</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserById } from '@/Firebase/Authentification/getUser';

export default {
  props: ["threads"],
  data() {
    return {
      threadsWithUsernames: []
    };
  },
  async created() {
    this.threadsWithUsernames = await this.getThreadsWithUsernames(this.threads);
  },
  computed: {
    columns() {
      const threadsCopy = [...this.threadsWithUsernames];
      const columns = [[], [], []];
      threadsCopy.forEach((thread, index) => {
        columns[index % 3].push(thread);
      });
      return columns;
    }
  },
  methods: {
    async getuser(id) {
      const user = await getUserById(id);
      return user.displayName;
    },
    
    async getThreadsWithUsernames(threads) {
      const threadsWithUsernames = await Promise.all(
        threads.map(async (thread) => {
          const authorName = await this.getuser(thread.author);
          return { ...thread, authorName };
        })
      );
      return threadsWithUsernames;
    }
  }
}
</script>

<style scoped>
/*
 .threads-container {
    display: flex;
    justify-content: space-around;
    padding: 20px;
    background-color: #fafafa; 
  }
  
  .thread-column {
    width: 30%; }
  
  .thread-item {
    background-color: #ffffff; 
    border: 1px solid #dbdbdb; 
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 15px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out; 
    height: 200px;
    width: 400px;
    margin-right: 10px
  }
  
  .thread-item:hover {
    transform: scale(1.02); 
  }
  
  .thread-title {
    font-size: 20px; 
    font-weight: bold;
    color: #333; 
    margin-bottom: 5px; 
  }
  
  .thread-author {
    font-size: 14px; 
    color: #888; 
    margin-bottom: 30px; 
  }
  
  .view-link {
    text-decoration: none; 
    display: flex;
    justify-content: center;
  }
  
  .view-button {
    background-color: rgb(245, 66, 101);
    color: #fff;
    border: none;
    padding: 8px 15px; 
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }
  
  .view-button:hover {
    background-color: rgb(189, 28, 60);
  }*/


.threads-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
}

.thread-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0; 
}

.thread-item {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.thread-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.thread-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.thread-author {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
}

.view-link {
  display: inline-block;
  width: 100%;
}

.view-button {
  background: linear-gradient(135deg, #580415 0%, #6d0921 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 10px;
  width: 100%;
  transition: all 0.3s ease;
}

.view-button:hover {
  background: linear-gradient(135deg, #75293b 0%, #6d2436 100%);
  box-shadow: 0 4px 15px rgba(255, 45, 95, 0.3);
}


@media (max-width: 768px) {
  .threads-container {
    flex-direction: column;
    gap: 15px;
  }
  
  .thread-column {
    gap: 15px;
  }
  
  .thread-item {
    padding: 15px;
  }
  
  .thread-title {
    font-size: 1.1rem;
  }
}
</style>