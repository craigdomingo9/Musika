"use client";
import { useEffect, useState } from 'react';
import DashboardBusinessInfo from './DashboardBusinessInfo'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Inventory from '../Inventory/Inventory';
import Subscriptions from '../Subscriptions/Subscriptions';
import BusinessSubscription from '../Subscriptions/BusinessSubscription';
import Profile from '../Profile/Profile';
import Analytics from '../Analytics/Analytics';


type Props = {
    page: string;
}

function Dashboard({page}: Props) {
    const [selectedTab, setSelectedTab] = useState(page);
    const router = useRouter();
    const code = Cookies.get("business_code")

    const handleTabChange = (value: string) => {
        router.push(`/b/${code}/admin?page=${value}`);
        setSelectedTab(value);
    };

    useEffect(() => {
        
    },[selectedTab])
    
  return (
    <div className='w-full flex flex-col min-h-screen sm:w-[35rem] md:w-[40rem] lg:w-[42rem] xl:w-[50rem] sm:mx-auto mb-2'>
        <DashboardBusinessInfo />
        
        <Tabs defaultValue={selectedTab} onValueChange={handleTabChange} className='max-w-full sm:m-4'>
            <div className='overflow-scroll max-w-full'>
                <TabsList className='overflow-x-scroll flex'>
                    <TabsTrigger value="home">Home</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                    <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="home">
                <BusinessSubscription extensive={false}/>
            </TabsContent>
            <TabsContent value="analytics">
                <Analytics />
            </TabsContent>
            <TabsContent value="inventory">
                <Inventory />
            </TabsContent>
            <TabsContent value="subscriptions">
                <Subscriptions />
            </TabsContent>
            <TabsContent value="profile">
                <Profile />
            </TabsContent>
        </Tabs>
        
        {/* <DashboardAnalytics /> */}
    </div>
  )
}

export default Dashboard