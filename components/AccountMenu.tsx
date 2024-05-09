import Link from "next/link";

export function AccountMenu() {
  return (
    <Link
      href='/account/signin'
      className='px-4 py-3 text-white bg-black font-semibold hover:bg-black/80'
    >
      Sign In
    </Link>
  );
}
