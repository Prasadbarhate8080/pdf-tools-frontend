'use client'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({ name, control, label, defaultValue = '' }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="2clugnf68lqwsswzf06x6cohwgs1d69zvvjcke58btxjbimi"
            initialValue={defaultValue}
            init={{
              height: 900,
              menubar: true,
              plugins: [
                'image',
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
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
                'code',
                'help',
                'wordcount',
                'anchor',
              ],
              toolbar:
                'undo redo | blocks | fontfamily fontsizeinput | styles | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
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
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  )
}
