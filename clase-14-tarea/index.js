import express from "express"

const app = express()
const PORT = 8000
app.use(express.json())

app.post('/register', (req, res) => {
    const response = {
        ok: false,
        status: 0,
        message: '',
        payload: {}
    }
    const { username, password } = req.body
    try {
        if(!username.trim()){
            response.ok = false
            response.status = 400
            response.message = 'Error de solicitud'
            response.payload.detail =  'El username ingresado es invalido'

        return res.json(response)
        }
        if(!password.trim()){
            response.ok = false
            response.status = 400
            response.message = 'Error de solicitud'
            response.payload.detail =  'El password ingresado es invalido'
            return res.json(response)
        }
        response.ok = true
        response.status = 201
        response.payload = {
            message: 'Usuario creado correctamente'
        }
        return res.json(response)
    }
    catch(error){
        response.ok = false
        response.status = 500
        response.message = 'Error interno'
        response.payload.detail = error.message
            return res.json(response)
        }
})





app.listen(PORT,  () => {
    console.log(`Server is running on: http://localhost:${PORT}`)
})
