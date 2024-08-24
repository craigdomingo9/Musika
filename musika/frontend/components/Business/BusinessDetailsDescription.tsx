"use client"
import { cn } from "@/lib/utils";
import { useState } from "react";
import { format } from 'date-fns';


type Props = {
    details: Business
}

function BusinessDetailsDescription({details}: Props) {

    let [truncate, setTruncate] = useState<boolean>(true);

    
    const truncatefn = (text: string, length: number, suffix: string = '...'): string => {
        if (text.length <= length) return text;
        return text.substring(0, length) + suffix;
    };

    const created_at = format(new Date(details?.created_at), 'd MMMM yyyy');

  return (
    <>
    <div className="my-auto" onClick={() => setTruncate(!truncate)}>
            <p className="font-bold opacity-80 text-lg">{details.name}</p>
            <p className="text-xs opacity-70">Joined: {created_at}</p>
            <div className={cn("text-sm")}>
                {truncate ? (
                truncatefn(details.description,60,"...")
                ) : 
                details.description
                }
                <p className="text-blue-700 text-xs">Read {truncate ? "more" : "less"}</p>
            </div>
        </div>
    </>
  )
}


export default BusinessDetailsDescription