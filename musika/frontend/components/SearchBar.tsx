// components/SearchBar.tsx
import { useState, FormEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from './ui/use-toast';


type Props = {
    searching: boolean,
    setSearching: Dispatch<SetStateAction<boolean>>,
}

function SearchBar({searching,setSearching}: Props) {
    const [query, setQuery] = useState<string>('');
    const router = useRouter();

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Handle search logic here (e.g., redirect, API call, etc.)
    console.log('Searching for:', query);
    // Example: Redirect to a search results page
    if (query){
        router.push(`/search?query=${encodeURIComponent(query)}`);
    }else{
        toast({
            variant: "success",
            description: "Search query must not be empty.",
            duration: 1500,
        })
    }
    };


    useEffect(() => {
        // router.push("#searching")
    },[searching])

  return ( 
    
    <form onSubmit={handleSearch} className="flex w-full">
        <Link href={"/"} className='grid w-10' onClick={() => setSearching(!searching)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 my-auto" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </Link>
        <div className='flex justify-end w-full'>
            <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                autoFocus={true}
                className="mr-2 max-h-10 py-0"
            />
            <Button type="submit">
                <SearchIcon />
            </Button>
        </div>
    </form>
    
  );
};

export default SearchBar;