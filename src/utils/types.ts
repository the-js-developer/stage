export type UserData =  {
    id: string;
    insta_handle: string;
    img: string;
}

export type Header = {
    heading: string;
    subheading: string;
    profileImage: string;
}

export type Story = {
    id: string;
    header: Header;
    url: string;
}