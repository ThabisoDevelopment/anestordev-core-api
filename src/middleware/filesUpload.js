import multer from 'multer'
import path from 'path'

const storageEngine = multer.diskStorage({
    destination: 'images',
    filename: (request, file, callback) => {
        const customFilename = file.fieldname+ "-" + Date.now() + path.extname(file.originalname)
        // console.log(file)
        callback(null, customFilename)
    }
})

const validateImage = (file, callback) => {
    const allowedTypes = /jpg|jpeg|png|gif/
    if (!allowedTypes.test(path.extname(file.originalname))) callback('File must an Image')
    if (!allowedTypes.test(file.mimetype)) callback('Mime type Says its not an Image')
    callback(null, true)
}

const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 3000000 },
    fileFilter: (request, file, callback) => validateImage(file, callback)
})

export default upload