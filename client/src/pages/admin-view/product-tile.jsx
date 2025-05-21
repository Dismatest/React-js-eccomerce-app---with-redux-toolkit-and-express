

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

const AdminProductTile = ({product, setCurrentEditedProductId, setFormData, setOpenCreateProductDialog, handleProductDelete}) => {
  return (
    <Card className='w-full max-w-sm mx-auto'>
        <div className='relative'>
            <img src={product?.image} alt={product?.title} className='w-full h-[300px] object-cover rounded-t-lg' />
        </div>
        <CardContent>
            <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
            <div className='flex items-center justify-between mb-2'>
                <span className= {` ${product?.salePrice > 0 ? 'line-through' : ' '} text-lg font-semibold text-primary`}>${product?.price}</span>
                {
                    product?.salePrice > 0 ?
                    <span className='text-lg font-bold text-primary'>${product?.salePrice}</span>
                    :
                    null
                }
        
            </div>
        </CardContent>
        <CardFooter className='flex items-center justify-between'>
            <Button
            onClick={()=>{
                setCurrentEditedProductId(product?._id);
                setOpenCreateProductDialog(true);
                setFormData(product)
            }}
            >Edit</Button>
            <Button onClick={() => handleProductDelete(product?._id)}>Delete</Button>
        </CardFooter>
    </Card>
  )
}

export default AdminProductTile