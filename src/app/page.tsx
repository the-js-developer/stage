import UsersWithStoriesList from "src/app/(home)/_components/UsersWithStoriesList";
import { UserData } from "src/utils/types";
// this is server component , we can fetch the results here directly
// instead of calling the api.

const mockUserList: UserData[] = [{
  id: '1',
  insta_handle: 'mono_repo',
  img: 'images/person.svg'
},
{
  id: '2',
  insta_handle: 'micro_service_http_you',
  img: 'images/person.svg'
},
{
  id: '3',
  insta_handle: 'git_hub',
  img: 'images/person.svg'
},
{
  id: '4',
  insta_handle: 'telemetry',
  img: 'images/person.svg'
},
{
  id: '5',
  insta_handle: 'telemetry',
  img: 'images/person.svg'
},
{
  id: '6',
  insta_handle: 'telemetry',
  img: 'images/person.svg'
},
{
  id: '7',
  insta_handle: 'telemetry',
  img: 'images/person.svg'
}];
export default async function Home() {
  const usersList = mockUserList;
  return (
    <main className="flex h-screen flex-col items-center justify-between px-4">
      <div className="text-left w-full">
        <div className="text-2xl font-serif italic">Instagram</div>
        <UsersWithStoriesList usersList={usersList}/>
      </div>
    </main>
  );
}
