

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CardContent, CardFooter } from '@/components/ui/card'

const ShoppingProductTile = ({product}) => {
  return (
    <div>
        <div className='relative'>
            <img src={product?.image} alt={product?.title} className='w-full h-[300px] object-cover rounded-t-lg' />
            {
                product?.salePrice > 0 ?
                <Badge className='absolute top-2 left-2 bg-red-400 hover:bg-red-500'>
                    Sale
                </Badge>
                :
                null
            }
        </div>
        <CardContent>
            <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
            <div className='flex items-center justify-between mb-2'>
                <span className='text-md text-muted-foreground'>{product?.category[0].toUpperCase() + product?.category.slice(1)}</span>
                <span className='text-md text-muted-foreground'>{product?.brand[0].toUpperCase() + product?.brand.slice(1)}</span>
            </div>
            <div className='flex items-center justify-between mb-2'>
                <span className={ `${product?.salePrice > 0 ? 'line-through' : ' '} text-lg font-semibold text-primary`}>
                    ${product?.price}
                    </span>
                {
                    product?.salePrice > 0 ?(
                    <span className='text-lg font-semibold text-primary'>
                        ${product?.salePrice}
                    </span>
                    )
                    :
                    null
                }
            </div>
        </CardContent>
        <CardFooter>
            <Button className='w-full'>Add to Cart</Button>
        </CardFooter>
    </div>
  )
}

export default ShoppingProductTile