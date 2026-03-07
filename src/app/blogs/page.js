import { Post } from "./post";

function page() {
  return (
    <div className="mt-24">
      <h1 className="text-3xl font-bold mx-auto container  text-foreground ">Blogs Posts</h1>
      <Post />
    </div>
  );
}

export default page;