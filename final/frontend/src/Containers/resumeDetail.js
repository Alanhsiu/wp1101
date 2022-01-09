import React, { useState, useEffect } from 'react'
import moment from 'moment'
import instance from "../api";

import { useParams } from 'react-router-dom'
import { IconButton, Button, Typography } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

function ResumeDetail(props) {
  const { pid } = useParams()
  const [resume, setResume] = useState(null)

  // TODO 3-(2): complete getPostDetail function to get the full information of a post from database
  const getResumeDetail = async() => {
    const {data: {message, resume}}= await instance.get("/api/resumeDetail",{params: {pid,}})
    setResume(resume)   
  }

  // TODO 3-(2): fetch the full information of a post from database
  useEffect(() => {
    console.log("ok")
    getResumeDetail()  
  }, [pid])
  
  return (
    <div className="article-wrapper">
      <div id="goback-btn">
        <Button variant="contained" color="primary" id="goback-reply-btn" onClick={() => props.navigate(-1)}>Back</Button>
      </div>

      {resume ?
        <div className="article-container">
          <div className="article-title" id="pid-detail-title">
            {`${resume[0].subject}: ${resume[0].lowPrice} ~ ${resume[0].highPrice}`}

            {/* TODO 5-(2): add property to IconButton to trigger the delPost function when click */}
            <IconButton className="post-delete" size="small" id="pid-detail-del-btn">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
          <div className="article-time">
            <span id="pid-detail-time">{moment(resume.timestamp).format('YYYY-MM-DD HH:mm:ss')}</span>
          </div>
          <div className="article-content-container">
            <Typography component={'span'} id="pid-detail-content">
              {resume[0].description}
            </Typography>
          </div>
        </div> : <div className="article-container"><h1>No such Resume</h1></div>
      }
    </div>
  );
}

export default ResumeDetail
