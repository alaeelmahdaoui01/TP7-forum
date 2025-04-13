import { projectFirestore } from '@/Firebase/Config';

// Delete a response from a thread by its index
const deleteResponse = async (threadId, index) => {
  try {
    const threadRef = projectFirestore.collection('threads').doc(threadId);
    const threadDoc = await threadRef.get();

    if (!threadDoc.exists) {
      throw new Error('Thread does not exist');
    }

    const threadData = threadDoc.data();
    const answers = Array.isArray(threadData.answers) ? threadData.answers : [];

    // ✅ Remove the element at the specified index
    answers.splice(index, 1);

    // ✅ Update Firestore with the new array
    await threadRef.update({ answers });

    console.log('Response deleted');
  } catch (error) {
    console.error('Error deleting response:', error);
    throw error;
  }
};

export { deleteResponse };
