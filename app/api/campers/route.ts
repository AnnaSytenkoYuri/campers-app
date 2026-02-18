import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get('page') ?? 1);
    const limit = Number(searchParams.get('limit') ?? 4);

    const params: Record<string, string | number | boolean> = {
      page,
      limit,
    };

    searchParams.forEach((value, key) => {
      if (key === 'page' || key === 'limit') return;

      if (value === 'true') {
        params[key] = true;
      } else {
        params[key] = value;
      }
    });

    const { data } = await api.get('/campers', { params });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: 'Failed to fetch campers',
      },
      { status: 500 }
    );
  }
}
