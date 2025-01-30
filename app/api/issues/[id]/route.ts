import { IssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json();
    try {
        IssueSchema.parse(body);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid Issue' }, { status: 400 });
    }
    const issue = prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        },
    });
    if (!issue) {
        return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 });
    }
    const updatedIssue = prisma.issue.update({
        where: {
            id: parseInt(params.id)
        },
        data: {
            title: body.title,
            description: body.description
        }
    });
    return NextResponse.json(updatedIssue);


}