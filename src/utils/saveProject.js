import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

export const saveProject = async (html, userId) => {
  try {
    await addDoc(collection(db, 'projects'), {
      userId,
      html,
      createdAt: new Date(),
    });
    alert('Project saved!');
  } catch (err) {
    console.error('Error saving project:', err);
  }
};
