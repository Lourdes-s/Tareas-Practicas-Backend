import express from  'express'
import fileSystem  from 'fs'
import ResponseBuilder from '../builders/response.builders.js'

const productsRouter = express.Router()

productsRouter.get('/', async (req, res) => {
    try{
        const products = JSON.parse(await fileSystem.promises.readFile('./data/productos.json', {encoding: 'utf-8'}))
        const productosActivos = products.filter(product => product.active === true)
        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('productos obtenidos')
        .setPayload({
            products: productosActivos
        })
        .build()
        res.json(response)
    }
    catch(error){
        const response = new  ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage('error interno')
        .setPayload({
            detail: error.message
        })
        .build()
        res.status(500).json(response)
    }
})

productsRouter.get('/:product_id', async(req, res) => {
    const {product_id} = req.params
/*     const numericId = Number(product_id)
    if (isNaN(numericId) ||  numericId <= 0) {
        throw {code: 'ERR_HTTP_HEADERS_SENT', detail:  'id invalido'} 
    }  */
    try{
        const products = JSON.parse(await fileSystem.promises.readFile('./data/productos.json', {encoding:  'utf-8'}))
        const productoBuscado = products.find(product => product.id === Number(product_id))
        if(!productoBuscado){
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(404)
            .setMessage('No se encontro el producto')
            .setPayload({
                product: null
            })
            .build()
            res.status(404).json(response)
        }
        const response =  new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('producto obtenido')
        .setPayload({
            product: productoBuscado
        })
        .build()
        res.json(response)
    }
    catch (error){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage('error interno')
        .setPayload({
            detail: error.message
            })
            .build()
            res.status(500).json(response)
    }
})

productsRouter.delete('/:product_id', async (req, res) => {
    const {product_id} = req.params
    try{
        const products = JSON.parse(await fileSystem.promises.readFile('./data/productos.json', {encoding:'utf-8'}))
        const productoBuscado =  products.find(product => product.id === Number(product_id))
        if(!productoBuscado){
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(404)
            .setMessage('No se encontro el producto')
            .setPayload({
                product: null
                })
            .build()
            res.status(404).json(response)
        }
        productoBuscado.active = false;
        const response  = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('Producto eliminado')
        .setPayload({
            message:  'producto eliminado'
        })
        .build()
/*         await fileSystem.promises.writeFile('./data/productos.json', JSON.stringify(products, null,  await fileSystem.promises.writeFile('./data/productos.json', JSON.stringify(products, null, 2), { encoding: 'utf-8' }))) */
        res.json(response)
    }
    catch(error){
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage('error interno')
        .setPayload({
            detail: error.message
            })
            .build()
            res.status(500).json(response)
    }
})

export default  productsRouter
