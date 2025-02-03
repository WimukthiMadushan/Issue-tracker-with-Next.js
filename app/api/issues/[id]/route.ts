import authOptions from "@/app/auth/authOptions";
import { IssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const session = getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const body = await request.json();
    const validation = IssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    const issueId = Number(params.id);
    if (isNaN(issueId)) {
        return NextResponse.json({ error: "Invalid issue ID" }, { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
        where: { id: issueId },
    });

    if (!issue) {
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
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


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const session = getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const issue = prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });
    if (!issue)
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })
    await prisma.issue.delete({
        where: { id: parseInt(params.id) }
    });
    return NextResponse.json({});
}