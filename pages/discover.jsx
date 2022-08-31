import Head from 'next/head'
import {useQuery} from 'react-query'
import getData from "../queries/getData";
import NFTCard from "../components/NFTCard";
import Filters from "../components/Filters";
import {useEffect, useState} from "react";
import {HomepageCategoriesQuery, HomepageFilteredProductsQuery, HomepageProductsQuery} from "../queries/HomepageQueries";
import {getNonForgets} from "../queries/NonForgetQueries"
import axios from 'axios';
import useFetch from '../helpers/useFetch';


async function handleProductFiltering({queryKey}) {
    console.log(queryKey);
    const [_] = queryKey
    if(_.length) {
        return await getData(HomepageFilteredProductsQuery, 'products', {categories: queryKey[0]})
    }

    return await getData(HomepageProductsQuery, 'products')
}


export default function Home() {
    const [selectedCategories, setSelectedCategories] = useState([])
    // const {data: products, isSuccess} = useQuery([selectedCategories], handleProductFiltering)
    // const {data: categories, isSuccess: categoriesSuccess } = useQuery("categories", async () => await getData(HomepageCategoriesQuery, 'categories'))
      const { data: nonforgets, error, loading } = useFetch('http://localhost:8055/items/NonForget?fields=id,title,description,rarity');


    console.log('nonforgets', nonforgets)
    

    const getSelectedCategories = (category) => {
        // console.log(category);
        if(selectedCategories.includes(category)){
            setSelectedCategories(selectedCategories.filter(item => item !== category))
            return
        }
        setSelectedCategories([...selectedCategories, category])
    }

    useEffect(() => {
        console.log(selectedCategories)
    },[selectedCategories])

    return (
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <Head>
                <title>Non-Forget Test App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Available Non-forgets</h2>

            {/* {categoriesSuccess && <Filters categories={categories} getSelectedCategories={getSelectedCategories}/> } */}

            {loading ? (<div><span>Loading...</span></div>) : (<div></div>) }
            
            {error ? (<div><span>{error}</span></div>) : (<div></div>) }

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {nonforgets && nonforgets.data.map(nonforget => <NFTCard
                    rarity={nonforget.rarity}
                    image="4aa18885-4f20-4aad-b9c8-8147d994e001"
                    title={nonforget.title}
                    description={nonforget.description}
                />)}
            </div>
        </div>
    )
}
