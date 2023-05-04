import {getConnection,sql} from '../database/connection.js';
import {queries} from '../database/querys.js';
import {ruta} from '../app.js';
import path from 'path';
import { Console } from 'console';

export const getProducts = async (req,res)=> {
    try
    {
        const pool = await getConnection()
        const  result = await pool.request()
         .query(queries.getAllproducts);

         console.log(result.recordset)
         res.render(path.join(ruta+'/view/index.ejs'),{results : result.recordset});
    }    
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}

export const createNewproduct = async (req,res) => {
    try
    {
        const NOMBRECOMPLETO = req.body.NOMBRECOMPLETO;
        const TIPOCOTIZAION = req.body.TIPOCOTIZACION;
        const ESTADO = req.body.ESTADO;

        
        if (NOMBRECOMPLETO == null || NOMBRECOMPLETO == '')
        {
            return res.status(400).json({msg: 'Digite el cliente'})
        }
        if (TIPOCOTIZAION == null)
        {
            return res.status(400).json({msg: 'Seleccion el tipo de cotizacion'})
        }
        if (ESTADO == null)
        {
            return res.status(400).json({msg: 'Seleccion el estado'})
        }
        

        const pool = await getConnection();
        
        var now = new Date();
        
        await pool.request()
        .input("A1",sql.VarChar,NOMBRECOMPLETO)
        .input("A2",sql.VarChar,TIPOCOTIZAION)
        .input("A3",sql.VarChar,ESTADO)    
        .query(queries.createProduct);
        res.redirect('/products');        
    }
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}


export const getProductsById = async (req,res)=> {
    try
    {
        const {id} = req.params;
        

        const pool = await getConnection();
        const result = await pool.request()
        .input("ID",sql.Int,id)
        .query(queries.getProductsById);

        const  result1 = await pool.request()
        .input("ID",sql.Int,id)
        .query(queries.DetallesProdudct);

        const imagenes = await pool.request()
        .query(queries.imagenesAlmacenes);

        const almacenes = await pool.request()
        .query(queries.almacenes);

        const i = 0;

        if (result.recordset[0].ESTADO == 'CONFIRMADO')
        {
            res.render(path.join(ruta+'/view/confirm.ejs'));
        }
        else if (result.recordset[0].ESTADO == 'RECHAZADO')
        {
            res.render(path.join(ruta+'/view/reject.ejs'));
        }
        else
        {
            res.render(path.join(ruta+'/view/detalle.ejs'),{cotizacion : result.recordset[0],detalle : result1.recordset,imagenes: imagenes.recordset,almacenes : almacenes.recordset,i:i});
        }        
    }    
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}

export const getContratos = async (req,res)=> {
    try
    {
        const {id} = req.params;
        

        const pool = await getConnection();
        const result = await pool.request()
        .input("ID",sql.Int,id)
        .query(queries.contratos);


        if (result.rowsAffected > 0 )
        {
            res.render(path.join(ruta+'/view/contrato.ejs'),{contratos : result.recordset[0]});
        }        
    }    
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}

export const firmadeContrato = async (req,res)=> {
    try
    {
        const id= req.body.IDCONTRATO;
        var firma = req.body.FIRMA;    

        const pool = await getConnection();
        const result = await pool.request()
        .input("ID",sql.Int,id)
        .input("FIRMA",sql.VarChar,firma)
        .input("TIENEFIRMA",sql.VarChar,'S')        
        .query(queries.firmaContrato);

        res.render(path.join(ruta+'/view/confirm.ejs'));
           
    }    
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}

export const deleteProduct = async (req,res)=> {
    try
    {
        const {id} = req.params;
    

        const pool = await getConnection();
        const result = await pool.request()
        .input("ID",sql.Int,id)
        .query(queries.deleteProductById);

        res.redirect('/products');
    }    
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}


export const getTotalProducts = async (req,res)=> {
    try
    {
        const pool = await getConnection()
        const  result = await pool.request()
         .query(queries.getTotal);


        res.json(result.recordset);
    }    
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}


export const UpdateProducts = async (req,res) => {

    try
    {
        const id = req.body.IDCOTIZACION;
        const NOMBRECOMPLETO = req.body.NOMBRECOMPLETO;
        const TIPOCOTIZACION = req.body.TIPOCOTIZACION;
        const ESTADO = req.body.ESTADO;

        if (NOMBRECOMPLETO == null || NOMBRECOMPLETO == '')
        {
            return res.status(400).json({msg: 'Digite el cliente'})
        }
        if (TIPOCOTIZACION == null)
        {
            return res.status(400).json({msg: 'Seleccion el tipo de cotizacion'})
        }
        if (ESTADO == null)
        {
            return res.status(400).json({msg: 'Seleccion el estado'})
        }

        console.log(id);
        const pool = await getConnection();
        
        
        await pool.request()
        .input("NOMBRECOMPLETO",sql.VarChar,NOMBRECOMPLETO)
        .input("TIPOCOTIZACION",sql.VarChar,TIPOCOTIZACION)
        .input("ESTADO",sql.VarChar,ESTADO)
        .input("ID",sql.Int,id)    
        .query(queries.UpdateProduct);
        res.redirect('/products');        
    }
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}



export const SelectProduct = async (req,res)=> {
    try
    {
        const {id} = req.params;
        

        const pool = await getConnection();
        const result = await pool.request()
        .input("ID",sql.Int,id)
        .query(queries.getProductsById);


        res.render(path.join(ruta+'/view/edit.ejs'),{results : result.recordset[0]});
    }    
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}

export const ConfirmCot = async (req,res)=> {
    try
    {
        const {id} = req.params;
        const IDCOTIZACIONDETALLES = req.body.IDCOTIZACIONDETALLES;
        console.log(IDCOTIZACIONDETALLES);
        
        
        const pool = await getConnection();
        const result = await pool.request()
        .input("ESTADO",sql.VarChar,'CONFIRMADO')
        .input("ID",sql.Int,id)
        .query(queries.UpdateStatus);

        
        res.render(path.join(ruta+'/view/confirm.ejs'));
    }    
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}

export const RejectCot = async (req,res)=> {
    try
    {
        const {id} = req.params;
        
        
        const pool = await getConnection();
        const result = await pool.request()
        .input("ESTADO",sql.VarChar,'RECHAZADO')
        .input("ID",sql.Int,id)
        .query(queries.UpdateStatus);

        
        res.render(path.join(ruta+'/view/reject.ejs'));
    }    
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}

export const updateCotizaDetallesS = async (req,res)=> {
    try
    {
        const {id} = req.params;
        
        console.log(id);
        const pool = await getConnection();
        const result = await pool.request()
        .input("APLICA",sql.VarChar,'SI')
        .input("IDDETALLE",sql.Int,id)
        .query(queries.UpdateDetalle);

        res.json({ user: 'geek' });

    }    
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}

export const updateCotizaDetallesN = async (req,res)=> {
    try
    {
        const {id} = req.params;
        
        console.log(id);
        const pool = await getConnection();
        const result = await pool.request()
        .input("APLICA",sql.VarChar,'NO')
        .input("IDDETALLE",sql.Int,id)
        .query(queries.UpdateDetalle);

        res.json({ user: 'geek' });
    }    
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}