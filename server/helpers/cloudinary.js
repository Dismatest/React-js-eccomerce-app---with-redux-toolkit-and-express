const cloudinary = require('cloudinary').v2;
const multer = require('multer');


cloudinary.config({
    cloud_name: 'dbldvpjah',
    api_key: '592434436114271',
    api_secret: 'oIYJ5fhfMSHHTBp5Qe5CVlyz3Jc'
});

const storage = multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto',
    })

    return result;
}

const upload = multer({ storage });

module.exports = {
    imageUploadUtil,
    upload
}