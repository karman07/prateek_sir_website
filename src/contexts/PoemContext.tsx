import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const API_KEY = "AIzaSyBJSUUitKb4OzBdMTqnpuNm5zwnvieqGxg";
const PLAYLIST_ID = "PLVCEF4zOWjkiB3U_NbdAjYEiydh0NdSTx";

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

interface PlaylistItemSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    high?: { url: string; width: number; height: number };
    standard?: { url: string; width: number; height: number };
    maxres?: { url: string; width: number; height: number };
  };
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: {
    kind: string;
    videoId: string;
  };
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

interface PlaylistItem {
  kind: string;
  etag: string;
  id: string;
  snippet: PlaylistItemSnippet;
}

interface YoutubeApiResponse {
  kind: string;
  etag: string;
  items: PlaylistItem[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

const PoemContext = createContext<{
  videos: Video[];
  loading: boolean;
}>({
  videos: [],
  loading: true,
});

export const usePoems = () => useContext(PoemContext);

export const PoemProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlaylistVideos = async (
    pageToken = "",
    accum: Video[] = []
  ): Promise<void> => {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("playlistId", PLAYLIST_ID);
    url.searchParams.set("key", API_KEY);
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    try {
      const res = await fetch(url.toString());
      const data: YoutubeApiResponse = await res.json();

      if ("error" in data) {
        console.error("YouTube API Error:", (data as any).error);
        setLoading(false);
        return;
      }

      const newVideos = data.items.map((item) => {
        const snippet = item.snippet;
        // Safe thumbnail url with fallback
        const thumbnailUrl =
          snippet.thumbnails?.medium?.url ||
          snippet.thumbnails?.default?.url ||
          "";

        return {
          id: snippet.resourceId.videoId,
          title: snippet.title,
          description: snippet.description,
          thumbnail: thumbnailUrl,
          videoUrl: `https://www.youtube.com/watch?v=${snippet.resourceId.videoId}`,
        };
      });

      const combined = [...accum, ...newVideos];

      if (data.nextPageToken) {
        await fetchPlaylistVideos(data.nextPageToken, combined);
      } else {
        setVideos(combined);
        setLoading(false);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylistVideos();
  }, []);

  return (
    <PoemContext.Provider value={{ videos, loading }}>
      {children}
    </PoemContext.Provider>
  );
};
