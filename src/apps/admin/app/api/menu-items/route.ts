import {NextRequest, NextResponse} from 'next/server'

export async function POST(
    request: NextRequest
) {
    console.log(request.body);

    try {
        const menuItems = request.body;

        console.log(menuItems);

        return NextResponse.json();
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
