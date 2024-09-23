import React from 'react'
import service from '../appwrite/config' // For information of Post
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {// props from Appwrite. And in Appwrite id written with '$'
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">

                    {/* featuredImage is the file ID of the image, and it’s used to fetch and display the preview of the image using Appwrite’s file storage service.*/}
                    <img src={service.getFilePreview(featuredImage)} alt={title}
                        className='rounded-xl' />

                </div>

                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard