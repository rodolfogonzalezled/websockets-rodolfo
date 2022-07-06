module.exports = class ProductContainer {

    products = [];

    add(product) {
        let productAdded;
        if (this.products.length) {
            let newId = this.products[this.products.length - 1].id + 1;
            productAdded = { id: newId, ...product };
        } else {
            productAdded = { id: 1, ...product };
        }
        this.products.push(productAdded);
        return productAdded;
    }

    getById(id) {
        let product = this.products.find(product => product.id == id);
        return product ?? { error: "Producto no encontrado" };
    }

    getAll() {
        return this.products;
    }

    put(id, product) {
        let productUpdate = this.products.find(product => product.id == id);
        if (productUpdate) {
            productUpdate.title = product.title;
            productUpdate.price = product.price;
            productUpdate.thumbnail = product.thumbnail;
            return productUpdate;
        } else {
            return { error: "Producto no encontrado" };
        }
    }

    deleteById(id) {
        if (this.products.find(product => product.id == id)) {
            this.products = this.products.filter(product => product.id != id);
        } else {
            return { error: "Producto no encontrado" };
        }
    }
}
