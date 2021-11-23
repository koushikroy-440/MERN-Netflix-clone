import React from 'react'
import Featured from '../../components/featured/featured';
import { List } from '../../components/list/list';
import Navbar from '../../components/navbar/navbar';
import './home.scss';
import { useEffect, useState } from "react";
import axios from 'axios';
const Home = ({type}) => {
    const [list, setLists] = useState([]);
    const [genre,setGenre] = useState(null);

    useEffect(() => {
        const getRandomLists = async () => {
          try {
            const res = await axios.get(
              `lists${type ? "?type=" + type : ""}${
                genre ? "&genre=" + genre : ""
              }`,
              {
                headers: {
                  token:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGJjZGFhMjk0ZWVhNzhiNDg1YWI1NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNzY0NjY2NywiZXhwIjoxNjM4MDc4NjY3fQ._7KGPlv11TV_MMR_FDa14YQy7wtM74-YUPmBTeAFuDI",
                },
              }
            );
            setLists(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getRandomLists();
      }, [type, genre]);

    return (
        <div className="home">
            <Navbar/>
            <Featured type={type}/>
            {list.map((list)=>(
                <List list={list}/>
            ))}
            
            

        </div>
    )
}

export default Home
