import { NextRequest, NextResponse } from "next/server";
import {NEXT_PUBLIC_AWS_TOKEN} from "@/helpers/localVariables";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const shortName = url.searchParams.get('shortName');

    if (!shortName) return NextResponse.json({ error: 'shortName is required' }, { status: 400 });
    const res = await fetch(shortName, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${NEXT_PUBLIC_AWS_TOKEN}`,
        },
    });

    return res.ok 
        ? NextResponse.json(await res.json()) 
        : NextResponse.json({ error: 'Failed to fetch external events' }, { status: 500 });
}
