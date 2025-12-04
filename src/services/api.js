// In your Home.jsx or wherever you fetch featured audio
const fetchFeaturedAudio = async () => {
  try {
    const apiUrl =
      import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
    const response = await fetch(`${apiUrl}/audio/featured/?page_size=50`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching featured audio:', error);

    // Return mock data if API fails
    return getMockFeaturedAudio();
  }
};

// Mock data function
const getMockFeaturedAudio = () => {
  return {
    results: [
      {
        id: 1,
        title: 'Relaxing Rain Sounds',
        creator_name: 'Nature Sounds Co.',
        category: 'ASMR',
        duration: '45:30',
        description: 'Gentle rain sounds for relaxation and sleep',
        thumbnail_url:
          'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0',
      },
      {
        id: 2,
        title: 'Meditation Guide',
        creator_name: 'Mindful Moments',
        category: 'Guided Meditation',
        duration: '20:15',
        description: 'Guided meditation for stress relief',
        thumbnail_url:
          'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
      },
      {
        id: 3,
        title: 'Focus Music',
        creator_name: 'Productive Audio',
        category: 'Music',
        duration: '60:00',
        description: 'Concentration-enhancing music',
        thumbnail_url:
          'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
      },
    ],
  };
};
