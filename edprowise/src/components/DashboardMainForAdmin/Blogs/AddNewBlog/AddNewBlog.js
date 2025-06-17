import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from 'react-router-dom'
import CreatableSelect from "react-select/creatable";
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';
import { getModules, formats, fontStyles } from '../../../quillConfig.js';
import DOMPurify from 'dompurify';
import { toast } from "react-toastify";
import getAPI from "../../../../api/getAPI.js";
import postAPI from "../../../../api/postAPI.js";

const AddNewBlog = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        blogFor: "",
        scheduledDate: "",
        authorName: "",
        featuredImage: null,
        blogTitle: "",
        blogSlug: "",
        content: "",
        excerpt: "",
        categories: [],
        tags: [],
        status: true
    });

    const [sending, setSending] = useState(false);
    const [editorMode, setEditorMode] = useState('wysiwyg');
    const [showHtmlPreview, setShowHtmlPreview] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [isSlugEditedManually, setIsSlugEditedManually] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [tagsOptions, setTagsOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    // Refs
    const quillRef = useRef(null);
    const htmlEditorRef = useRef(null);

    // Quill modules
    const modules = useMemo(() => getModules({}), []);

    const convertToSlug = (text) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s]+/g, '-')
            .replace(/--+/g, '-')
            .trim();
    };

    // Handle input changes for regular inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = {
                ...prev,
                [name]: value
            };
            // Auto-generate slug when blog title changes and slug hasn't been manually edited
            if (name === 'blogTitle' && !isSlugEditedManually) {
                newData.blogSlug = convertToSlug(value);
            }
            return newData;
        });
    };

    // Handle slug input change separately to track manual edits
    const handleSlugChange = (e) => {
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            blogSlug: convertToSlug(value) // Still apply slug formatting to manual entries
        }));

        // Mark slug as manually edited if not empty
        if (value && !isSlugEditedManually) {
            setIsSlugEditedManually(true);
        }
    };


    // Fetch categories and transform to Select options format
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await getAPI("/get-category", {}, true);

            if (response.success || response.data?.success) {
                const categories = response.data?.data || [];
                const options = categories.map(category => ({
                    value: category._id, // or category.categoryId depending on your API
                    label: category.categoryName
                }));
                setCategoryOptions(options);
            } else {
                toast.error(response.message || 'Failed to fetch categories');
            }
        } catch (err) {
            toast.error('Failed to fetch categories');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch tags and transform to Select options format
    const fetchTags = async () => {
        setLoading(true);
        try {
            const response = await getAPI("/get-tags", {}, true);

            if (response.success || response.data?.success) {
                const tags = response.data?.data || [];
                const options = tags.map(tag => ({
                    value: tag._id, // or tag.tagId depending on your API
                    label: tag.tagName
                }));
                setTagsOptions(options);
            } else {
                toast.error(response.message || 'Failed to fetch tags');
            }
        } catch (err) {
            toast.error('Failed to fetch tags');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchTags();
    }, []);

    // Handle category selection and creation
    const handleCategoryChange = async (selectedOptions, actionMeta) => {
        if (actionMeta.action === 'create-option') {
            // New category created
            try {
                setLoading(true);
                const newCategory = {
                    categoryName: actionMeta.option.label
                };

                // Call API to create new category
                const response = await postAPI("/create-category", newCategory, true);

                if (response.success || response.data?.success) {
                    const createdCategory = response.data?.data;
                    const newOption = {
                        value: createdCategory._id,
                        label: createdCategory.categoryName
                    };

                    // Add new category to options
                    setCategoryOptions(prev => [...prev, newOption]);

                    // Update form data with new category
                    setFormData(prev => ({
                        ...prev,
                        categories: [...prev.categories, newOption.value]
                    }));

                    toast.success('Category created successfully');
                } else {
                    toast.error(response.message || 'Failed to create category');
                }
            } catch (err) {
                toast.error('Failed to create category');
                console.error(err);
            } finally {
                setLoading(false);
            }
        } else {
            // Regular selection change
            setFormData(prev => ({
                ...prev,
                categories: selectedOptions ? selectedOptions.map(option => option.value) : []
            }));
        }
    };

    // Handle tags selection and creation
    const handleTagsChange = async (selectedOptions, actionMeta) => {
        if (actionMeta.action === 'create-option') {
            // New tag created
            try {
                setLoading(true);
                const newTag = {
                    tagName: actionMeta.option.label
                };

                // Call API to create new tag
                const response = await postAPI("/create-tags", newTag, true);

                if (response.success || response.data?.success) {
                    const createdTag = response.data?.data;
                    const newOption = {
                        value: createdTag._id,
                        label: createdTag.tagName
                    };

                    // Add new tag to options
                    setTagsOptions(prev => [...prev, newOption]);

                    // Update form data with new tag
                    setFormData(prev => ({
                        ...prev,
                        tags: [...prev.tags, newOption.value]
                    }));

                    toast.success('Tag created successfully');
                } else {
                    toast.error(response.message || 'Failed to create tag');
                }
            } catch (err) {
                toast.error('Failed to create tag');
                console.error(err);
            } finally {
                setLoading(false);
            }
        } else {
            // Regular selection change
            setFormData(prev => ({
                ...prev,
                tags: selectedOptions ? selectedOptions.map(option => option.value) : []
            }));
        }
    };

    // Handle status toggle
    const handleToggle = () => {
        setFormData(prev => ({
            ...prev,
            status: !prev.status
        }));
    };
    // For style
    useEffect(() => {
        const styleElement = document.createElement("style");
        styleElement.innerHTML = fontStyles;
        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    // Auto-save draft
    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem('emailDraft', JSON.stringify(formData));
        }, 1000);
        return () => clearTimeout(timer);
    }, [formData]);

    // Handle HTML content safely
    const sanitizeHtml = (html) => {
        if (typeof window !== 'undefined') {
            return DOMPurify.sanitize(html);
        }
        return html;
    };

    // Editor mode toggle with content conversion
    const toggleEditorMode = () => {
        if (editorMode === 'wysiwyg') {
            // Convert Quill content to HTML
            const quill = quillRef.current?.getEditor();
            if (quill) {
                const html = quill.root.innerHTML;
                setFormData(prev => ({ ...prev, content: html }));
            }
        } else {
            // When switching back to WYSIWYG, parse HTML
            const quill = quillRef.current?.getEditor();
            if (quill) {
                quill.clipboard.dangerouslyPasteHTML(formData.content);
            }
        }
        setEditorMode(prev => prev === 'wysiwyg' ? 'html' : 'wysiwyg');
        setShowHtmlPreview(false);
    };

    // Handle image resize (updated to maintain preview)
    const handleImageResize = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            // Set temporary preview before resizing
            setImagePreview(e.target.result);

            img.src = e.target.result;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = 385;
                canvas.height = 300;
                const ctx = canvas.getContext("2d");

                ctx.drawImage(img, 0, 0, 385, 300);
                canvas.toBlob((blob) => {
                    const resizedFile = new File([blob], file.name, {
                        type: file.type,
                        lastModified: Date.now(),
                    });

                    // Update preview with resized image
                    const resizedPreview = URL.createObjectURL(blob);
                    setImagePreview(resizedPreview);

                    setFormData(prev => ({
                        ...prev,
                        featuredImage: resizedFile
                    }));
                }, file.type);
            };
        };

        reader.readAsDataURL(file);
    };

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);

        try {
            // Create FormData for file upload
            const formDataToSend = new FormData();

            // Append all form data
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'categories' || key === 'tags') {
                    // Convert arrays to JSON strings
                    formDataToSend.append(key, JSON.stringify(value));
                } else if (value !== null) {
                    formDataToSend.append(key, value);
                }
            });

            const response = await postAPI(
                "/create-blog",
                formDataToSend,
                { "Content-Type": "multipart/form-data" },
                true
            );

            console.log("the response", response);

            if (response.data.success) {
                toast.success("Blog added successfully");


                setFormData({
                    blogFor: "",
                    scheduledDate: "",
                    authorName: "",
                    featuredImage: null,
                    blogTitle: "",
                    blogSlug: "",
                    content: "",
                    excerpt: "",
                    categories: [],
                    tags: [],
                    status: true
                });

                navigate("/admin-dashboard/blog")

            }
            else {
                toast.error(response.message || "Failed to add Blog");
            }
        } catch (error) {
            toast.error(error.response.data.message)

        } finally {
            setSending(false);
        }
    };
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card m-2">
                            <div className="card-body custom-heading-padding">
                                <div className="card-header d-flex align-items-center gap-1">
                                    <h4 className="card-title text-center flex-grow-1">Add Blog</h4>
                                    <button
                                        type="button"
                                        className="btn btn-primary custom-submit-button"
                                        onClick={() => navigate(-1)}
                                    >
                                        Back
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="blogFor"
                                                    className="form-label"
                                                >
                                                    Blog for <span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    id="blogFor"
                                                    name="blogFor"
                                                    className="form-control"
                                                    required
                                                    value={formData.blogFor}
                                                    onChange={handleInputChange}

                                                >
                                                    <option value="">Select Blog</option>
                                                    <option value="Student Zone">Student Zone</option>
                                                    <option value="Educator Zone">Educator Zone</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="scheduledDate" className="form-label">
                                                    Scheduled Date <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    id="scheduledDate"
                                                    name="scheduledDate"
                                                    className="form-control"
                                                    required
                                                    value={formData.scheduledDate}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="authorName" className="form-label">
                                                    Author Name <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="authorName"
                                                    name="authorName"
                                                    className="form-control"
                                                    required
                                                    placeholder='Enter Author Name'
                                                    value={formData.authorName}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="featuredImage" className="form-label">
                                                    Featured Image <span className="text-danger">*</span><span className='fs-6'> (max-size:2MB)</span>
                                                </label>
                                                <input
                                                    type="file"
                                                    id="featuredImage"
                                                    name="featuredImage"
                                                    className="form-control"
                                                    required
                                                    accept="image/*"
                                                    onChange={handleImageResize}
                                                />
                                                {imagePreview && (
                                                    <div className="mt-2">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="img-thumbnail"
                                                            style={{ maxHeight: '200px' }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label htmlFor="blogTitle" className="form-label">
                                                    Blog Title <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="blogTitle"
                                                    name="blogTitle"
                                                    className="form-control"
                                                    required
                                                    placeholder='Enter Blog Title'
                                                    value={formData.blogTitle}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label htmlFor="blogSlug" className="form-label">
                                                    Blog Slug <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="blogSlug"
                                                    name="blogSlug"
                                                    className="form-control"
                                                    required
                                                    placeholder='Enter Blog Slug (e.g., my-blog-title)'
                                                    value={formData.blogSlug}
                                                    onChange={handleSlugChange}
                                                />

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="container">
                                            <div className="card-header d-flex justify-content-between align-items-center gap-1">
                                                <h4 className="card-title text-center custom-heading-font">
                                                    Blog Content
                                                </h4>
                                                <div className="d-flex justify-content-between">
                                                    <div className="align-content-center">

                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={toggleEditorMode}
                                                        className="btn btn-outline-primary"
                                                    >
                                                        {editorMode === 'wysiwyg' ? 'Switch to HTML Editor' : 'Switch to Text Editor'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Editor Area */}
                                        <div className="col-md-12">
                                            <div className="mb-4">
                                                {editorMode === 'wysiwyg' ? (
                                                    <ReactQuill
                                                        ref={quillRef}
                                                        theme="snow"
                                                        value={formData.content}
                                                        onChange={(content, delta, source, editor) => {
                                                            // Get the HTML with proper link handling
                                                            const html = editor.getHTML();
                                                            setFormData(prev => ({ ...prev, content: html }));
                                                        }}
                                                        modules={modules}
                                                        formats={formats}
                                                        placeholder="Write your email content here..."
                                                        className="quill-editor-custom"
                                                    />
                                                ) : (
                                                    <div className="html-editor-container">
                                                        <div className="d-flex align-content-center justify-content-end my-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowHtmlPreview(!showHtmlPreview)}
                                                                className="btn btn-sm btn-outline-secondary"
                                                            >
                                                                {showHtmlPreview ? 'Edit HTML' : 'Preview Email'}
                                                            </button>
                                                        </div>

                                                        {showHtmlPreview ? (
                                                            <div
                                                                className="border p-3 bg-white"
                                                                style={{ pointerEvents: 'auto' }} // This makes links clickable
                                                                dangerouslySetInnerHTML={{ __html: sanitizeHtml(formData.content) }}
                                                                onClick={(e) => {
                                                                    // Handle link clicks in preview
                                                                    if (e.target.tagName === 'A') {
                                                                        e.preventDefault();
                                                                        window.open(e.target.href, '_blank');
                                                                    }
                                                                }}
                                                            />
                                                        ) : (
                                                            <textarea
                                                                ref={htmlEditorRef}
                                                                value={formData.content}
                                                                onChange={(e) => setFormData(prev => ({
                                                                    ...prev,
                                                                    content: e.target.value
                                                                }))}
                                                                className="form-control"
                                                                rows={10}
                                                                placeholder="Write your HTML email here..."
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Excerpt <span className="text-danger">*</span> <span className="fs-6">(max word 150)</span></label>
                                                    <textarea
                                                        className="form-control"
                                                        id="excerpt"
                                                        name="excerpt"
                                                        rows={2}
                                                        value={formData.excerpt}
                                                        onChange={handleInputChange}
                                                        required
                                                        placeholder="Enter Blog Excerpt"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Category <span className="text-danger">*</span></label>
                                                    <CreatableSelect
                                                        isMulti
                                                        isClearable
                                                        options={categoryOptions}
                                                        placeholder={loading ? "Loading categories..." : "Select or create categories..."}
                                                        className="email-select"
                                                        onChange={handleCategoryChange}
                                                        value={categoryOptions.filter(option =>
                                                            formData.categories.includes(option.value)
                                                        )}
                                                        isLoading={loading}
                                                        isDisabled={loading}
                                                        formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
                                                        noOptionsMessage={({ inputValue }) =>
                                                            inputValue ? `No categories found for "${inputValue}"` : "No categories available"
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Tags <span className="text-danger">*</span></label>
                                                    <CreatableSelect
                                                        isMulti
                                                        isClearable
                                                        options={tagsOptions}
                                                        placeholder={loading ? "Loading tags..." : "Select or create tags..."}
                                                        className="email-select"
                                                        onChange={handleTagsChange}
                                                        value={tagsOptions.filter(option =>
                                                            formData.tags.includes(option.value)
                                                        )}
                                                        isLoading={loading}
                                                        isDisabled={loading}
                                                        formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
                                                        noOptionsMessage={({ inputValue }) =>
                                                            inputValue ? `No tags found for "${inputValue}"` : "No tags available"
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Status <span className="text-danger">*</span> <span className="fs-6">(bg-white that status)</span></label>
                                                    <div
                                                        className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
                                                        style={{
                                                            maxWidth: "fit-content"
                                                        }}
                                                    >
                                                        <button
                                                            className={`btn ${formData.status ? 'btn-primary' : 'btn-dark'} rounded-pill`}
                                                            type='button'
                                                            style={{
                                                                backgroundColor: formData.status ? 'white' : 'black',
                                                                borderColor: formData.status ? 'black' : '',
                                                                color: formData.status ? 'black' : 'white',
                                                                maxWidth: "fit-content",
                                                                transition: 'all 0.4s ease-in-out',
                                                                boxShadow: "none"
                                                            }}
                                                            onClick={handleToggle}
                                                        >
                                                            Active
                                                        </button>
                                                        <button
                                                            type='button'
                                                            className={`btn ${!formData.status ? 'btn-primary' : 'btn-dark'}  rounded-pill`}
                                                            style={{
                                                                backgroundColor: !formData.status ? 'white' : 'black',
                                                                borderColor: !formData.status ? 'black' : ' ',
                                                                color: !formData.status ? 'black' : 'white',
                                                                transition: 'all 0.4s ease-in-out',
                                                                boxShadow: "none",
                                                                maxWidth: "fit-content"
                                                            }}
                                                            onClick={handleToggle}
                                                        >
                                                            Inactive
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="d-flex justify-content-end">
                                            <button
                                                type="submit"
                                                className="btn btn-primary custom-submit-button"
                                                disabled={sending}
                                            >
                                                {sending ? "Submitting..." : "Submit"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNewBlog