class FileController {

    uploadImage(request, response) {
        response.send({ success: 1 })
    }
}

export default new FileController