import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { logger } from '@/libs/Logger';

export const runtime = 'edge';

export const GET = async (request: NextRequest) => {
  try {
    const partURLs: string[] = `${request.url}`
      .split('/')
      .filter((e: string) => e);
    let fetchChapter = await fetch(
      `https://truyenchu.vn/dai-quan-gia-la-ma-hoang/${partURLs[partURLs.length - 1]}`,
      {
        // next: { revalidate: 10 },
        cache: 'no-cache',
      },
    ).then((res) => res.text());
    fetchChapter = `${fetchChapter}`;
    const re = /itemprop="articleBody">(.*)<div id="chapter-append"><\/div>/gms;
    const matchResult = [...fetchChapter.matchAll(re)];
    if (matchResult.length <= 0) {
      return NextResponse.json({ data: null }, { status: 400 });
    }
    let data: string = '';
    const content = matchResult[0];
    if (Array.isArray(content) && content.length > 1) {
      data = `${content[1]}`;
      data = data
        .trim()
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/?p>/gi, '')
        .replace(/<div.*?>.*?<\/div>/gis, '')
        .replace(/<a.*?>.*?<\/a>/gis, '')
        .replace(/<script.*?>.*?<\/script>/gis, '');
    }

    logger.info('Get chapter content successfully');

    return NextResponse.json(
      { data: { uri: `${partURLs[partURLs.length - 1]}`, content: data } },
      { status: 200 },
    );
  } catch (error) {
    logger.error(error, 'An error occurred while getting list chapter');

    return NextResponse.json({ data: null }, { status: 500 });
  }
};
