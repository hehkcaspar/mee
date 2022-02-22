/*global chrome*/
import React, { useEffect, useState } from 'react';
import logo from './assets/images/mee48-removebg.png';
import './App.css';

export default function App(){
  const [url, setUrl] = useState('');
  const [YouTubeIMG, setYouTubeIMG] = useState('');
  const [URLs, setURLs] = useState([]);

  useEffect(() => {
    const queryInfo = {active: true, lastFocusedWindow: true};
    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        func: ()=>{
          let metaContents = document.getElementById("meta-contents");
          let urlList = [];
          if (metaContents) {
              let stringContents = metaContents.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string");
              let contentLen = stringContents.length;
              for (let i = 0; i < contentLen; i++) {
                  urlList.push(stringContents[i].innerHTML);
              }
          };
          return urlList;
        }
      }, (res)=>{
        setURLs(res[0].result||[]);
      })
      // Current tab url
      const url = tabs[0].url;
      setUrl(url);
      if (url.includes('youtube.com')){
        let youtube_video_id = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
        let youtube_video_im = youtube_video_id&&`https://img.youtube.com/vi/${youtube_video_id}/0.jpg`;
        setYouTubeIMG(youtube_video_im);
      };
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Find all URLs in description</h3>
        <div class='row'>
          <div class='col-6'>
            <h3>网址</h3>
            <p>{url.length>0?`${url.split('/')[0]+'//'+url.split('/')[2]}`:null}</p>
            <h4>博主身份</h4>
            <p>{URLs.length>1?`${URLs[0]}`:null}</p>
            {YouTubeIMG||null?<img className='YouTubeFeatureIMG' src={YouTubeIMG} />:null}
          </div>
          <div class='col-6'>
            <div>
              <h3>Links</h3>
              <div class='menu'>
                {URLs.length>2?URLs.slice(1).map((ele)=> ( <li>{ele}</li> )):null}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )

};
