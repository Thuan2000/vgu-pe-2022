export interface ITeamMember {
  name: string;
  position: string;
  imgUrl: string;
  description: string;
}

export const partners = [
  {
    logoUrl:
      "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/partner-1.png",
    websiteUrl: "https://vietphatgroup.com/",
  },
  {
    logoUrl:
      "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/partner-2.png",
    websiteUrl: "https://emolyze.tech/",
  },
  {
    logoUrl:
      "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/partner-3.png",
    websiteUrl: "http://biic.vn/",
  },
  {
    logoUrl:
      "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/partner-4.png",
    websiteUrl: "https://iec.itp.vn/",
  },
];

export const teamMembers: ITeamMember[] = [
  {
    name: "Đỗ Bá Hùng",
    position: "Chủ tịch Hội đồng Quản trị",
    description:
      "Là Tổng Giám Đốc điều hành của công ty Vietphatgroup. Có hơn 10 năm kinh nghiệp điều hành doanh nghiệp và làm việc với các doanh nghiệp ở khu công nghiệp",
    imgUrl:
      "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/khong-nguyen.jpg",
  },
  {
    name: "Nguyễn Như Ý",
    position: "Tổng Giám đốc Điều hành",
    description:
      "Giám sát và vận hành hoạt động của sàn SDConnect. Có hơn 4 năm kinh nghiệm làm việc trong lĩnh vực marketing",
    imgUrl:
      "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/nhu-nguyen.jpg",
  },
  {
    name: "Nguyễn Hữu Thuận",
    position: "Giám đốc Công nghệ",
    description:
      "Giám đốc Công nghệ Có hơn 4 năm kinh nghiệm làm việc trong lĩnh vuệc công nghệ, đặc biệt là lĩnh vực phát triển phần mềm và trí tuệ nhân tạo",
    imgUrl:
      "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/thuan-nguyen.jpg",
  },
  // {
  //   name: "Nguyễn Lương Bảo Châu",
  //   position: "Giám đốc Sáng tạo",
  //   description:
  //     "Có hơn 4 năm kinh nghiệm trong lĩnh vực thiết kế đồ họa, đặc biệt là trong lĩnh vực thiết kế giao diện phần mềm và thiết kế trải nghiệm người dùng",
  //   imgUrl:
  //     "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/chau-nguyen.jpg",
  // },
];

export const benefitMembers = [
  {
    count: 1,
    title: "benefit-1-title",
    imgUrl:
      "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/benefit-1.svg",
  },
  {
    count: 3,
    title: "benefit-3-title",
    imgUrl:
      "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/benefit-3.svg",
  },
  {
    count: 2,
    title: "benefit-2-title",
    imgUrl:
      "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/benefit-2.svg",
  },
  {
    count: 4,
    title: "benefit-4-title",
    imgUrl:
      "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/benefit-4.svg",
  },
];
