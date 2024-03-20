import React, { useState } from 'react';
import './SearchBar.css';
import {BsMicFill} from "react-icons/bs";
import {FaSearch} from "react-icons/fa";
import SearchList from './SearchList';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function SearchBar() {
  const [searchQuery, setsearchQuery] = useState("");
  const [searchListA,setSearchList] = useState(false);
  const TitleArray =  useSelector(s=> s?.videoReducer)
  ?.data?.filter((q)=>q?.videoTitle.toUpperCase()
  .includes(searchQuery?.toUpperCase())).map(m=> m?.videoTitle);
 // const TitleArray = ["video1", "Video2","Animation video","Movies"].filter(q=>q.toUpperCase().includes(searchQuery.toUpperCase()));
  return (
    <>
<div className="SearchBar_Container">
    <div className="SearchBar_Container2">
        <div className="search_div">
        <input type='text' className='iBox_SearchBar' placeholder='Search'
        value={searchQuery}
        onChange={e=>setsearchQuery(e.target.value)} 
        onClick={e=>setSearchList(true)}/>
        <Link to={`/search/${searchQuery}`}>

        <FaSearch className="searchIcon_SearchBar"
        onClick={e=>setSearchList(false)}/>
        

        </Link>
        <BsMicFill className="Mic_SearchBar" />
        {searchQuery&& searchListA&&
          <SearchList
          setsearchQuery={setsearchQuery} TitleArray={TitleArray}/>
        }
        </div>
    </div>

</div>
    </>
  )
}

export default SearchBar