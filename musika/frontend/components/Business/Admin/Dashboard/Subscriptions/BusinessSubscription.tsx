"use client";
import getBusinessSubscription from "@/utils/Business/getBusinessSubscription";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

type Props = {
    extensive: boolean;
};

function BusinessSubscription({ extensive }: Props) {
    const [businessSubscription, setBusinessSubscription] = useState<BusinessSubscription | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSubscription = async () => {
            try {
                const subscription_data = await getBusinessSubscription();
                setBusinessSubscription(subscription_data);
            } catch (err) {
                console.error("Failed to load subscription:", err);
                setError("Failed to load subscription data.");
            } finally {
                setLoading(false);
            }
        };

        loadSubscription();
    }, []);

    const capitalizeFirstLetter = (word: string): string => {
        return word ? word.charAt(0).toUpperCase() + word.slice(1) : '';
    };

    if (loading) {
        return <div className="text-center text-sm">Loading...</div>; // You can replace this with a spinner or skeleton loader
    }

    if (error) {
        return <div className="text-red-500">{error}</div>; // Display error message
    }

    return (
        <div className="pt-2 pl-2 grid">
            {businessSubscription && (
                <>
                    <Card className="bg-green-500 bg-opacity-90 text max-w-[25rem]">
                        <CardHeader>
                            <CardTitle>
                                <div className="w-full flex justify-between">
                                    <p>{businessSubscription.plan.name}</p>
                                    <p>{businessSubscription.status.status}</p>
                                </div>
                            </CardTitle>
                            <p>{capitalizeFirstLetter(businessSubscription.interval)}</p>
                        </CardHeader>
                        <CardContent />
                        <CardFooter>
                            <p className="text-[0.8rem] font-semibold">Expires on {businessSubscription.status.end_date}</p>
                        </CardFooter>
                    </Card>

                    {extensive && (
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle>
                                    <div>
                                        <p className="underline text-lg">Features of {businessSubscription.plan.name}</p>
                                    </div>
                                </CardTitle>
                                <CardDescription className="text-bold">
                                    <Accordion type="single" collapsible className="w-full">
                                        {businessSubscription.plan.features.map((feature, index) => (
                                            <AccordionItem key={`feature-${index}`} value={`item-${index}`}>
                                                <AccordionTrigger>{feature.name}</AccordionTrigger>
                                                <AccordionContent>
                                                    {feature.description}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                    <div className="mt-5">
                                        <p className="text-lg font-bold underline">Upgrade to {businessSubscription.next_plan.name}</p>
                                        <p className="pt-2 font-bold">Additional Features</p>
                                        <div>
                                            {businessSubscription.missing_features.map((missing_feature, index) => (
                                                <Accordion key={`missing-feature-${index}`} type="single" collapsible className="w-full">
                                                    <AccordionItem value={`missing-item-${index}`}>
                                                        <AccordionTrigger>{missing_feature.name}</AccordionTrigger>
                                                        <AccordionContent>
                                                            <p>{missing_feature.description}</p>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                    <Button variant={"outline"} className="mt-5 bg-color text-white">
                                                        Upgrade
                                                    </Button>
                                                </Accordion>
                                            ))}
                                        </div>
                                    </div>
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    )}
                </>
            )}
        </div>
    );
}

export default BusinessSubscription;