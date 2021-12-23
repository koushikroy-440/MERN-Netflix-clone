import "./newProduct.css";
import { useState,useContext } from 'react';
import storage from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createMovie } from '../../context/movieContext/apiCalls';
import { MovieContext } from '../../context/movieContext/MovieContext';
export default function NewProduct() {
  const [movie, setMovie] = useState(null);
  const [img,setImg] = useState(null);
  const [imgTitle,setImgTitle] = useState(null);
  const [imgSm,setImgSm] = useState(null);
  const [trailer,settrailer] = useState(null);
  const [video,setVideo] = useState(null);
  const [uploaded,setUploaded] = useState(0);
  
  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  }

  const { dispatch } = useContext(MovieContext);

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      
      const storage = getStorage();
      const storageRef = ref(storage, 'items/' + fileName);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setMovie((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handelSubmit= (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
  };
  console.log(movie);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" name="img" onChange={(e) => setImg(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input type="file" id="imgTitle" name="imgTitle" onChange={(e) => setImgTitle(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input type="file" id="imgSm" name="imgSm" onChange={(e) => setImgSm(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="Apple Airpods" name="title" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="123" name="desc" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" placeholder="123" name="year" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="123" name="genre" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" placeholder="123" name="duration" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" placeholder="123" name="limit" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Is series ?</label>
          <select name="isSeries" id="isSeries"  onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" name="trailer" onChange={(e) => settrailer(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" name="video" onChange={(e) => setVideo(e.target.files[0])}/>
        </div>{
          uploaded === 5 ? (
            <button className="addProductButton" onClick={handelSubmit}>Create</button>
          ):(
            <button className="addProductButton" onClick={handleUpload}>Upload</button>
          )
        }
      </form>
    </div>
  );
}
