import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";

type Context = {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, {params}: Context) {
    try{
        const {id}= await params;
        const camperId = Number(id);
        if(Number.isNaN(camperId)){
            return NextResponse.json({message: 'Invalid camper id.'}, {status: 400});
        }
        const {data} = await api.get(`/campers/${camperId}`);
        return NextResponse.json(data);
    } catch{
        return NextResponse.json({message: 'Error fetching camper data.'}, {status: 500});
    }
}