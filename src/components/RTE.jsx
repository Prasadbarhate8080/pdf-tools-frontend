
'use client'

import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({
  name,
  control,
  label,
  defaultValue = '',
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}

      <Controller
        name={name || 'content'}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value } }) => (
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            value={value ?? ''}
            init={{
              height: 700,
              menubar: true,

              plugins: [
                'image',
                'advlist',
                'autolink',
                'lists',
                'link',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'help',
                'wordcount',
              ],

              toolbar:
                'undo redo | blocks | fontfamily fontsizeinput | styles | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',

              style_formats: [
                {
                  title: 'Font Weight',
                  items: [
                    {
                      title: 'Light (300)',
                      inline: 'span',
                      styles: { 'font-weight': '300' },
                    },
                    {
                      title: 'Normal (400)',
                      inline: 'span',
                      styles: { 'font-weight': '400' },
                    },
                    {
                      title: 'Medium (500)',
                      inline: 'span',
                      styles: { 'font-weight': '500' },
                    },
                    {
                      title: 'Semi Bold (600)',
                      inline: 'span',
                      styles: { 'font-weight': '600' },
                    },
                    {
                      title: 'Bold (700)',
                      inline: 'span',
                      styles: { 'font-weight': '700' },
                    },
                    {
                      title: 'Extra Bold (800)',
                      inline: 'span',
                      styles: { 'font-weight': '800' },
                    },
                  ],
                },
              ],

              style_formats_merge: true,

              content_style:
                'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }',
            }}
            onEditorChange={onChange}
            onBlur={onBlur}
          />
        )}
      />
    </div>
  )
}
