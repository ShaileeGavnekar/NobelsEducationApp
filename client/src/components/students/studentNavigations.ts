export const studentNavigations = [
  {
    label: 'Profile',
    type: 'label',
  },
  {
    name: 'Student Profile',
    path: '/dashboard/student',
    icon: 'Dashboard',
  },
  {
    label: 'Courses & Classes',
    type: 'label',
  },
  {
    name: 'Course',
    icon: 'Book',
    children: [
      {
        name: 'My Courses & Progress',
        path: '/admin/account/general',
        iconText: 'G',
      },
      {
        name: 'Explore Courses',
        path: '/admin/account/notifications',
        iconText: 'N',
      },
    ],
  },
  {
    name: 'My Classes',
    path: '/admin/payment',
    icon: 'Payment',
  },
  {
    label: 'Payments',
    type: 'label',
  },
  {
    name: 'Payment History',
    path: '/admin/payment',
    icon: 'Payment',
  },
];
