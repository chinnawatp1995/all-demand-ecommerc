import Mastercard from '../assets/icons/svg/Mastercard.svg';
import AmazonPay from '../assets/icons/svg/AmazonPay.svg';
import Upi from '../assets/icons/svg/Upi.svg';
import DebitCard from '../assets/icons/svg/DebitCard.svg';
import Google from '../assets/icons/svg/Google.svg';
import {scale} from 'react-native-size-matters';

const ICON_SIZE = scale(35);

const PaymentMethodsData = [
  {
    id: 1,
    label: 'Master Card',
    icon: <Mastercard width={ICON_SIZE} height={ICON_SIZE} />,
    is_selected: false,
  },
  {
    id: 2,
    label: 'Amazon Pay',
    icon: <AmazonPay width={ICON_SIZE} height={ICON_SIZE} />,
    is_selected: false,
  },
  {
    id: 3,
    label: 'UPI',
    icon: <Upi width={ICON_SIZE} height={ICON_SIZE} />,
    is_selected: true,
  },
  {
    id: 4,
    label: 'Debit/Credit Card',
    icon: <DebitCard width={ICON_SIZE} height={ICON_SIZE} />,
    is_selected: false,
  },
  {
    id: 5,
    label: 'Google Pay',
    icon: <Google width={ICON_SIZE} height={ICON_SIZE} />,
    is_selected: false,
  },
];

// Exporting
export default PaymentMethodsData;
