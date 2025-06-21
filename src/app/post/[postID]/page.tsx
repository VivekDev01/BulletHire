// app/post/[postID]/page.tsx
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: { postID: string };
}

const posts = [
  { postID: '1', title: 'Frontend Developer', description: 'React & Next.js expert needed' },
  { postID: '2', title: 'Backend Developer', description: 'Node.js & MongoDB expert' },
  // fake data for example
];

export default function PostPage({ params }: PostPageProps) {
  const post = posts.find((p) => p.postID === params.postID);

  if (!post) return notFound();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-2 text-gray-700">{post.description}</p>
    </div>
  );
}
