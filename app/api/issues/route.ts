import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { IssueSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(requset: NextRequest) {
    const session = getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const body = await requset.json();
    const validation = IssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description, status: body.status }
    })

    return NextResponse.json(newIssue, { status: 200 })



}