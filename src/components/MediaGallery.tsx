import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Image, Video, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import MediaPopup from './MediaPopup';

type MediaItem = {
  id: number;
  type: 'photo' | 'video';
  src?: string;
  alt?: string;
  youtubeId?: string;
  title?: string;
};

const MediaGallery = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("photos");
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const dummyPhotos: MediaItem[] = Array.from({ length: 6 }, (_, i) => ({
    id: i + 18,
    type: 'photo',
    src: `/lovable-uploads/gallery/${i + 18}.jpg`,
    alt: `Gallery image ${i + 1}`, 
  }));

  const dummyVideos: MediaItem[] = [
    { id: 1, type: 'video', youtubeId: "psADPWdT35I", title: "Road Safety Awareness" },
    { id: 2, type: 'video', youtubeId: "IRwxCRYy4WQ", title: "Pedestrian Safety Tips" },
    { id: 3, type: 'video', youtubeId: "t4vPloIg9EM", title: "Safe Crossing Techniques" },
    { id: 4, type: 'video', youtubeId: "Li00UqtJ0Nw", title: "Traffic Rules Education" },
    { id: 5, type: 'video', youtubeId: "VduEKQd3iP4", title: "Road Safety for Children" },
    { id: 6, type: 'video', youtubeId: "DYL9mZcnUno", title: "Community Safety Initiatives" },
  ];

  const getActiveItems = () => activeTab === "photos" ? dummyPhotos : dummyVideos;

  const handleItemClick = (index: number) => {
    setCurrentItemIndex(index);
    setPopupOpen(true);
  };

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10" id="gallery-content">
          <span className="badge bg-primary/20 text-primary rounded-full px-3 py-1 text-sm">Media Gallery</span>
          <h2 className="text-3xl font-bold mt-3 text-white">Our Gallery</h2>
          <p className="mt-4 text-gray-300">
            Explore our collection of photos and videos showcasing our pedestrian safety initiatives and community impact.
          </p>
        </div>

        <Tabs
          defaultValue="photos"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-800/50 border border-gray-700 p-1">
              <TabsTrigger
                value="photos"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Image size={18} />
                Photos
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Video size={18} />
                Videos
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[500px]">
            <TabsContent value="photos" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {dummyPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="relative overflow-hidden rounded-lg bg-gray-800 aspect-video group cursor-pointer"
                    onClick={() => handleItemClick(index)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <p className="text-white p-4 text-sm font-medium">{photo.alt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {dummyVideos.map((video, index) => (
                  <div
                    key={video.id}
                    className="relative overflow-hidden rounded-lg bg-gray-800 aspect-video cursor-pointer"
                    onClick={() => handleItemClick(index)}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="flex justify-center mt-10">
          <Link to="/gallery">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
              See More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <MediaPopup
        items={getActiveItems()}
        currentIndex={currentItemIndex}
        open={popupOpen}
        onOpenChange={setPopupOpen}
        onNavigate={setCurrentItemIndex}
      />
    </section>
  );
};

export default MediaGallery;
