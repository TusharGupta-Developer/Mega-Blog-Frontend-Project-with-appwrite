import React from 'react'
import { Editor } from '@tinymce/tinymce-react' // Editor came from "tinymce" this was installed in statrting.
import { Controller } from 'react-hook-form'



export default function RTE({ name, control, label,
    defaultValue = ""
}) {// this "control" came from react-hook-from and it is responsible to send this components' states to PostForm.

    return (
        <div className='w-full'>
            {label && <label className='text-sm text-gray-600'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true, // Displays a menu bar with options like File, Edit, View, etc.

                            // Add extra functionality to the editor (e.g., lists, media, tables, word count).
                            plugins: [ 
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            //Displays a menu bar with options like File, Edit, View, etc
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={onChange} // When editor content changes, call onChange to update the form state
                    />
                )}
            />
        </div>
    )
}

