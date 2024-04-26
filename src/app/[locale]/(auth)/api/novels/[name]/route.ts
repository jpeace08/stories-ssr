import { NextResponse } from 'next/server';

import { logger } from '@/libs/Logger';

export const GET = async () => {
  try {
    let fetchChapter = await fetch(
      'https://truyenchu.vn/api/services/chapter-option?type=chapter_option&data=801',
      {
        next: { revalidate: 10 },
      },
    ).then((res) => res.text());
    fetchChapter = `${fetchChapter}`;
    const re = /chuong-(\d+)-(-?[a-z]-?)+/g;
    const matchResult = [...fetchChapter.matchAll(re)];
    const chaptersData: any[] = [];
    let setChaptersData: any = {};
    matchResult.forEach((res) => {
      chaptersData.push({
        uri: res[0],
        number: res[1],
      });
      setChaptersData = {
        ...setChaptersData,
        [`${res[1]}`]: `${res[0]}`,
      };
    });

    logger.info('Get list chapter successfully');

    return NextResponse.json(
      { data: { chaptersData, setChaptersData } },
      { status: 200 },
    );
  } catch (error) {
    logger.error(error, 'An error occurred while getting list chapter');

    return NextResponse.json({ data: null }, { status: 500 });
  }
};

// export const POST = async (request: Request) => {
//   await request.json();
//   const parse = GuestbookValidation.safeParse(json);

//   if (!parse.success) {
//     return NextResponse.json(parse.error.format(), { status: 422 });
//   }

//   try {
//     const guestbook = await db
//       .insert(guestbookSchema)
//       .values(parse.data)
//       .returning();

//     logger.info('A new guestbook has been created');

//     return NextResponse.json({}, { status: 200 });
//   } catch (error) {
//     logger.error(error, 'An error occurred while creating a guestbook');

//     return NextResponse.json({}, { status: 500 });
//   }
// };

// export const PUT = async (request: Request) => {
//   const json = await request.json();
//   const parse = EditGuestbookValidation.safeParse(json);

//   if (!parse.success) {
//     return NextResponse.json(parse.error.format(), { status: 422 });
//   }

//   try {
//     await db
//       .update(guestbookSchema)
//       .set({
//         ...parse.data,
//         updatedAt: sql`(strftime('%s', 'now'))`,
//       })
//       .where(eq(guestbookSchema.id, parse.data.id))
//       .run();

//     logger.info('A guestbook entry has been updated');

//     return NextResponse.json({});
//   } catch (error) {
//     logger.error(error, 'An error occurred while updating a guestbook');

//     return NextResponse.json({}, { status: 500 });
//   }
// };

// export const DELETE = async (request: Request) => {
//   const json = await request.json();
//   const parse = DeleteGuestbookValidation.safeParse(json);

//   if (!parse.success) {
//     return NextResponse.json(parse.error.format(), { status: 422 });
//   }

//   try {
//     await db
//       .delete(guestbookSchema)
//       .where(eq(guestbookSchema.id, parse.data.id))
//       .run();

//     logger.info('A guestbook entry has been deleted');

//     return NextResponse.json({});
//   } catch (error) {
//     logger.error(error, 'An error occurred while deleting a guestbook');

//     return NextResponse.json({}, { status: 500 });
//   }
// };
