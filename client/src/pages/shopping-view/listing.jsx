import ProductFilter from "@/components/shopping-view/filter"
import { Button } from "@/components/ui/button"
import { sortOptions } from "@/config"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowDownUp} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchFilteredProducts } from "@/store/shop/shop-slice"
import ShoppingProductTile from "./product-tile"
import { createSearchParams, useSearchParams } from "react-router-dom"


const ShoppingListing = () => {

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const dispatch  = useDispatch();
  const { products } = useSelector((state) => state.shoppingProduct)
  const [searchParams, setSearchParams] = useSearchParams();
  

 
  const handleSortChange = (value) => {
    setSort(value);
  }

  const createSearchParamsHelper = (filterParams) => {
    const queryParams = [];
    for(const [key, value] of Object.entries(filterParams)){
      if(Array.isArray(value) && value.length > 0){
        const paramValue = value.join(',');
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
    return queryParams.join('&');
  }
}
//getSectionId is the category or brand, 
//getCurrentOption is the selected option
  const handleFilters = (getSectionId, getCurrentOption) => {
    
    let copyFilters = {...filters};
    //checking if the category or brand is already in the filters
    const indexOfCurrentSection = Object.keys(copyFilters).indexOf(getSectionId);
    if(indexOfCurrentSection === -1){
      copyFilters = {...copyFilters, [getSectionId]: [getCurrentOption]};
    }else{
      const indexOfCurrentOption = copyFilters[getSectionId].indexOf(getCurrentOption);
      if(indexOfCurrentOption === -1){
        copyFilters[getSectionId].push(getCurrentOption);
      }else{
        copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

   setFilters(copyFilters);
   sessionStorage.setItem('filters', JSON.stringify(copyFilters));
  }
//fetching the filtered products
  useEffect(() => {
    dispatch(fetchFilteredProducts())
  }, [dispatch])

  //setting the filters in the localStorage and sort to price-lowtohigh when the page loads
  useEffect(() => {
    setSort('price-lowtohigh');
    if(sessionStorage.getItem('filters') !== null){
      setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
    }
  }, [])

  //setting the filters in the search params to allow dispatching the filtered products
  useEffect(() => {
    //check if the filters is not empty
    if(filters && Object.keys(filters).length > 0){
      //create query string
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters])

  console.log(searchParams);
    return (
      <div className="grid grid-cols md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
        <ProductFilter filters={filters} handleFilters={handleFilters}/>
        <div className="bg-background w-full rounded-ld shadow-sm">
          <div className="box-content p-2 bg-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold">All Products</h3>
              <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">{products?.length} Products</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-1">
                            <ArrowDownUp className="h-4 w-4"/>
                            Sort by: Featured
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuRadioGroup value={sort} onValueChange={handleSortChange}>
                          {
                            sortOptions.map((item) => 
                            (<DropdownMenuRadioItem key={item.id} value={item.id}>{item.label}</DropdownMenuRadioItem>))
                          }
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {
              products && products.length > 0 ? products.map((product) => (
                <ShoppingProductTile key={product._id} product={product}/> 
              ))

              :
              <h3 className="text-lg font-bold">No products found</h3>
            }
          </div>
        </div>
      </div>
    )
  }
  
  export default ShoppingListing