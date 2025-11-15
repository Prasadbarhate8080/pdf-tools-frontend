import React,{useEffect} from 'react'
import styles from  "./postcard.module.css"

function PostCard({
    $id,title,description,$createdAt,date,heading,src
})
{
  //  const myDate = new Date($createdAt);
  return (
      <div className={`${styles.post_card}`} >
        <div className='h-[280px] w-[294px] image-div bg-gray-100'>
          <img src={`${src}`}
            alt={"PDFtoolify"}/>
        </div>
        <div className={`${styles.post_heading}`}>{heading}</div>
        <div className={`${styles.post_description}`}>{description}</div>
      </div>
  )
}   

export default PostCard
