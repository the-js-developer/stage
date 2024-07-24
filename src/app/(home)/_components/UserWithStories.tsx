"use client";
import Image from 'next/image';
import { UserData } from 'src/utils/types';

type UserWithStoriesProps =  {
    user: UserData;
    viewStory: (id: string) => void
  }
export default function UserWithStories({user, viewStory}: UserWithStoriesProps) {
    return(
    <>
        <div
          className='flex flex-col justify-items-start'
          onClick={() => viewStory(user.id)}
        >
          <Image
              src={user.img}
              alt="User Avatar"
              width={80}
              height={60}
          />
          <div className='w-20 truncate'>{user.insta_handle}</div>
        </div>
    </>)
  }
