import { fetchUsersList } from "../utils/fetchServerData";
import UsersWithStoriesList from "./(home)/_components/UsersWithStoriesList";

export default async function Home() {
  const usersList = await fetchUsersList();
  return (
    <main className="flex h-screen flex-col items-center justify-between px-4">
      <div className="text-left w-full">
        <div className="text-2xl font-serif italic">Instagram</div>
        <UsersWithStoriesList usersList={usersList}/>
      </div>
    </main>
  );
}
