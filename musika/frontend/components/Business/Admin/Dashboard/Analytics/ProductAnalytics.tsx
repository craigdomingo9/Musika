import getBusinessCode from "@/utils/Business/getBusinessCode"
import { useEffect, useState } from "react"
import AnalyticsTable from "./ProductAnalytics/AnalyticsTable"
import AnalyticsCompare from "./ProductAnalytics/AnalyticsCompare"

type Props = {}

function ProductAnalytics({}: Props) {
    const [productAnalytics, setProductAnalytics] = useState<ProductAnalytics[]>()
  useEffect(() => {
    async function getProductAnalytics(){
        const url = `http://localhost:8000/api/analytics/products/b/${getBusinessCode()}/`
    
        const response = await fetch(url, {
            method: "GET",
            headers: {
                accept: "application/json"
            },
        })
        .then((res) => res.json())
        .then((data) => {
            setProductAnalytics(data)
        })
    }   
    getProductAnalytics()
  },[])

  return (
    <div>

        {productAnalytics && (
            <>
                <AnalyticsTable productAnalytics={productAnalytics} />
                <AnalyticsCompare productAnalytics={productAnalytics} />
            </>
        )}
    </div>
  )
}

export default ProductAnalytics