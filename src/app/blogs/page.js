"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PostCard from '@/components/PostCard';
import Link from 'next/link';

function BlogsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/get_posts');
        setPosts(response.data.posts || []);
      } catch (error) {
        // Keep console log for debugging; toast can be re-enabled if desired
        console.error('Error fetching posts', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Blog posts</h1>
        <p className="mt-2 text-gray-600">Read articles, tutorials and announcements. {posts.length > 0 && `Showing ${posts.length} ${posts.length === 1 ? 'post' : 'posts'}.`}</p>
      </header>

      <section aria-live="polite">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
        ) : (
          <div>
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl font-medium text-gray-800">No posts yet</p>
                <p className="mt-2 text-gray-500">We don't have any blog posts at the moment. Check back later or add a new post from the admin area.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-6">
                {posts.map((post) => (
                  <div key={post._id} className="flex  justify-center items-center">
                    <Link href={post.imageUrl}>
                      <PostCard
                        src={post.imageUrl}
                        date={post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
                        heading={post.title}
                        description={post.description}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  )
}

export default BlogsPage
