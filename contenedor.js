const fs = require('fs');

class Contenedor{
      constructor(fileName){
            this.filename = fileName;
      }
      
      async save(producto) {
            try {
                  if (fs.existsSync(`./${this.filename}`)) {
                        const data = await fs.promises.readFile(`./${this.filename}`, 'utf-8');
                        let prod = JSON.parse(data);
                        let ultimo = prod[prod.length-1];
                        producto.id = ultimo.id+1;
                        prod.push(producto)
                        fs.writeFileSync(`./${this.filename}`, JSON.stringify(prod, null, 2));
                  } else {
                        producto.id = 1;
                        let newArray = [];
                        newArray.push(producto);
                        fs.writeFileSync(`./${this.filename}`, JSON.stringify(newArray, null, 2));
                  }  
            }
            catch (err){
                  console.log(err);
            }
      }

      async getById(id) {
            try {
                  const data = await fs.promises.readFile(`./${this.filename}`, 'utf-8');
                  let prod = JSON.parse(data)
                  let producto = prod.find (p => p.id == id) || null;
                  console.log(producto);
                  return producto
            }
            catch {
                  console.log('No existe producto con ese nombre o id');
            }
      }

      async getAll() {
            try {
                  const data = await fs.promises.readFile(`./${this.filename}`, 'utf-8');
                  let prod = JSON.parse(data)
                  console.log(prod);
                  return prod
            }  
            catch {
                  console.log('No se encontro el producto');
            }
      }

      async deleteById(id) {
            try {
                  const data = await fs.promises.readFile(`./${this.filename}`, 'utf-8');
                  let prod = JSON.parse(data)
                  let producto = prod.find (p => p.id == id) || '';
                  if (producto != '') {
                        let indice = prod.indexOf(producto)
                        prod.splice(indice, 1);
                        fs.writeFileSync(`./${this.filename}`, JSON.stringify(prod, null, 2));
                        console.log('Se elimino el producto de ID '+id);
                  } else{
                        console.log("No existe producto con ese ID");
                  }
            }
            catch {
                  console.log('No se procuto');
            }
      }

      async deleteAll() {
            const data = await fs.promises.readFile(`./${this.filename}`, 'utf-8');
            let prod = JSON.parse(data)
            prod = [];
            fs.writeFileSync(this.filename, JSON.stringify(prod));
      }

      async updateById(nombre, precio, thumbnail, id) {
            try {
                  const data = await fs.promises.readFile(`./${this.filename}`, 'utf-8');
                  let prod = JSON.parse(data)
                  let producto = prod.find (p => p.id == id) || '';
                  if (producto != '') {
                        producto.nombre = nombre || producto.nombre;
                        producto.precio = precio || producto.precio;
                        producto.thumbnail = thumbnail || producto.thumbnail;
                        let indice = prod.indexOf(producto)
                        prod.slice(indice, 1, producto)
                        fs.writeFileSync(`./${this.filename}`, JSON.stringify(prod, null, 2));
                  } else {
                        console.log('No existe un producto con ese ID');
                  }
            }
            catch {
                  console.log('No se encontro el archivo');
            }
      }
}

module.exports = Contenedor