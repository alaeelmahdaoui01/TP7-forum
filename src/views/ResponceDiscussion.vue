
<template>
  <div v-if="reply && authorName" class="thread-reply">
    <div v-if="isEditing">
      <textarea v-model="editedMessage" class="reply-input" />
      <button @click="submitEdit" class="reply-button">Save</button>
      <button @click="cancelEdit" class="reply-button">Cancel</button>
    </div>
    <div v-else>
      <p>{{ reply.message }}</p>
      <p class="reply-info">
        Reply by
        <router-link :to="'/profile/' + reply.author">{{ authorName }}</router-link>
      </p>
      <button
        v-if="reply.author === currentUserId"
        @click="isEditing = true"
        class="edit-button"
      >
        Edit
      </button>
      <button
        v-if="reply.author === currentUserId"
        @click="deleteReply"
        class="delete-button"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { getUserById } from '@/Firebase/Authentification/getUser';

export default {
  name: 'ThreadReply',
  props: {
    reply: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    currentUserId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      authorName: '',
      isEditing: false,
      editedMessage: ''
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
    deleteReply() {
      this.$emit('delete-reply', this.index);
    },
    submitEdit() {
      const trimmed = this.editedMessage.trim();
      if (trimmed && trimmed !== this.reply.message) {
        this.$emit('edit-reply', {
          index: this.index,
          newContent: trimmed
        });
      }
      this.isEditing = false;
    },
    cancelEdit() {
      this.isEditing = false;
    }
  },
  watch: {
    isEditing(newVal) {
      if (newVal) {
        this.editedMessage = this.reply.message;
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
.edit-button {
  background-color: #f0ad4e;
  color: white;
  margin-right: 10px;
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
