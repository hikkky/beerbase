"use client";

import React from 'react';

export const BeerStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Zen+Kurenaido&family=Shippori+Mincho:wght@400;700&family=Patrick+Hand&display=swap');
    
    /* フォント定義 */
    .font-hand { font-family: 'Zen Kurenaido', sans-serif; }
    .font-eng-hand { font-family: 'Patrick Hand', cursive; }
    .font-serif { font-family: 'Shippori Mincho', serif; }

    /* 背景: リネン（布）のようなテクスチャ */
    .bg-linen {
      background-color: #e8e4dd;
      background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
    }

    /* クラフト紙の質感 */
    .craft-paper {
      background-color: #fcfbf9;
      background-image: url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
      box-shadow: 
        0 2px 4px rgba(0,0,0,0.05),
        0 10px 20px rgba(0,0,0,0.1);
    }

    /* 手書き風の破線ボーダー */
    .dashed-border {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23A89B8C' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    }

    /* 写真を留めるクリップ風装飾 (CSSのみで表現) */
    .clip-mark {
      width: 12px;
      height: 40px;
      background: #718096;
      border-radius: 10px;
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
      z-index: 20;
    }
    .clip-mark::after {
      content: '';
      position: absolute;
      top: 12px;
      left: 2px;
      right: 2px;
      bottom: 2px;
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 8px;
    }

    /* 水彩風の円（チャート背景） */
    .watercolor-bg {
      background: radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.05) 50%, transparent 70%);
    }

    /* スライダーのカスタマイズ（ナチュラル） */
    input[type=range] {
      -webkit-appearance: none;
      background: transparent;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 16px; width: 16px;
      background: #d97706;
      border: 2px solid #fff;
      border-radius: 50%;
      margin-top: -6px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
      cursor: pointer;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%; height: 4px;
      background: #e5e7eb;
      border-radius: 2px;
    }
  `}</style>
);
