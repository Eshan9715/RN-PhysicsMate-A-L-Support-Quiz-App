import {db} from './firebaseConfig'
import {doc, setDoc, collection , getDocs} from 'firebase/firestore/lite'
import {Alert} from 'react-native';

export const createQuiz = (title, description) => {
 const quiz = doc(db,"Papers",title)
 const quizData = {
   title:title,
   desc:description,
 }
 setDoc(quiz,quizData).then(()=>{
    Alert.alert('Quiz created!!');

 }).catch(err => {
    console.log(err);
    Alert.alert(err.message);

  });


};

// Create new question for current quiz
export const createQuestion = (title, currentQuestionId, question, correctAnswer,optionTwo, optionThree, optionFour,imageUrl) => {

  const quest = doc(db,"Papers",title,"MCQ",currentQuestionId)
  const questionData = {
    question: question,
    correct_answer: correctAnswer,
    incorrect_answers: [optionTwo, optionThree, optionFour],
    imageUrl: imageUrl
    }
  setDoc(quest,questionData).then(()=>{
     Alert.alert('Question added!!');
 
  }).catch(err => {
     console.log(err);
     Alert.alert(err.message);
 
   });
}

// // Get All Quizzes
// export const getQuizzes = () => {
//   return firestore().collection('Quizzes').get();
// };

// // Get Quiz Details by id
// export const getQuizById = currentQuizId => {
//   return firestore().collection('Quizzes').doc(currentQuizId).get();
// };

// // Get Questions by currentQuizId
// export const getQuestionsByQuizId = currentQuizId => {
//   return firestore()
//     .collection('Quizzes')
//     .doc(currentQuizId)
//     .collection('QNA')
//     .get();
// };

