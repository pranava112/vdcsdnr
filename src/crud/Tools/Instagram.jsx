import React, { memo, useEffect, useState } from "react";

const Instagram = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = "IGQWRNVzdEVDZAVVHhnb1JUSXU5OGtzMFlFNmMzQklmM1EwLW1OUURReWo2LUdzVEgyeGxaTjNkV2JwU1dHZAUpFTkViVmlfT1g4bDNkLTY4dm9oMjB4VEo3bmZAWMllfZAEthUUp4ZA0RCUExGVGt2c2VhZA0kySFBfZA00ZD";
   
    const userId = "17841471539775398";
    // 17843129187384660//college
    // 17841471539775398// myself

    const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink&access_token=${accessToken}`;

    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 id="hhh" className="text-3xl font-bold text-center mb-6 text-black">Vignan Degree College Instagram </h1>
      {error && <p className="text-red-500 text-center mb-4">Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            {post.media_type === "IMAGE" && (
              <img
                src={post.media_url}
                alt={post.caption || "Instagram post"}
                className="w-full h-56 object-cover"
              />
            )}
            {post.media_type === "VIDEO" && (
              <video controls className="w-full h-56 object-cover">
                <source src={post.media_url} type="video/mp4" />
              </video>
            )}
            <div className="p-4">
              <p className="text-sm text-gray-700 mb-2">{post.caption || "No caption available"}</p>
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                View on Instagram
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Instagram);


//completed finally on 25/12/2024