"use client";

import Image from "next/image";
import { getPostImageUrl } from "@/utils/getImageUrl";
import { Post } from "../page";
import { BeerStyles } from "@/components/BeerStyles";
import { Heart } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface Props {
  post: Post;
}

export function PostItem({ post }: Props) {
  const imageUrl = getPostImageUrl(post.image_path);
  
  // Default values for missing data
  const beerData = {
    number: '---', // No number field in Post yet, could add later
    name: post.title,
    country: post.country || 'Unknown',
    brewery: post.brewery || 'Unknown',
    style: post.style || 'Unknown',
    ibu: post.ibu || '-',
    abv: post.abv || '-',
    comment: post.content,
    date: new Date(post.created_at).toLocaleDateString('ja-JP'),
    chart: post.radar || {
      bitterness: 0,
      aroma: 0,
      sweetness: 0,
      body: 0,
      sharpness: 0
    }
  };

  const chartData = [
    { subject: '苦味', A: beerData.chart.bitterness, fullMark: 5 },
    { subject: '香り', A: beerData.chart.aroma, fullMark: 5 },
    { subject: '甘み', A: beerData.chart.sweetness, fullMark: 5 },
    { subject: 'コク', A: beerData.chart.body, fullMark: 5 },
    { subject: 'キレ', A: beerData.chart.sharpness, fullMark: 5 },
  ];

  return (
    <div className="relative w-full max-w-[550px] mx-auto mb-12">
      <BeerStyles />
      
      {/* カード本体 */}
      <div className="craft-paper w-full aspect-[4/5] md:aspect-[1/1.1] relative p-8 rounded-[2px] shadow-xl flex flex-col">
        
        {/* 上部レイアウト: 左（テキスト）右（写真） */}
        <div className="flex gap-6 h-[60%]">
          
          {/* 左: テキスト情報 */}
          <div className="flex-1 flex flex-col pt-2">
            {/* No. & Date */}
            <div className="flex justify-between items-baseline border-b border-gray-300 border-dashed pb-2 mb-4">
              <span className="font-eng-hand text-gray-500 text-sm tracking-wider">No. {beerData.number}</span>
              <span className="font-eng-hand text-gray-400 text-xs">{beerData.date}</span>
            </div>

            {/* Beer Name */}
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 leading-tight mb-1 line-clamp-2">
              {beerData.name}
            </h2>
            
            {/* Brewery & Country */}
            <div className="mb-6">
              <div className="text-sm text-gray-600 font-serif mb-1 flex items-center gap-2">
                <span className="w-1 h-1 bg-orange-400 rounded-full"></span>
                {beerData.brewery}
              </div>
              <div className="text-xs text-gray-500 pl-3">{beerData.country}</div>
            </div>

            {/* スペック表（手書きメモ風） */}
            <div className="mt-auto bg-orange-50/50 p-3 rounded-lg rotate-[-1deg] border border-orange-100">
              <div className="flex justify-between items-center mb-2 border-b border-orange-200 pb-1">
                <span className="text-xs font-bold text-orange-800/70">STYLE</span>
                <span className="text-sm font-serif text-gray-700 truncate max-w-[100px]">{beerData.style}</span>
              </div>
              <div className="flex justify-around">
                <div className="text-center">
                  <span className="block text-[10px] text-orange-800/60 font-bold">ABV</span>
                  <span className="font-eng-hand text-xl text-gray-800">{beerData.abv}%</span>
                </div>
                <div className="w-px bg-orange-200 h-8 mx-2"></div>
                <div className="text-center">
                  <span className="block text-[10px] text-orange-800/60 font-bold">IBU</span>
                  <span className="font-eng-hand text-xl text-gray-800">{beerData.ibu}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右: 写真エリア */}
          <div className="w-[45%] relative pt-2">
            <div className="relative bg-white p-2 pb-6 shadow-md transform rotate-2 transition-transform hover:rotate-0 duration-500">
              {/* クリップ装飾 */}
              <div className="clip-mark"></div>
              
              <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100 filter sepia-[0.1]">
                {imageUrl ? (
                  <Image 
                    src={imageUrl} 
                    alt={beerData.name} 
                    width={400}
                    height={600}
                    className="w-full h-full object-cover opacity-95"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 font-hand">No Image</div>
                )}
              </div>
              <div className="absolute bottom-2 right-3">
                <Heart className="w-4 h-4 text-red-400 fill-red-400/20" />
              </div>
            </div>
          </div>
        </div>

        {/* 下部レイアウト: チャート & コメント */}
        <div className="flex-1 flex gap-6 mt-4 pt-4 border-t-2 border-gray-100">
          
          {/* チャート（クレヨン風） */}
          <div className="w-[160px] h-[160px] relative flex-shrink-0 watercolor-bg rounded-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid stroke="#d6d3d1" strokeDasharray="3 3" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#78716c', fontSize: 11, fontFamily: 'Zen Kurenaido' }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                <Radar
                  name="Beer"
                  dataKey="A"
                  stroke="#f97316"
                  strokeWidth={2}
                  fill="#fdba74"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* コメント */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="relative p-4 bg-white/40 rounded-lg border border-dashed border-gray-300 h-full flex items-center">
              <p className="text-sm leading-relaxed text-gray-700 font-hand line-clamp-4">
                {beerData.comment}
              </p>
              {/* 引用符装飾 */}
              <span className="absolute -top-2 -left-1 text-4xl text-orange-200 font-serif leading-none">“</span>
              <span className="absolute -bottom-4 -right-1 text-4xl text-orange-200 font-serif leading-none rotate-180">“</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
