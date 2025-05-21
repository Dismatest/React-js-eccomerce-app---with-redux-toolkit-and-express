import { filterOptions } from '@/config'
import { Label } from '@radix-ui/react-dropdown-menu'
import React, { Fragment } from 'react'
import { Checkbox } from '../ui/checkbox'

const ProductFilter = ({filters, handleFilters}) => {
  return (
    <div className='bg-background rounded-md shadow-sm'>
        <div className='bg-slate-100 p-3 box-border'>
            <h3 className='text-lg font-bold text-center'>Filters</h3>
        </div>
        <div className='p-4 space-y-4'>
            {
                Object.keys(filterOptions).map((keyItem) => <Fragment key={keyItem}>
                    <div className='text-lg font-medium'>
                        {keyItem}
                    </div>
                    <div className='grid gap-2'>
                        {
                            filterOptions[keyItem].map((item) => <Fragment key={item.id}>
                                <Label className='flex items-center gap-2'>
                                    <Checkbox onCheckedChange={()=>handleFilters(keyItem, item.id)} 
                                    checked={
                                        filters && Object.keys(filters).length > 0 &&
                                        filters[keyItem] && filters[keyItem].indexOf(item.id) > -1
                                    }
                                    />
                                    {item.label}
                                </Label>
                            </Fragment>)
                        }
                    </div>
                </Fragment>)
            }
        </div>
    </div>
  )
}

export default ProductFilter