'use client'

import Input from '@/components/Input'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'
import RTE from '@/components/RTE'

// Normalize existing TOC data
const normalizeTOC = (value) => {
  if (!Array.isArray(value)) return []

  return value
    .filter((item) => item && typeof item === 'object' && !Array.isArray(item))
    .map((item) => ({
      id: typeof item.id === 'string' ? item.id : '',
      text: typeof item.text === 'string' ? item.text : '',
    }))
}

// Normalize existing FAQ data
const normalizeFAQs = (value) => {
  if (!Array.isArray(value)) return []

  return value
    .filter((item) => item && typeof item === 'object' && !Array.isArray(item))
    .map((item) => ({
      question: typeof item.question === 'string' ? item.question : '',
      answer: typeof item.answer === 'string' ? item.answer : '',
    }))
}

function Page() {
  const params = useParams()
  const router = useRouter()

  const slugFromUrl = params.slug

  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const { register, handleSubmit, watch, setValue, control } = useForm({
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      description: '',
      imageUrl: '',
      toolName: '',
      tableOfContent: [],
      faqs: [],
    },
  })

  // Dynamic Table of Contents
  const {
    fields: tocFields,
    append: appendTOC,
    remove: removeTOC,
  } = useFieldArray({
    control,
    name: 'tableOfContent',
    keyName: 'fieldKey',
  })

  // Dynamic FAQs
  const {
    fields: faqFields,
    append: appendFAQ,
    remove: removeFAQ,
  } = useFieldArray({
    control,
    name: 'faqs',
    keyName: 'fieldKey',
  })

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s-]+/g, '-')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 35)
    }

    return ''
  }, [])

  // Automatically generate slug from title
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), {
          shouldValidate: true,
        })
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, slugTransform, setValue])

  // Fetch existing blog
  useEffect(() => {
    const getBlog = async () => {
      try {
        setLoading(true)

        const response = await axios.get(`/api/get_post_to_view/${slugFromUrl}`)

        const post = response.data.post

        if (!post) {
          alert('Blog not found')
          return
        }

        setValue('title', post.title || '')
        setValue('slug', post.slug || '')
        setValue('description', post.description || '')
        setValue('imageUrl', post.imageUrl || '')
        setValue('toolName', post.toolName || '')
        setValue('content', post.content || '')

        // Populate dynamic fields
        setValue('tableOfContent', normalizeTOC(post.tableOfContent ?? post.toc))

        setValue('faqs', normalizeFAQs(post.faqs))
      } catch (error) {
        console.error('Error fetching blog:', error)
        alert('Failed to load blog')
      } finally {
        setLoading(false)
      }
    }

    if (slugFromUrl) {
      getBlog()
    }
  }, [slugFromUrl, setValue])

  // Update blog
  const submit = async (data) => {
    try {
      setUpdating(true)

      // Remove incomplete TOC and FAQ entries
      const payload = {
        ...data,

        tableOfContent: data.tableOfContent.filter((item) => item.id?.trim() && item.text?.trim()),

        faqs: data.faqs.filter((item) => item.question?.trim() && item.answer?.trim()),
      }

      await axios.put(`/api/update_blog/${slugFromUrl}`, {
        data: payload,
      })

      alert('Blog updated successfully')

      if (payload.slug !== slugFromUrl) {
        router.push(`/admin/update-blog/${payload.slug}`)
      }
    } catch (error) {
      console.error('Update error:', error)
      alert(error?.response?.data?.message || 'Failed to update blog')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return <div className="mt-36 text-center">Loading blog...</div>
  }

  return (
    <div className="md:w-2/3 px-3 mt-36 max-w-6xl mx-auto">
      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        {/* Basic Information */}

        <Input label="Title :" placeholder="Title" {...register('title', { required: true })} />

        <Input
          label="Description :"
          placeholder="Description"
          {...register('description', { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })
          }}
        />

        <Input
          label="Image URL :"
          placeholder="Image URL"
          {...register('imageUrl', { required: true })}
        />

        <Input
          label="Toolname :"
          placeholder="Toolname"
          {...register('toolName', { required: true })}
        />

        {/* Table of Contents */}

        <section className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 text-left space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Table of Contents</h2>
              <p className="text-sm text-gray-500">
                Add headings and their corresponding section IDs.
              </p>
            </div>

            <span className="text-sm text-gray-500">{tocFields.length} Items</span>
          </div>

          {tocFields.length === 0 && (
            <p className="text-sm text-gray-500 py-4 text-center border border-dashed rounded-lg">
              No table of contents added yet.
            </p>
          )}

          <div className="space-y-3">
            {tocFields.map((field, index) => (
              <div
                key={field.fieldKey}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Section {index + 1}</h3>

                  <button
                    type="button"
                    onClick={() => removeTOC(index)}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div>
                  <label className="block text-sm mb-1">Section ID</label>

                  <input
                    {...register(`tableOfContent.${index}.id`)}
                    placeholder="e.g. how-to-add-pages"
                    className="w-full border rounded-lg p-2 bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Heading Text</label>

                  <input
                    {...register(`tableOfContent.${index}.text`)}
                    placeholder="e.g. How to Add Pages"
                    className="w-full border rounded-lg p-2 bg-transparent"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => appendTOC({ id: '', text: '' })}
            className="bg-blue-50 dark:bg-blue-950 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100"
          >
            + Add TOC Item
          </button>
        </section>

        {/* FAQs */}

        <section className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 text-left space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>

              <p className="text-sm text-gray-500">Add questions and their answers.</p>
            </div>

            <span className="text-sm text-gray-500">{faqFields.length} FAQs</span>
          </div>

          {faqFields.length === 0 && (
            <p className="text-sm text-gray-500 py-4 text-center border border-dashed rounded-lg">
              No FAQs added yet.
            </p>
          )}

          <div className="space-y-3">
            {faqFields.map((field, index) => (
              <div
                key={field.fieldKey}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">FAQ {index + 1}</h3>

                  <button
                    type="button"
                    onClick={() => removeFAQ(index)}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div>
                  <label className="block text-sm mb-1">Question</label>

                  <input
                    {...register(`faqs.${index}.question`)}
                    placeholder="Enter question"
                    className="w-full border rounded-lg p-2 bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Answer</label>

                  <textarea
                    {...register(`faqs.${index}.answer`)}
                    rows={3}
                    placeholder="Enter answer"
                    className="w-full border rounded-lg p-2 bg-transparent resize-y"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => appendFAQ({ question: '', answer: '' })}
            className="bg-blue-50 dark:bg-blue-950 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100"
          >
            + Add FAQ
          </button>
        </section>

        {/* Blog Content */}

        <div className="mt-4">
          <RTE label="Content :" name="content" control={control} defaultValue="" />
        </div>

        {/* Submit */}

        <button
          type="submit"
          className="bg-blue-600 px-20 py-2 rounded-md text-white mt-4 disabled:opacity-50"
          disabled={updating}
        >
          {updating ? 'Updating...' : 'Update Blog'}
        </button>
      </form>
    </div>
  )
}

export default Page
