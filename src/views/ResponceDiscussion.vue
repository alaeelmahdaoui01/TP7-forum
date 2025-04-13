<template>
  <div v-if="reply && authorName" class="thread-reply">
    <p>{{ reply.message }}</p>
    <p class="reply-info">
      Reply by <router-link :to="'/profile/' + reply.author">{{ authorName }}</router-link>
    </p>
    <button
      v-if="reply.author === currentUserId"
      @click="deleteReply(reply.id)"
      class="delete-button"
    >
      Delete Reply
    </button>
  </div>
</template>

<script>
import { getUserById, getUser } from '@/Firebase/Authentification/getUser';
import { deleteResponse } from '@/Firebase/firestore/delete';

export default {
  name: 'ThreadReply',
  props: {
    reply: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      authorName: '',
      currentUserId: getUser()?.uid
    };
  },
  async created() {
    if (this.reply && this.reply.author) {
      try {
        const name = await this.getuser(this.reply.author);
        this.authorName = name;
      } catch (error) {
        console.error('Error fetching author name:', error);
      }
    }
  },
  methods: {
    async getuser(id) {
      const user = await getUserById(id);
      return user.displayName;
    },
    async deleteReply(replyId) {
      try {
        const threadId = this.$route.params.id;
        await deleteResponse(threadId, replyId);
        window.location.reload(); // Refresh to reflect deleted reply
      } catch (error) {
        alert('Failed to delete reply');
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.thread-reply {
  border-left: 3px solid #007bff;
  padding-left: 10px;
  margin-bottom: 15px;
}

.reply-info {
  font-size: 12px;
  color: #888;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
