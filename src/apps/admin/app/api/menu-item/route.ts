import {NextRequest, NextResponse} from 'next/server'
import {prisma} from "lib/prisma";

export async function POST(
    request: NextRequest
) {

    try {
        const data = await request.json();

        const resultLang = await prisma.menuLangItem.create({
            data: {
                menuLangId: data.menuLangId,
                title: data.title,
                url: data.url,
                order: data.order
            }
        })

        return NextResponse.json(resultLang);
    } catch (error) {
        return NextResponse.json({error: 'Internal server error'}, {status: 500})
    }
}
