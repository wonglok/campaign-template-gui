import Link from 'next/link'
import { useRouter } from 'next/router'
import { MenuItems } from './MenuItems'

export function Menu() {
  let router = useRouter()

  let getLinkClass = ({ path }) => {
    if (router.pathname === path) {
      return `mb-2 text-black bg-teal-300 rounded-xl`
    } else {
      return `mb-2 text-black bg-white rounded-xl`
    }
  }

  return (
    <ul className='menu rounded-box w-full bg-base-100 px-2 pt-2 shadow-xl first-letter:p-2'>
      <style
        dangerouslySetInnerHTML={{
          __html: /* css */ `

@font-face {
  font-family: 'daysregular';
  src: url('/font/days_regular_macroman/Days-webfont.eot');
  src: url('/font/days_regular_macroman/Days-webfont.eot?#iefix') format('embedded-opentype'),
    url('/font/days_regular_macroman/Days-webfont.woff') format('woff'),
    url('/font/days_regular_macroman/Days-webfont.ttf') format('truetype'),
    url('/font/days_regular_macroman/Days-webfont.svg#daysregular') format('svg');
  font-weight: normal;
  font-style: normal;
}

.daysfont {
  font-family: 'daysregular', 'Helvetica Neue', 'Helvetica', Arial, sans-serif;
}

      `,
        }}
      ></style>
      {/*  */}

      {/*  */}
      <li className='daysfont mb-2 flex items-center rounded-lg bg-gray-200 py-3 text-center text-3xl'>AGAPE</li>

      {MenuItems.map((it) => {
        return (
          <li key={it.id} className={getLinkClass({ path: it.link })}>
            <Link href={it.link}>{it.content}</Link>
          </li>
        )
      })}

      {/*  */}
    </ul>
  )
}
