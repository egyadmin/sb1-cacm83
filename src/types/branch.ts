export interface Branch {
  id: string;
  name: string;
  nameEn: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  manager?: string;
  status: 'active' | 'inactive';
  type: 'main' | 'branch';
}

export const initialBranches: Branch[] = [
  {
    id: 'hq',
    name: 'المركز الرئيسي',
    nameEn: 'Head Office',
    location: 'الرياض',
    coordinates: { lat: 24.7136, lng: 46.6753 },
    status: 'active',
    type: 'main'
  },
  {
    id: 'riyadh',
    name: 'فرع الرياض',
    nameEn: 'Riyadh Branch',
    location: 'الرياض',
    coordinates: { lat: 24.7136, lng: 46.6753 },
    status: 'active',
    type: 'branch'
  },
  {
    id: 'madinah',
    name: 'فرع المدينة المنورة',
    nameEn: 'Madinah Branch',
    location: 'المدينة المنورة',
    coordinates: { lat: 24.4672, lng: 39.6139 },
    status: 'active',
    type: 'branch'
  },
  {
    id: 'qassim',
    name: 'فرع القصيم',
    nameEn: 'Qassim Branch',
    location: 'بريدة',
    coordinates: { lat: 26.3268, lng: 43.9719 },
    status: 'active',
    type: 'branch'
  },
  {
    id: 'jeddah',
    name: 'فرع جدة',
    nameEn: 'Jeddah Branch',
    location: 'جدة',
    coordinates: { lat: 21.5433, lng: 39.1728 },
    status: 'active',
    type: 'branch'
  },
  {
    id: 'tabuk',
    name: 'فرع تبوك',
    nameEn: 'Tabuk Branch',
    location: 'تبوك',
    coordinates: { lat: 28.3998, lng: 36.5715 },
    status: 'active',
    type: 'branch'
  },
  {
    id: 'qiddiya',
    name: 'فرع القدية',
    nameEn: 'Qiddiya Branch',
    location: 'القدية',
    coordinates: { lat: 23.7875, lng: 45.4375 },
    status: 'active',
    type: 'branch'
  },
  {
    id: 'abha',
    name: 'فرع أبها',
    nameEn: 'Abha Branch',
    location: 'أبها',
    coordinates: { lat: 18.2164, lng: 42.5053 },
    status: 'active',
    type: 'branch'
  },
  {
    id: 'dammam',
    name: 'فرع الدمام',
    nameEn: 'Dammam Branch',
    location: 'الدمام',
    coordinates: { lat: 26.4207, lng: 50.0888 },
    status: 'active',
    type: 'branch'
  },
  {
    id: 'tamamah',
    name: 'فرع التمامة',
    nameEn: 'Tamamah Branch',
    location: 'التمامة',
    coordinates: { lat: 24.7617, lng: 46.7292 },
    status: 'active',
    type: 'branch'
  }
];