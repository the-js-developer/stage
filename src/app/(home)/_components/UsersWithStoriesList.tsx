"use client"
import { useState } from 'react';
import Stories from 'react-insta-stories';
import { fetchUserStories } from "src/utils/fetchServerData";
import { Story, UserData } from "src/utils/types";
import UserWithStories from 'src/app/(home)/_components/UserWithStories';

type UsersWithStoriesProps =  {
    usersList: UserData[];
  }

export default function UsersWithStoriesList({usersList}: UsersWithStoriesProps) {
    const [isUserStoriesVisible, setIsUserStoriesVisible] = useState(false);
    const [stories, setStories] = useState<Story[]>([]);
    const viewStory = async (userId: string) => {
        const storiesList = await fetchUserStories(userId);
        if(storiesList.length) {
            setStories(prevStories => [...prevStories, ...storiesList])
            setIsUserStoriesVisible(true);
        }
    }

    const moveToNextUser = () => {
        setStories([]);
        viewStory('2');
    }

    const backToHomeScreen = () =>{
        setIsUserStoriesVisible(false);
        setStories([]);
    }
    return<>
        {!isUserStoriesVisible ? (<div className="flex justify-between space-x-4 w-full mt-4">
            {usersList?.map((user) => <UserWithStories key={user.id} user={user} viewStory={viewStory} />)}
        </div>):
        <>
        <div
            className='float-right relative z-10 font-bold pointer text-white'
            onClick={backToHomeScreen}
        >X</div>
        <div className="h-screen w-full fixed top-0 left-0">
            {stories.length && (<Stories
                stories={stories}
                defaultInterval={5000}
                width='100vw'
                height='100vh'
                onAllStoriesEnd={moveToNextUser}
            ></Stories>)}
        </div></> }
    </>
  }
