import React from "react";
import "./SearchList.css"
import { FaSearch } from "react-icons/fa";
function SearchList({TitleArray,setsearchQuery}) {
  return (
    <>
      <div className="Containers_SearchList">
      {
        TitleArray.map(m=>{
          return        <p 
          key={m}
          className='titleItem'
           onClick={e=>setsearchQuery(m)}>
        
          <FaSearch/>
          {m}
      </p>
        })
      }
        
        
      </div>
    </>
  );
}

export default SearchList;
