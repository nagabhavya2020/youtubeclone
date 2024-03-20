import React from 'react'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import './WHLcss.css'
import WHLVideoList from './WHLVideoList'
import { useDispatch, useSelector } from 'react-redux'
import { clearHistory } from '../../actions/history'

function WHL({page,videoList}) {
  const CurrentUser = useSelector((state)=>state?.currentUserReducer)

  const dispatch = useDispatch();
  const handleClearHistory = ()=> {
    if(CurrentUser){
      dispatch(clearHistory({
        userId: CurrentUser?.result._id,
      }))
    }
  }
  return (
    <>
    <div className="container_Pages_App">
      <LeftSideBar/>
      <div className="container2_PagesApp">
        <p className="delete">
             <div className="box_WHL leftside_whl">
                <b>Your {page} Shown Here</b>
                {
                  page==="History" &&
                  <div className="clear_History_btn" onClick={()=>handleClearHistory()}>
                    Clear History
                </div>
                }
                
             </div>
             <div className="rightSide_wh1">
                <h1>{page}</h1>
                <div className="whl_list">
                    <WHLVideoList page={page} videoList={videoList}
                    CurrentUser={CurrentUser?.result._id}
                  />
                </div>
             </div>
        </p>
      </div>
    
    
    </div>
    </>
    
  )
}

export default WHL