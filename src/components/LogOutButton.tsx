'use client';

import { useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { useTranslations } from 'next-intl';

const LogOutButton = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  // const t = useTranslations('DashboardLayout');

  return (
    <Image
      src="https://cdn-icons-png.flaticon.com/512/10479/10479874.png"
      alt="Signout"
      onClick={() => signOut(() => router.push('/'))}
      width={0}
      height={0}
      sizes="100vw"
      className="image-logout"
    />
    // <button
    //   className="border-none text-gray-700 hover:text-gray-900"
    //   type="button"
    //   onClick={() => signOut(() => router.push('/'))}
    // >
    //   {t('sign_out')}
    // </button>
  );
};

export { LogOutButton };
