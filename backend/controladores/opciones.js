exports.obtenerOpciones = (req,res) =>{
    const opciones = {
        hamburguesas:['Clasica','Hamburguesa de Pollo','Hamburguesa de Carne'],
        papas:['Rusticas','Fritas','Cheddar'],
        bebidas:['Coca-Cola','Sprite','Fanta']
    }
    res.json(opciones);
}