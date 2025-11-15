"use client"
import Input from '@/components/Input';
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import RTE from '@/components/RTE';

function page() {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title:  "",
            slug:  "",  
            content:  "",
            description: "",
            imageUrl: "",
            toolName: "",
        },
    });

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")
                .slice(0,35)
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const submit = async (data) => {
      try {
        let response = await axios.post('/api/add_blog_in_db',{
          data
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }

    }

  return (
      <div className="md:w-2/3  px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4 focus:ring focus:ring-blue-700 focus:ring-offset-1"
            {...register("title", { required: true })}
        />
          <Input
            label="Desciption :"
            placeholder="Description"
            className="mb-4 focus:ring focus:ring-blue-700 focus:ring-offset-1"
            {...register("description", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4 focus:ring focus:ring-blue-700 focus:ring-offset-1"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <Input
            label="image Url :"
            placeholder="image url"
            className="mb-4 focus:ring focus:ring-blue-700 focus:ring-offset-1"
            {...register("imageUrl", { required: true })}
        />
        <Input
            label="Toolname :"
            placeholder="toolname"
            className="mb-4 focus:ring focus:ring-blue-700 focus:ring-offset-1"
            {...register("toolName", { required: true })}
        />
        <div className="mt-4">
          <RTE  label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
          <button className='bg-blue-500 px-4 ml-96  py-2 rounded-md text-white'
          onClick={handleSubmit(submit)}
          >Submit</button>
          
      </div>
    )
}

export default page
