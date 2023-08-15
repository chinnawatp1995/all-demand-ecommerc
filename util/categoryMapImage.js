
export default categoryImageUri = (category) => {
    switch (category) {
        case 'fish':
            return require('../assets/images/category_image/fish.jpg');
        case 'meat':
            return require('../assets/images/category_image/meat.jpg');
        case 'noodle':
            return require('../assets/images/category_image/noodle.jpg');
        case 'seasoning':
            return require('../assets/images/category_image/seasoning.jpg');
        case 'tofu':
            return require('../assets/images/category_image/tofu.jpg');
        default:
            return ;
    }
};

