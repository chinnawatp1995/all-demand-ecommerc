const NavigationData = [
  {
    my_profile: [
      {
        left_icon_name: 'edit-3',
        label: 'Edit Profile',
      },
      {
        left_icon_name: 'shopping-bag',
        label: 'Orders',
      },
      {
        left_icon_name: 'heart',
        label: 'Wishlist',
      },
      {
        left_icon_name: 'dollar-sign',
        label: 'My Wallet',
      },
      {
        left_icon_name: 'credit-card',
        label: 'Payment Methods',
      },
      {
        left_icon_name: 'percent',
        label: 'Coupons',
      },
      {
        left_icon_name: 'bell',
        label: 'Notifications',
      },
    ],
  },
  {
    settings: [
      {
        section_title: 'Messaging',
        labels: [
          {
            label: 'Notification Preferences',
            has_route: true,
            type: 'Link',
          },
          {
            label: 'Email',
            has_route: false,
            type: 'Link',
          },
          {
            label: 'SMS & Alert',
            has_route: false,
            type: 'Link',
          },
        ],
      },
      {
        section_title: 'Appearance',
        labels: [
          {
            label: 'Theme',
            type: 'Switch',
          },
        ],
      },
      {
        section_title: 'Other',
        labels: [
          {
            label: 'Languages',
            has_route: true,
            type: 'Link',
          },
          {
            label: 'Currency',
            has_route: false,
            type: 'Link',
          },
        ],
      },
    ],
  },
];

// Exporting
export default NavigationData;
