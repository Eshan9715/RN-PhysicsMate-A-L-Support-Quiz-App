import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import {COLORS} from '../constants/theme';
import FormInput from '../components/shared/FormInput';
import FormButton from '../components/shared/FormButton';
import {createQuestion} from '../utils/database';
import {ref, uploadBytesResumable, getDownloadURL,putFile, uploadBytes } from "firebase/storage";
import {storage} from '../utils/firebaseConfig'
import * as ImagePicker from 'expo-image-picker';


const AddQuestionScreen = ({navigation, route}) => {
 
  const { currentQuizTitle } = route.params;

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [qid, setQid] = useState(1000);
  const [imageUrl, setImageUrl] = useState('')

  const [question, setQuestion] = useState('');
  const [select, setSelect] = useState(false);

  const [correctAnswer, setCorrectAnswer] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [optionThree, setOptionThree] = useState('');
  const [optionFour, setOptionFour] = useState('');

  
  const handleQuestionSave = async () => {
    if (
      question == '' ||  correctAnswer == '' || optionTwo == '' ||  optionThree == '' || optionFour == '') {
      return;
    }

    let currentQuestionId = setQid(qid+1);

    console.log(currentQuizTitle);

    // Upload Image

    if (image != null) {
      if(select===true){

        // Converting image to blob image
      const blobImage = await new Promise((resolve,reject)=>{
      const xhr = new XMLHttpRequest();
      xhr.onload = function(){
        resolve(xhr.response);
      };
      xhr.onerror = function(){
        reject(new TypeError('Network request failed!!'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image,true);
      xhr.send(null);
    })

    // Create file metadata including the content type
    /** @type {any} */
    const metadata = {
    contentType: 'image/jpeg',
    };

    const storageRef = ref(storage, 'paper_Ques_imgs/'+ currentQuizTitle + currentQuestionId);

    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL)
          console.log('File available at', imageUrl);
          if(downloadURL!=''){
            createQuestion(currentQuizTitle, currentQuestionId,question,correctAnswer,optionTwo, optionThree, optionFour,imageUrl)
            console.log('URL:'+ imageUrl);

          }

        });
        
      }
    );



        // Add question to db
      
        ToastAndroid.show('Question saved', ToastAndroid.SHORT);
  
        // Reset
        setQuestion('');
        setCorrectAnswer('');
        setOptionTwo('');
        setOptionThree('');
        setOptionFour('');
        setImage(null);
        setImageUrl('');
    }
  }
}


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    
    if(!result.canceled){
      console.log(result)
      setImage(result.assets[0].uri);
    }

    setSelect(true);
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <View style={{padding: 20}}>
          <Text
            style={{fontSize: 20, textAlign: 'center', color: COLORS.black}}>
            Add Question
          </Text>
          <Text style={{textAlign: 'center', marginBottom: 20}}>
            For {currentQuizTitle}
          </Text>

          <FormInput
            labelText="Question"
            placeholderText="enter question"
            onChangeText={val => setQuestion(val)}
            value={question}
          />

          {/* Image upload */}

          {image == null? (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 28,
                backgroundColor: COLORS.primary + '20',
              }}
              onPress={pickImage}>
              <Text style={{opacity: 0.5, color: COLORS.primary}}>
                + add image
              </Text>
            </TouchableOpacity>
          ) : (
            <Image
              source={{
                uri: image,
              }}
              resizeMode={'cover'}
              style={{
                width: '100%',
                height: 200,
                borderRadius: 5,
                cursor:'pointer',
              }}
            />
          )}

          {/* Options */}
          <View style={{marginTop: 30}}>
            <FormInput
              labelText="Correct Answer"
              onChangeText={val => setCorrectAnswer(val)}
              value={correctAnswer}
            />
            <FormInput
              labelText="Option 2"
              onChangeText={val => setOptionTwo(val)}
              value={optionTwo}
            />
            <FormInput
              labelText="Option 3"
              onChangeText={val => setOptionThree(val)}
              value={optionThree}
            />
            <FormInput
              labelText="Option 4"
              onChangeText={val => setOptionFour(val)}
              value={optionFour}
            />
          </View>
          <FormButton
            labelText="Save Question"
            handleOnPress={handleQuestionSave}
          />
          <FormButton
            labelText="Done & Go Home"
            isPrimary={false}
            handleOnPress={() => {
              // setCurrentQuizId('');
              navigation.navigate('HomeScreen');
            }}
            style={{
              marginVertical: 20,
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddQuestionScreen;
