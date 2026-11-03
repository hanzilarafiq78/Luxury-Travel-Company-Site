// ═══════════════════════════════════════════════════════════════
// ELYSIAN — Chapter Video & Imagery Stage
// High-Resolution Photorealistic Background Layer for Regional Frontiers
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import './ChapterVideoStage.css';

interface ChapterMedia {
  id: string;
  chapterIndex: number;
  title: string;
  poster: string;
  coords: string;
}

const CHAPTER_MEDIA: ChapterMedia[] = [
  {
    id: 'tropical',
    chapterIndex: 2,
    title: 'The Tropical Frontier',
    poster: '/images/sanctuary_tetiaroa.jpg',
    coords: "08°20'N, 115°13'E • FRENCH POLYNESIA",
  },
  {
    id: 'jungle',
    chapterIndex: 3,
    title: 'Into the Wild',
    poster: '/images/sanctuary_mashpi.jpg',
    coords: "00°45'S, 77°12'W • AMAZON BASIN",
  },
  {
    id: 'desert',
    chapterIndex: 4,
    title: 'The Silent Desert',
    poster: '/images/sanctuary_wadirum.jpg',
    coords: "24°30'N, 137°20'E • WADI RUM VALLEY",
  },
  {
    id: 'alpine',
    chapterIndex: 5,
    title: 'Above the Clouds',
    poster: '/images/sanctuary_zermatt.jpg',
    coords: "46°01'N, 07°44'E • VALAIS ALPS",
  },
];

interface ChapterVideoStageProps {
  activeChapter: number;
  scrollProgress: number;
}

export function ChapterVideoStage({ activeChapter }: ChapterVideoStageProps) {
  // Always maintain the stage once rendered to avoid black unmount flashes
  const currentChapter = activeChapter >= 2 && activeChapter <= 5 ? activeChapter : 2;

  return (
    <div className="chapter-video-stage visible">
      {CHAPTER_MEDIA.map((item) => {
        const isActive = item.chapterIndex === currentChapter;

        return (
          <div
            key={item.id}
            className={`chapter-video-panel ${isActive ? 'active' : ''}`}
            aria-hidden={!isActive}
          >
            {/* Cinematic High-Res Image Backdrop */}
            <img
              src={item.poster}
              alt={item.title}
              className="chapter-video-poster"
              loading="eager"
            />

            {/* Gradient Scrims for Text Contrast */}
            <div className="chapter-video-overlay" />
          </div>
        );
      })}
    </div>
  );
}

export default ChapterVideoStage;
