
export interface Contact {
    id: number;
    name: string;
    job: string;
    department: string;
    status: 'Đang hoạt động' | 'Tạm vắng' | 'Hoạt động hôm qua' | 'Hoạt động 2 giờ trước';
    email: string;
    location: string;
    avatar: string;
    initials: string;
    favorite: boolean;
    groups: string[];
    note: string;
}

export const contactsData: Contact[] = [
    {
        id: 1,
        name: 'Nguyễn Mai',
        job: 'Nhà thiết kế sản phẩm',
        department: 'Thiết kế',
        status: 'Đang hoạt động',
        email: 'mai.nguyen@mam.studio',
        location: 'Hồ Chí Minh',
        avatar: 'https://i.pravatar.cc/150?img=47',
        initials: 'NM',
        favorite: true,
        groups: ['Đội ngũ thiết kế', 'Mầm Studio'],
        note: 'Cùng phụ trách hướng hình ảnh và trải nghiệm cho website Mộc.'
    },
    {
        id: 2,
        name: 'Trần Minh Tuấn',
        job: 'Lập trình viên frontend',
        department: 'Phát triển',
        status: 'Đang hoạt động',
        email: 'tuan.tran@mam.studio',
        location: 'Hồ Chí Minh',
        avatar: '',
        initials: 'MT',
        favorite: false,
        groups: ['Dự án Mộc'],
        note: 'Phụ trách phát triển giao diện người dùng.'
    },
    {
        id: 3,
        name: 'Phạm Thảo Linh',
        job: 'Nhà thiết kế thương hiệu',
        department: 'Thiết kế',
        status: 'Đang hoạt động',
        email: 'linh.pham@mam.studio',
        location: 'Hồ Chí Minh',
        avatar: 'https://i.pravatar.cc/150?img=44',
        initials: 'TL',
        favorite: true,
        groups: ['Đội ngũ thiết kế'],
        note: 'Phụ trách nhận diện thương hiệu.'
    },
    {
        id: 4,
        name: 'Lê Hoàng Nam',
        job: 'Quản lý dự án',
        department: 'Vận hành',
        status: 'Tạm vắng',
        email: 'nam.le@mam.studio',
        location: 'Hồ Chí Minh',
        avatar: '',
        initials: 'HN',
        favorite: false,
        groups: ['Dự án Mộc', 'Mầm Studio'],
        note: 'Điều phối tiến độ và công việc của dự án.'
    },
    {
        id: 5,
        name: 'Vũ Ngọc Anh',
        job: 'Biên tập nội dung',
        department: 'Nội dung',
        status: 'Hoạt động 2 giờ trước',
        email: 'anh.vu@mam.studio',
        location: 'Hà Nội',
        avatar: '',
        initials: 'NA',
        favorite: true,
        groups: ['Dự án Mộc'],
        note: 'Phụ trách nội dung website.'
    },
    {
        id: 6,
        name: 'Đỗ Bảo Châu',
        job: 'Nhà thiết kế trải nghiệm',
        department: 'Thiết kế',
        status: 'Đang hoạt động',
        email: 'chau.do@mam.studio',
        location: 'Hồ Chí Minh',
        avatar: '',
        initials: 'BC',
        favorite: false,
        groups: ['Đội ngũ thiết kế'],
        note: 'Phụ trách nghiên cứu trải nghiệm người dùng.'
    },
    {
        id: 7,
        name: 'Nguyễn Đức Huy',
        job: 'Lập trình viên backend',
        department: 'Phát triển',
        status: 'Hoạt động hôm qua',
        email: 'huy.nguyen@mam.studio',
        location: 'Đà Nẵng',
        avatar: '',
        initials: 'DH',
        favorite: false,
        groups: ['Dự án Mộc'],
        note: 'Phụ trách hệ thống phía máy chủ.'
    },
    {
        id: 8,
        name: 'Bùi Khánh Vy',
        job: 'Chuyên viên truyền thông',
        department: 'Nội dung',
        status: 'Hoạt động 2 giờ trước',
        email: 'vy.bui@mam.studio',
        location: 'Hồ Chí Minh',
        avatar: '',
        initials: 'KV',
        favorite: false,
        groups: ['Mầm Studio'],
        note: 'Phụ trách truyền thông và mạng xã hội.'
    },
    {
        id: 9,
        name: 'Phan Quốc Bảo',
        job: 'Lập trình viên frontend',
        department: 'Phát triển',
        status: 'Đang hoạt động',
        email: 'bao.phan@mam.studio',
        location: 'Hồ Chí Minh',
        avatar: '',
        initials: 'QB',
        favorite: false,
        groups: ['Dự án Mộc'],
        note: 'Tham gia phát triển giao diện.'
    },
    {
        id: 10,
        name: 'Hoàng Thu Hà',
        job: 'Chuyên viên nhân sự',
        department: 'Vận hành',
        status: 'Tạm vắng',
        email: 'ha.hoang@mam.studio',
        location: 'Hà Nội',
        avatar: '',
        initials: 'TH',
        favorite: false,
        groups: ['Mầm Studio'],
        note: 'Phụ trách công tác nhân sự.'
    },
    {
        id: 11,
        name: 'Đặng Minh Khoa',
        job: 'Thiết kế UI/UX',
        department: 'Thiết kế',
        status: 'Đang hoạt động',
        email: 'khoa.dang@mam.studio',
        location: 'Hồ Chí Minh',
        avatar: '',
        initials: 'MK',
        favorite: false,
        groups: ['Đội ngũ thiết kế'],
        note: 'Thiết kế giao diện ứng dụng.'
    },
    {
        id: 12,
        name: 'Trương Gia Hân',
        job: 'Content Marketing',
        department: 'Nội dung',
        status: 'Hoạt động hôm qua',
        email: 'han.truong@mam.studio',
        location: 'Cần Thơ',
        avatar: '',
        initials: 'GH',
        favorite: false,
        groups: ['Mầm Studio'],
        note: 'Phụ trách nội dung marketing.'
    }
];