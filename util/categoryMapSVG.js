import Fish from '../assets/icons/svg/categories/Fish.svg';
import Meat from '../assets/icons/svg/categories/Meat.svg';
import Noodle from '../assets/icons/svg/categories/Noodle.svg';
import Seasoning from '../assets/icons/svg/categories/Seasoning.svg';
import Tofu from '../assets/icons/svg/categories/Tofu.svg';
import { STANDARD_VECTOR_ICON_SIZE } from '../config/Constants';

categoryMapSVG = (image) => {  
    switch (image) {
      case 'fish':
        return <Fish width='100%' height='100%'/>;
      case 'meat':
        return <Meat width='100%' height='100%'/>;
      case 'noodle':
        return <Noodle width='100%' height='100%' />;
      case 'seasoning':
        return <Seasoning width='100%' height='100%'/>;
      case 'tofu':
        return <Tofu width='100%' height='100%' />;
      default:
        return ;
    }
  };

export default categoryMapSVG;