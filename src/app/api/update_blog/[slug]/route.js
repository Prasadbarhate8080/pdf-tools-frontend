import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Blog from "@/models/Blog";

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { slug } = await params;
    const body = await request.json();

    const data = body.data;

    const updatedPost = await Blog.findOneAndUpdate(
      { slug },
      {
        title: data.title,
        slug: data.slug,
        description: data.description,
        imageUrl: data.imageUrl,
        toolName: data.toolName,
        content: data.content,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPost) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Blog updated successfully",
        post: updatedPost,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update blog" },
      { status: 500 }
    );
  }
}