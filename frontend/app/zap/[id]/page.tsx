"use client";

import axios from "axios";
import { useEffect, useState } from 'react';
import { Appbar } from '@/components/Appbar';
import { useParams } from 'next/navigation';
import { BACKEND_URL } from '@/app/config';

interface Zap {
    id: string;
    triggerId: string;
    userId: number;
    actions: {
        id: string;
        zapId: string;
        actionId: string;
        sortingOrder: number;
        type: {
            id: string;
            name: string;
            image: string;
        } | null;
    }[];
    trigger: {
        id: string;
        zapId: string;
        triggerId: string;
        type: {
            id: string;
            name: string;
            image: string;
        } | null;
    } | null;
}

function useZap(id: string) {
    const [loading, setLoading] = useState(true);
    const [zap, setZap] = useState<Zap | null>(null);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zap/${id}`, {
            headers: {
                "Authorization": localStorage.getItem("token") || ""
            }
        }).then(res => {
            setZap(res.data.zap);
            setLoading(false);
        }).catch(() => {
            setZap(null);
            setLoading(false);
        });
    }, [id]);

    return {
        loading, zap
    }
}

function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center h-40">
            <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}

export default function ZapDetails() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    if (!id) {
        return <div>Error: ID not provided</div>;
    }

    const { loading, zap } = useZap(id);

    return (
        <div className="flex flex-col">
            <Appbar />
            <div className="flex justify-center pt-8">
                {loading ? (
                    <LoadingSpinner />
                ) : zap ? (
                    <div>
                        <h1 className="text-2xl font-bold">Zap Details</h1>
                        <div className="pt-4">
                            <h2>Trigger</h2>
                            <div>
                                <p>Name: {zap.trigger?.type?.name}</p>
                                {/* <img src={zap.trigger?.type?.image || ""} className="w-[30px] h-[30px]" alt="Trigger Image" /> */}
                            </div>
                        </div>
                        <div>
                            <h2>Actions</h2>
                            {zap.actions.map(action => (
                                <div key={action.id}>
                                    <p>Type: {action.type?.name}</p>
                                    {/* <img src={action.type?.image || ""} className="w-[30px] h-[30px]" alt="Action Image" /> */}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>No zap found.</div>
                )}
            </div>
        </div>
    );
};