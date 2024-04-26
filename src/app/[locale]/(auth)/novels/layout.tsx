import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { LogOutButton } from '@/components/LogOutButton';
import { BaseTemplate } from '@/templates/BaseTemplate';

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('DashboardLayout');

  return (
    <BaseTemplate
      leftNav={
        <>
          <li>
            <Link
              href="/novels"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {t('novel_link')}
            </Link>
          </li>
          {/* <li>
            <Link
              href="/dashboard/user-profile/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {t('user_profile_link')}
            </Link>
          </li> */}
        </>
      }
      rightNav={
        <>
          <li>
            <LogOutButton />
          </li>

          {/* <li>
            <LocaleSwitcher />
          </li> */}
        </>
      }
    >
      {children}
    </BaseTemplate>
  );
}
