import { getCategories } from "@/services/queries/categories/getCategories";
import Link from "next/link";
import { AccountMenu } from "../AccountMenu";

export async function Header() {
  const categories = await getCategories();

  return (
    <header className='py-4 px-6'>
      <div className='flex items-center relative mb-6'>
        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-lg'>
          Showpo
        </span>
        <div className='ml-auto shrink-0'>
          <AccountMenu />
        </div>
      </div>
      <ul className='container flex items-center justify-center space-x-4'>
        {categories?.map((category) => (
          <li key={category?.uid}>
            <Link
              href={`/${category?.url_path}`}
              className='hover:underline text-sm uppercase'
            >
              <span>{category?.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
