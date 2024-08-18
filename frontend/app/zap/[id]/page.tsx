"use client";

import { useParams } from 'next/navigation';

export default function ZapDetails() {
    const params = useParams();
    const { id } = params;

    return (
        <div>
            <h1>Zap Details for ID: {id}</h1>
        </div>
    );
};