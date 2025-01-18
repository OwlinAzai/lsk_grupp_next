'use client'
import Form from 'next/form'
import RootLayout from '@/app/layout';
import { useState } from 'react'; 
import styles from '../../cms-style.module.css';
 
export default function Page() {
  const [image, setImage] = useState('');
  console.log(styles);
  function sendImage(){
    const newFileInput = document.createElement('input');
    newFileInput.setAttribute('type', 'file');
    newFileInput.setAttribute('accept', 'image/png, image/jpeg, image/webp');
    newFileInput.click();
    newFileInput.onchange = async () => {
      const formData = new FormData();
      formData.append('image', newFileInput.files![0]);
      let result = await fetch('/api/tempstorage/store', {
        method: 'POST',
        body: formData,
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // } 
      });
      console.log(result);
      // let imagePath = await result.body;
      // props.player_info.always_display.image.url = imagePath.trim();
    };

  }
  return (
    <div style={{backgroundColor: "white"}}>
      <button onClick={sendImage} className={styles.buttonSendImage} type="submit">Submit</button>
      {/* {
        image != '' ? <img src={image}> : <div></div>
      } */}
    </div>
  );
}