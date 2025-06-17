import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import CreatableSelect from "react-select/creatable";
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';
import { getModules, formats, fontStyles } from '../../../quillConfig.js';
import DOMPurify from 'dompurify';
import { toast } from "react-toastify";
import getAPI from "../../../../api/getAPI.js";
import putAPI from "../../../../api/putAPI.js";
import postAPI from "../../../../api/postAPI.js";

const UpdateBlog = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { blog } = location.state || {};

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
    const [isSlugEditedManually, setIsSlugEditedManually] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [tagsOptions, setTagsOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [existingImage, setExistingImage] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const quillRef = useRef(null);
    const htmlEditorRef = useRef(null);
    const modules = useMemo(() => getModules({}), []);

    useEffect(() => {
        if (blog) {
            // Initialize form with blog data
            setFormData({
                blogFor: blog.blogFor || "",
                scheduledDate: blog.scheduledDate ? new Date(blog.scheduledDate).toISOString().split('T')[0] : "",
                authorName: blog.authorName || "",
                featuredImage: blog.featuredImage || "",
                blogTitle: blog.blogTitle || "",
                blogSlug: blog.blogSlug || "",
                content: blog.content || "",
                excerpt: blog.excerpt || "",
                categories: Array.isArray(blog?.categories) ? blog.categories.map(cat => typeof cat === 'object' ? cat._id : cat) : [],
                tags: Array.isArray(blog?.tags) ? blog.tags.map(tag => typeof tag === 'object' ? tag._id : tag) : [],
                status: blog.status,
            });

            if (blog.featuredImage) {
                setExistingImage(process.env.REACT_APP_API_URL_FOR_IMAGE + blog.featuredImage);
            }
        }
        fetchCategories();
        fetchTags();
    }, [blog]);


    useEffect(() => {
        // Update selected categories when options and formData are available
        console.log("Form Data", formData);
        if (categoryOptions.length > 0 && formData.categories.length > 0) {
            const selected = categoryOptions.filter(option =>
                formData.categories.includes(option.value))
            setSelectedCategories(selected);
        }
    }, [categoryOptions, formData.categories]);

    useEffect(() => {
        // Update selected tags when options and formData are available
        if (tagsOptions.length > 0 && formData.tags.length > 0) {
            const selected = tagsOptions.filter(option =>
                formData.tags.includes(option.value))
            setSelectedTags(selected);
        }
    }, [tagsOptions, formData.tags]);


    const convertToSlug = (text) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s]+/g, '-')
            .replace(/--+/g, '-')
            .trim();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            if (name === 'blogTitle' && !isSlugEditedManually) {
                newData.blogSlug = convertToSlug(value);
            }
            return newData;
        });
    };

    const handleSlugChange = (e) => {
        const { value } = e.target;
        setFormData(prev => ({ ...prev, blogSlug: convertToSlug(value) }));
        if (value && !isSlugEditedManually) setIsSlugEditedManually(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            setFormData(prev => ({ ...prev, featuredImage: file }));
            setExistingImage(null);
        }
    };

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await getAPI("/get-category", {}, true);
            if (response.success || response.data?.success) {
                const options = (response.data?.data || []).map(category => ({
                    value: category._id,
                    label: category.categoryName
                }));
                setCategoryOptions(options);
            }
        } catch (err) {
            toast.error('Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    const fetchTags = async () => {
        setLoading(true);
        try {
            const response = await getAPI("/get-tags", {}, true);
            if (response.success || response.data?.success) {
                const options = (response.data?.data || []).map(tag => ({
                    value: tag._id,
                    label: tag.tagName
                }));
                setTagsOptions(options);
            }
        } catch (err) {
            toast.error('Failed to fetch tags');
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = async (selectedOptions, actionMeta) => {
        if (actionMeta.action === 'create-option') {
            try {
                setLoading(true);
                const newCategory = {
                    categoryName: actionMeta.option.label
                };

                const response = await postAPI("/create-category", newCategory, true);

                if (response.success || response.data?.success) {
                    const createdCategory = response.data?.data;
                    const newOption = {
                        value: createdCategory._id,
                        label: createdCategory.categoryName
                    };

                    setCategoryOptions(prev => [...prev, newOption]);
                    setFormData(prev => ({
                        ...prev,
                        categories: [...prev.categories, newOption.value]
                    }));
                    toast.success('Category created successfully');
                }
            } catch (err) {
                toast.error('Failed to create category');
            } finally {
                setLoading(false);
            }
        } else {
            setFormData(prev => ({
                ...prev,
                categories: selectedOptions ? selectedOptions.map(option => option.value) : []
            }));
        }
    };

    const handleTagsChange = async (selectedOptions, actionMeta) => {
        if (actionMeta.action === 'create-option') {
            try {
                setLoading(true);
                const newTag = {
                    tagName: actionMeta.option.label
                };

                const response = await postAPI("/create-tags", newTag, true);

                if (response.success || response.data?.success) {
                    const createdTag = response.data?.data;
                    const newOption = {
                        value: createdTag._id,
                        label: createdTag.tagName
                    };

                    setTagsOptions(prev => [...prev, newOption]);
                    setFormData(prev => ({
                        ...prev,
                        tags: [...prev.tags, newOption.value]
                    }));
                    toast.success('Tag created successfully');
                }
            } catch (err) {
                toast.error('Failed to create tag');
            } finally {
                setLoading(false);
            }
        } else {
            setFormData(prev => ({
                ...prev,
                tags: selectedOptions ? selectedOptions.map(option => option.value) : []
            }));
        }
    };

    const handleToggle = () => {
        setFormData(prev => ({
            ...prev,
            status: !prev.status
        }));
    };

    useEffect(() => {
        const styleElement = document.createElement("style");
        styleElement.innerHTML = fontStyles;
        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    const sanitizeHtml = (html) => {
        if (typeof window !== 'undefined') {
            return DOMPurify.sanitize(html);
        }
        return html;
    };

    const toggleEditorMode = () => {
        if (editorMode === 'wysiwyg') {
            const quill = quillRef.current?.getEditor();
            if (quill) {
                const html = quill.root.innerHTML;
                setFormData(prev => ({ ...prev, content: html }));
            }
        } else {
            const quill = quillRef.current?.getEditor();
            if (quill) {
                quill.clipboard.dangerouslyPasteHTML(formData.content);
            }
        }
        setEditorMode(prev => prev === 'wysiwyg' ? 'html' : 'wysiwyg');
        setShowHtmlPreview(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);

        try {
            const formDataToSend = new FormData();
            console.log('Form data before submission:', {
                ...formData,
                scheduledDate: new Date(formData.scheduledDate),
                featuredImage: formData.featuredImage
            });
            
            // Append all fields
            formDataToSend.append('blogFor', formData.blogFor);
            formDataToSend.append('scheduledDate', formData.scheduledDate);
            formDataToSend.append('authorName', formData.authorName);
            formDataToSend.append('blogTitle', formData.blogTitle);
            formDataToSend.append('blogSlug', formData.blogSlug);
            formDataToSend.append('content', formData.content);
            formDataToSend.append('excerpt', formData.excerpt);
            formDataToSend.append('status', formData.status.toString()); // Convert boolean to string

            // // Handle categories and tags
            formDataToSend.append('categories', JSON.stringify(formData.categories));
            formDataToSend.append('tags', JSON.stringify(formData.tags));

            // Handle image upload
            if (formData.featuredImage instanceof File) {
                formDataToSend.append('featuredImage', formData.featuredImage);
            } else if (existingImage) {
                // If keeping existing image
                formDataToSend.append('existingImagePath', formData.featuredImage);
            }
            console.log('--- FormData Contents ---');
            for (let [key, value] of formDataToSend.entries()) {
                if (key === 'featuredImage') {
                    console.log(key, ':', value.name, `(size: ${value.size} bytes, type: ${value.type})`);
                } else {
                    console.log(key, ':', value);
                }
            }
            const response = await putAPI(
                `/update-blog/${blog._id}`,  // Changed endpoint to match backend
                formDataToSend,
                { "Content-Type": "multipart/form-data" },
                true
            );
            console.log('Update response:', response); // Debug log
            if (response.data?.success) {
                toast.success("Blog updated successfully");
                navigate("/admin-dashboard/blog");
            } else {
                toast.error(response.message || "Failed to update blog");
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error(error.response?.data?.message || "Error updating blog");
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
                                    <h4 className="card-title text-center flex-grow-1">Update Blog</h4>
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
                                                <label htmlFor="blogFor" className="form-label">
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
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                                {existingImage && !imagePreview && (
                                                    <div className="mt-2">
                                                        <img
                                                            src={existingImage}
                                                            alt="Current Featured"
                                                            className="img-thumbnail"
                                                            style={{ maxHeight: '200px' }}
                                                        />
                                                        <p className="text-muted mt-1">Current featured image</p>
                                                    </div>
                                                )}
                                                {imagePreview && (
                                                    <div className="mt-2">
                                                        <img
                                                            src={imagePreview}
                                                            alt="New Preview"
                                                            className="img-thumbnail"
                                                            style={{ maxHeight: '200px' }}
                                                        />
                                                        <p className="text-muted mt-1">New image preview</p>
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

                                        <div className="col-md-12">
                                            <div className="mb-4">
                                                {editorMode === 'wysiwyg' ? (
                                                    <ReactQuill
                                                        ref={quillRef}
                                                        theme="snow"
                                                        value={formData.content}
                                                        onChange={(content, delta, source, editor) => {
                                                            const html = editor.getHTML();
                                                            setFormData(prev => ({ ...prev, content: html }));
                                                        }}
                                                        modules={modules}
                                                        formats={formats}
                                                        placeholder="Write your blog content here..."
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
                                                                {showHtmlPreview ? 'Edit HTML' : 'Preview Blog'}
                                                            </button>
                                                        </div>

                                                        {showHtmlPreview ? (
                                                            <div
                                                                className="border p-3 bg-white"
                                                                style={{ pointerEvents: 'auto' }}
                                                                dangerouslySetInnerHTML={{ __html: sanitizeHtml(formData.content) }}
                                                                onClick={(e) => {
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
                                                                placeholder="Write your HTML blog content here..."
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
                                                        options={categoryOptions}
                                                        value={categoryOptions.filter(opt => formData.categories.includes(opt.value))}
                                                        onChange={handleCategoryChange}
                                                        isLoading={loading}
                                                    />

                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Tags <span className="text-danger">*</span></label>
                                                    <CreatableSelect
                                                        isMulti
                                                        options={tagsOptions}
                                                        value={tagsOptions.filter(opt => formData.tags.includes(opt.value))}
                                                        onChange={handleTagsChange}
                                                        isLoading={loading}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Status <span className="text-danger">*</span></label>
                                                    <div
                                                        className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
                                                        style={{ maxWidth: "fit-content" }}
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
                                                            className={`btn ${!formData.status ? 'btn-primary' : 'btn-dark'} rounded-pill`}
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

                                        <div className="d-flex justify-content-end">
                                            <button
                                                type="submit"
                                                className="btn btn-primary custom-submit-button"
                                                disabled={sending}
                                            >
                                                {sending ? "Updating..." : "Update Blog"}
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
    );
};

export default UpdateBlog;
