import {Router} from 'express'

import {createNewproduct, getProducts, getProductsById,deleteProduct,getContratos,firmadeContrato,UpdateProducts,SelectProduct,ConfirmCot,RejectCot,updateCotizaDetallesS,updateCotizaDetallesN} from '../controllers/products.controller.js'

const router = Router();
import {ruta} from '../app.js';
import path from 'path';

router.get('/',(req,res) => {
    

})

// Mirar cotizaciones
router.get('/products',getProducts);

//router.get('/products/count',getTotalProducts);

//


//Crear Cotizaciones
router.get('/products/create',(req , res)=>{
    res.render(path.join(ruta+'/view/create.ejs'));
});

router.post('/createProducts',createNewproduct);


// Actualizar Cotizaciones

router.get('/products/edit/:id', SelectProduct);

router.post('/UpdateProducts',UpdateProducts);

//Eliminar

router.get('/products/delete/:id',deleteProduct);


//Validar un producto

router.get('/products/:id',getProductsById);

//Confirmar una cotizacion

router.get('/products/confirm/:id',ConfirmCot);

//Rechazar una cotizacion

router.get('/products/reject/:id',RejectCot);

//Confirmar una cotizacion detalle

router.get('/UpdateDetallesS/:id',updateCotizaDetallesS);

///Rechazar una cotizacion detalle

router.get('/UpdateDetallesN/:id',updateCotizaDetallesN);

router.get('/contrato/:id',getContratos);

router.post('/contratosFirma',firmadeContrato);

export default router