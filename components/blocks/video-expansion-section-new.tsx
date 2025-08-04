"use client";

import ScrollExpandMedia from "@/components/blocks/scroll-expansion-hero";
import { useEffect } from "react";

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContent;
}

const sampleMediaContent: MediaContentCollection = {
  video: {
    src: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761",
    poster:
      "https://images.pexels.com/photos/1560969184/pexels-photo-1560969184.jpeg",
    background:
      "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=1920&auto=format&fit=crop",
    title: "Travel Around the World",
    date: "Global Destinations",
    scrollToExpand: "Scroll to Explore",
    about: {
      overview:
        "Embark on a journey around the world through this immersive travel experience. Discover breathtaking destinations, from bustling airports to serene landscapes, as you explore the beauty of global travel and adventure.",
      conclusion:
        "This interactive video component brings the excitement of world travel to life, allowing you to experience the thrill of discovering new destinations through an engaging scroll experience.",
    },
  },
  video2: {
    src: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761",
    poster:
      "https://images.pexels.com/photos/1560969184/pexels-photo-1560969184.jpeg",
    background:
      "https://images.pexels.com/photos/1560969184/pexels-photo-1560969184.jpeg",
    title: "Mountain Adventures",
    date: "Alpine Destinations",
    scrollToExpand: "Scroll to Explore",
    about: {
      overview:
        "Experience the majesty of mountain landscapes through stunning aerial footage. From snow-capped peaks to lush valleys, discover the natural beauty that awaits adventurous travelers.",
      conclusion:
        "This breathtaking journey showcases the raw power and serene beauty of mountain destinations, inspiring wanderlust for high-altitude adventures.",
    },
  },
  video3: {
    src: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761",
    poster:
      "https://images.pexels.com/photos/1560969184/pexels-photo-1560969184.jpeg",
    background:
      "https://images.pexels.com/photos/1560969184/pexels-photo-1560969184.jpeg",
    title: "Tropical Paradise",
    date: "Island Getaways",
    scrollToExpand: "Scroll to Explore",
    about: {
      overview:
        "Immerse yourself in the tranquility of tropical paradises. Crystal clear waters, pristine beaches, and swaying palm trees create the perfect backdrop for unforgettable island experiences.",
      conclusion:
        "This serene journey transports you to the world's most beautiful tropical destinations, where relaxation meets natural wonder.",
    },
  },
  video4: {
    src: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761",
    poster:
      "https://images.pexels.com/photos/1560969184/pexels-photo-1560969184.jpeg",
    background:
      "https://images.pexels.com/photos/1560969184/pexels-photo-1560969184.jpeg",
    title: "Urban Exploration",
    date: "City Adventures",
    scrollToExpand: "Scroll to Explore",
    about: {
      overview:
        "Discover the vibrant energy of modern cities around the world. From iconic skylines to bustling streets, experience the cultural diversity and architectural marvels of urban destinations.",
      conclusion:
        "This dynamic exploration captures the essence of city life, showcasing the unique character and charm of metropolitan destinations worldwide.",
    },
  },
  video5: {
    src: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761",
    poster:
      "https://images.pexels.com/photos/1560969184/pexels-photo-1560969184.jpeg",
    background:
      "https://images.pexels.com/photos/1560969184/pexels-photo-1560969184.jpeg",
    title: "Desert Wonders",
    date: "Arid Landscapes",
    scrollToExpand: "Scroll to Explore",
    about: {
      overview:
        "Journey through the mesmerizing landscapes of desert regions. Experience the stark beauty of sand dunes, ancient rock formations, and the dramatic play of light and shadow in these vast, open spaces.",
      conclusion:
        "This captivating exploration reveals the hidden beauty of desert destinations, where solitude meets spectacular natural wonders.",
    },
  },
};

const MediaContent = ({ mediaType }: { mediaType: "video" | "image" }) => {
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
        {currentMedia.title}
      </h2>
      <p className="text-lg mb-8 text-black dark:text-white">
        {currentMedia.about.overview}
      </p>

      <p className="text-lg mb-8 text-black dark:text-white">
        {currentMedia.about.conclusion}
      </p>
    </div>
  );
};

export const VideoExpansionTextBlend = () => {
  const mediaType = "video";
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event("resetSection");
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansionTextBlend = () => {
  const mediaType = "image";
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event("resetSection");
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const VideoExpansion = () => {
  const mediaType = "video";
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event("resetSection");
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansion = () => {
  const mediaType = "image";
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event("resetSection");
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

const VideoExpansionSection = () => {
  const mediaType = "video";
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event("resetSection");
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export default VideoExpansionSection;
