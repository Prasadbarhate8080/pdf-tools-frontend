"use client";

import Input from "@/components/Input";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import RTE from "@/components/RTE";

function Page() {
  const params = useParams();
  const router = useRouter();

  const slugFromUrl = params.slug;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      description: "",
      imageUrl: "",
      toolName: "",
    },
  });

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
        .slice(0, 35);
    }

    return "";
  }, []);

  // Automatically change slug when title changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue(
          "slug",
          slugTransform(value.title),
          { shouldValidate: true }
        );
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // Fetch existing blog
  useEffect(() => {
    const getBlog = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `/api/get_post_to_view/${slugFromUrl}`
        );

        const post = response.data.post;

        if (!post) {
          alert("Blog not found");
          return;
        }

        // Fill form with existing data
        setValue("title", post.title || "");
        setValue("slug", post.slug || "");
        setValue("description", post.description || "");
        setValue("imageUrl", post.imageUrl || "");
        setValue("toolName", post.toolName || "");
        setValue("content", post.content || "");

      } catch (error) {
        console.error("Error fetching blog:", error);
        alert("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    if (slugFromUrl) {
      getBlog();
    }
  }, [slugFromUrl, setValue]);

  // Update blog
  const submit = async (data) => {
    try {
      setUpdating(true);

      const response = await axios.put(
        `/api/update_blog/${slugFromUrl}`,
        {
          data,
        }
      );

      alert("Blog updated successfully");

      // If slug was changed, go to new URL
      if (data.slug !== slugFromUrl) {
        router.push(`/admin/update-blog/${data.slug}`);
      }

    } catch (error) {
      console.error("Update error:", error);

      alert(
        error?.response?.data?.message ||
        "Failed to update blog"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-36 text-center">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="md:w-2/3 text-center px-2 mt-36 max-w-6xl mx-auto">

      <Input
        label="Title :"
        placeholder="Title"
        className="mb-4 focus:ring focus:ring-blue-700 focus:ring-offset-1"
        {...register("title", { required: true })}
      />

      <Input
        label="Description :"
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
          setValue(
            "slug",
            slugTransform(e.currentTarget.value),
            { shouldValidate: true }
          );
        }}
      />

      <Input
        label="Image URL :"
        placeholder="Image URL"
        className="mb-4 focus:ring focus:ring-blue-700 focus:ring-offset-1"
        {...register("imageUrl", { required: true })}
      />

      <Input
        label="Toolname :"
        placeholder="Toolname"
        className="mb-4 focus:ring focus:ring-blue-700 focus:ring-offset-1"
        {...register("toolName", { required: true })}
      />

      <div className="mt-4">
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue=""
        />
      </div>

      <button
        className="bg-blue-500 px-20 py-2 rounded-md text-white mt-4 disabled:opacity-50"
        onClick={handleSubmit(submit)}
        disabled={updating}
      >
        {updating ? "Updating..." : "Update Blog"}
      </button>

    </div>
  );
}

export default Page;