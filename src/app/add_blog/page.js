
'use client'

import Input from '@/components/Input'
import axios from 'axios'
import React, { useCallback, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import RTE from '@/components/RTE'

function Page() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
  } = useForm({
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

  // Slug transformation
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

  // Submit Blog
  const submit = async (data) => {
    try {
      const payload = {
        ...data,

        // Remove incomplete TOC entries
        tableOfContent: data.tableOfContent.filter(
          (item) => item.id?.trim() && item.text?.trim()
        ),

        // Remove incomplete FAQs
        faqs: data.faqs.filter(
          (item) =>
            item.question?.trim() && item.answer?.trim()
        ),
      }

      await axios.post('/api/add_blog_in_db', {
        data: payload,
      })

      alert('Blog added successfully')
    } catch (error) {
      console.error('Add blog error:', error)
      alert(
        error?.response?.data?.message ||
        'Failed to add blog'
      )
    }
  }

  return (
    <div className="md:w-2/3 px-3 mt-36 max-w-6xl mx-auto">

      <form
        onSubmit={handleSubmit(submit)}
        className="space-y-5"
      >

        {/* Basic Information */}

        <Input
          label="Title :"
          placeholder="Title"
          {...register('title', { required: true })}
        />

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
            setValue(
              'slug',
              slugTransform(e.currentTarget.value),
              { shouldValidate: true }
            )
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

        {/* Dynamic Table of Contents */}

        <section className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 text-left space-y-4">

          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">
                Table of Contents
              </h2>

              <p className="text-sm text-gray-500">
                Add headings and their corresponding section IDs.
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {tocFields.length} Items
            </span>
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
                  <h3 className="font-medium">
                    Section {index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() => removeTOC(index)}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Section ID
                  </label>

                  <input
                    {...register(`tableOfContent.${index}.id`)}
                    placeholder="e.g. how-to-add-pages"
                    className="w-full border rounded-lg p-2 bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Heading Text
                  </label>

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

        {/* Dynamic FAQs */}

        <section className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 text-left space-y-4">

          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">
                Frequently Asked Questions
              </h2>

              <p className="text-sm text-gray-500">
                Add questions and their answers.
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {faqFields.length} FAQs
            </span>
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
                  <h3 className="font-medium">
                    FAQ {index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() => removeFAQ(index)}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Question
                  </label>

                  <input
                    {...register(`faqs.${index}.question`)}
                    placeholder="Enter question"
                    className="w-full border rounded-lg p-2 bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Answer
                  </label>

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
            onClick={() =>
              appendFAQ({ question: '', answer: '' })
            }
            className="bg-blue-50 dark:bg-blue-950 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100"
          >
            + Add FAQ
          </button>

        </section>

        {/* Blog Content */}

        <div className="mt-4">
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue=""
          />
        </div>

        {/* Submit */}

        <button
          type="submit"
          className="bg-blue-500 px-20 py-2 rounded-md text-white mt-4"
        >
          Submit
        </button>

      </form>
    </div>
  )
}

export default Page
