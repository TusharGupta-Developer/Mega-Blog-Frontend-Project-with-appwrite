/*--------- This PostForm component is a form for creating or updating blog posts. ---------*/
import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {

      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",

    },
  });

  const navigate = useNavigate();

  /*--------- useSelector retrieves the current logged-in user's data from the Redux store. ---------*/
  const userData = useSelector((state) => state.auth.userData)



  const submit = async (data) => {

    /*--------- if post object is exists then update the post, if not then create it ---------*/

    if (post) {
      const file = await data.image[0] ? service.uploadFile(data.image[0]) : null 

      //for deleting old image
      if (file) { // true if data.image[0] is truthy and file get metadata of uploaded file
        await service.deleteFile(post.featuredImage) // featuredImage is an Id
      }

      //for updating the post
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined
      }) // slug is post's id

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }

    } else {
      /* If 'post' does not exist (indicating we are creating a new post)*/
      const file = await service.uploadFile(data.image[0]); //// Upload the new image file

      if (file) {
        const fileId = file.$id
        data.featuredImage = fileId
        const dbPost = await service.createPost({
          ...data,
          userID: userData.$id
        })
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }

    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value

        .trim() // remove whitespace from both ends of a string
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '-') // Replaces any character that is NOT a letter, number, or space with a hyphen
        .replace(/\s/g, '-'); // Replaces all spaces with hyphens

    } else {
      return ''
    }

  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title, { shouldValidate: true }))// here slug is field which here goona set
      }
    })


    return () => {
      subscription.unsubscribe()
    }
  }, [watch, slugTransform, setValue])


  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">

      {/* form divided into 2 parts left one in 2/3 and right one in 1/3 space */}
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />

        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>


      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm