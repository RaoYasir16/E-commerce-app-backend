const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    image_path: {
        type: String,
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Product', productSchema);
