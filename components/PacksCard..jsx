/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import Link from "next/link";

const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL;

export default function PacksCard({ image, title, description, price, callback }) {
  return (
    // <Link href={`/products/${category.slug}/${slug}`}>
    <a href="#" className="group">
      <div>
        <img
          className="w-full object-center object-cover group-hover:opacity-75"
          src={`${assetsUrl}/${image}?width=385&height=385`}
          alt="image"
        />
      </div>
      <div className="px-6 py-4">
        <h3 className="mt-4 text-m text-gray-700 text-center font-bold">{title}</h3>
        <span className="text-xs rounded-3xl p-5 inline-block text-center">
          {description}
        </span>
        <button onClick={callback} className="flex justify-center ml-auto mr-auto mt-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">BUY NOW</button>
        <span className="flex justify-center py-1 font-bold">
            € {price}
        </span>
      </div>
    </a>
    // </Link>
  );
}
