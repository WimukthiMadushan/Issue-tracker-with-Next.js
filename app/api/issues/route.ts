import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/prisma/client";

const createIssueSchema = z.object({
    title: z.string().min(1, "Title is Required").max(255),
    description: z.string().min(1, "Description is Required")
})
export async function POST(requset: NextRequest) {
    const body = await requset.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description }
    })

    return NextResponse.json(newIssue, { status: 200 })



}