export const adminNavigations = [
  {
    name: 'Dashboard',
    path: '/dashboard/admin',
    icon: 'Dashboard',
  },
  {
    label: 'General',
    type: 'label',
  },
  {
    name: 'Payments',
    path: '/dashboard/admin/payment',
    icon: 'Payment',
    // badge: { value: '20+', color: 'secondary' },
  },
  {
    label: 'Management',
    type: 'label',
  },
  {
    name: 'Account',
    icon: 'Person',
    children: [
      {
        name: 'General',
        path: '/dashboard/admin/account/general',
        iconText: 'G',
      },
      {
        name: 'Notifications',
        path: '/dashboard/admin/account/notifications',
        iconText: 'N',
      },
      {
        name: 'Social Links',
        path: '/dashboard/admin/account/social-links',
        iconText: 'S',
      },
      {
        name: 'Change Password',
        path: '/dashboard/admin/account/change-password',
        iconText: 'P',
      },
    ],
  },
  {
    name: 'Student',
    icon: 'Student',
    children: [
      {
        name: 'Student Profile',
        path: '/dashboard/admin/student/[student-name]',
        iconText: 'SP',
      },
    ],
  },
  {
    name: 'Teacher',
    icon: 'Teacher',
    children: [
      {
        name: 'Teacher Profile',
        path: '/dashboard/admin/teacher/[teacher-name]',
        iconText: 'TP',
      },
      {
        name: 'Add teacher',
        path: '/dashboard/admin/teacher/add',
        iconText: 'Add',
      },
    ],
  },
  {
    name: 'Course',
    icon: 'Course',
    children: [
      {
        name: 'Create Course',
        path: '/dashboard/admin/course/create',
        iconText: 'CC',
      },
      {
        name: 'Update Course',
        path: '/dashboard/admin/course/update',
        iconText: 'UC',
      },
    ],
  },
  {
    name: 'Class',
    icon: 'Class',
    children: [
      {
        name: 'Create Class',
        path: '/dashboard/admin/class/create',
        iconText: 'CC',
      },
      {
        name: 'Update Class',
        path: '/dashboard/admin/class/update',
        iconText: 'UC',
      },
    ],
  },
  {
    name: 'Blog',
    icon: '',
    path: '/dashboard/admin/blog',
  },
];
