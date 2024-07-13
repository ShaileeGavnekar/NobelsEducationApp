export type Course = {
  avatar: string;
  name: string;
  description?: string;
  numberOfClasses: string;
  price: number;
  teacherIds: Array<string>;
  discount: number;
  subHeader: string;
  tags: Array<string>;
  ageGroup: string;
  courseProgress: string;
  courseLevel: string;
  _id: string;
  starred: boolean;
  curriculum: Array<string>;
  courseTimeline: string;
};
