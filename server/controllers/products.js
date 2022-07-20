import {v4 as uuid} from 'uuid';

let products = []

export const getProducts = (req, res) => {
	  res.send(products);
}

export const getProduct = (req, res) => {
	const {id} = req.params;
	const product = products.find(product => product.id === id);
	if (product) {
		res.send(product);
	}
	res.status(404).send({message: 'Product not found'});
}

export const addProduct = (req, res) => {
	const product = {
		id: uuid(),
		name: req.body.name,
		price: req.body.price
	}
	if (product.name && product.price) {
		products.push(product);
		res.send(product);
	}
	else {
		res.status(400).send("Bad request");
	}	
	
}

// export const updateProduct = (req, res) => {
// 	const {id} = req.params;
// 	const product = products.find(product => product.id === id);
// 	if (product) {
// 		product.name = req.body.name;
// 		product.price = req.body.price;
// 		res.send(product);
// 	}
// 	res.status(404).send({message: 'Product not found'});
// }

// export const deleteProduct = (req, res) => {
// 	const {id} = req.params;
// 	if(id) {
// 		const product = products.find(product => product.id === id);
// 		if (product) {
// 			products = products.filter(product => product.id !== id);
// 			res.send(product);

// 		}
// 		res.status(404).send();
// 	}
// 	res.status(400).send("Bad request");
// }
	
