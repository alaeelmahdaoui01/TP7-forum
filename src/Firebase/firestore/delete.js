import { projectFirestore } from '@/Firebase/Config';

// Delete a thread by ID
const deleteThread = async (threadId) => {
  try {
    await projectFirestore.collection('discussions').doc(threadId).delete();
    console.log('Thread deleted');
  } catch (error) {
    console.error('Error deleting thread:', error);
    throw error;
  }
};

// Delete a response from a thread
const deleteResponse = async (threadId, responseId) => {
  try {
    const threadRef = projectFirestore.collection('discussions').doc(threadId);
    const threadDoc = await threadRef.get();

    if (!threadDoc.exists) {
      throw new Error('Thread does not exist');
    }

    const threadData = threadDoc.data();

    // Ensure answers exist and are an array
    const answers = Array.isArray(threadData.answers) ? threadData.answers : [];

    // Filter out the reply by ID
    const updatedAnswers = answers.filter(reply => reply.id !== responseId);

    // Update the thread with the filtered array
    await threadRef.update({ answers: updatedAnswers });

    console.log('Response deleted');
  } catch (error) {
    console.error('Error deleting response:', error);
    throw error;
  }
};

export { deleteThread, deleteResponse };
