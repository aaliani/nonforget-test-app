import Link from 'next/link'

const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL

export default function NFTCard({image, title , description, rarity}) {
    return (
        // <Link href={`/products/${category.slug}/${slug}`}>
            <a href="#" className="group">
                <div>
                    <img className="w-full object-center object-cover group-hover:opacity-75" src={`${assetsUrl}/${image}?width=385&height=385`} alt="image" />
                </div>
                <div className="px-6 py-4">
                    <h3 className="mt-4 text-center text-m text-gray-700 mt-0 font-bold">
                        {title}
                    </h3>
                    <span className="text-s text-gray-500 mb-0 rounded-3xl bg-gray-200 p-5 inline-block my-10">
                            {description}
                        </span>
                    <p className="mt-1 text-center text-lg font-medium text-gray-900 my-3">
                        Rarity: {rarity}
                    </p>
                </div>
            </a>
        // </Link>
    )
}
