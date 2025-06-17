 // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            setFormData(prev => ({
                ...prev,
                featuredImage: file
            }));
        }
    };


