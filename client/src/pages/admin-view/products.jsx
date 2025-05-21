import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { addProductFormElements } from "@/config";
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {addNewProduct, deleteProduct, editProduct, fetchAllProducts}  from "@/store/admin/product-slice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "./product-tile";
import { Badge } from "lucide-react";

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: ''
}

const AdminProducts = () => {

  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedProductId, setCurrentEditedProductId] = useState(null)
  const dispatch = useDispatch();
  const {products} = useSelector((state)=>state.adminProducts)
  const {toast} = useToast();

  useEffect(()=>{
    dispatch(fetchAllProducts());
  }, [dispatch])


  function isFormValid(){
    return Object.keys(formData).map((key) => formData[key] !== '').every((key) => key)
  }

  function handleProductDelete(productId){
    dispatch(deleteProduct(productId)).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        toast(
          {
            title: data?.payload?.message,
            variant: 'success'
          }
        )
      }else{
        toast(
          {
            title: data?.payload?.message,
            variant: 'destructive'
          }
        )
      }
    })
  }

 
  function onSubmit(event){
      event.preventDefault();
      
      currentEditedProductId !== null ? 
      (
          dispatch(
           editProduct({
              id: currentEditedProductId,
              formData,
            })).then((data) => {
                if(data?.payload?.success){
                  dispatch(fetchAllProducts());
                  setFormData(initialFormData);
                  setImageFile(null);
                  setOpenCreateProductDialog(false);
                  toast(
                    {
                      title: data?.payload?.message,
                      variant: 'success'
                    }
                  )
                }else{
                  setOpenCreateProductDialog(false);
                  toast(
                    {
                      title: "Some error has occured",
                      variant: 'destructive'
                    }
                  )
                }
          })
      )

      :

      (
        dispatch(addNewProduct({
          ...formData,
          image: uploadedImageUrl
        })).then((data) => {
          if(data?.payload?.success){
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setImageFile(null);
            setOpenCreateProductDialog(false);
            toast(
              {
                title: data?.payload?.message,
                variant: 'success'
              }
            )
          }else{
            setOpenCreateProductDialog(false);
            toast(
              {
                title: data?.payload?.message,
                variant: 'destructive'
              }
            )
          }
        })
      )

  }
    return (
      <Fragment>
        <div className="mb-5 flex justify-end">
            <Button onClick={()=> setOpenCreateProductDialog(true)}>Add New Product</Button>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            
              {
              products && products.length > 0 ?
              (
                products?.map((product) => {
                  // <AdminProductTile product={product} />
                 return (
                    <AdminProductTile 
                      product={product} 
                      setCurrentEditedProductId={setCurrentEditedProductId}
                      setFormData={setFormData} 
                      setOpenCreateProductDialog={setOpenCreateProductDialog} 
                      key={product._id}
                      handleProductDelete={handleProductDelete}
                      />
                  )
                })
              )

              :
              (
                <div className="flex items-center justify-center h-full">
                    <Badge variant="outline">No Product Found</Badge>
                </div>
              )
            }
        </div>
        <Sheet open={openCreateProductDialog} onOpenChange={()=> 
          {
            setOpenCreateProductDialog(false)
            setCurrentEditedProductId(null)
            setFormData(initialFormData);
          } 
          }
          >
            <SheetContent side="right" className="overflow-auto"  aria-describedby="add new product">
                <SheetHeader>
                    <SheetTitle>{currentEditedProductId ? 'Edit Product' : 'Add Product'}</SheetTitle>
                </SheetHeader>
                <ProductImageUpload 
                imageFile={imageFile} 
                setImageLoadingState={setImageLoadingState} 
                setImageFile={setImageFile} 
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                imageLoadingState={imageLoadingState}
                isEditMode={currentEditedProductId !== null} 
                />
                <div className="py-6">
                  <CommonForm formData={formData} onSubmit={onSubmit} setFormData={setFormData} buttonText={currentEditedProductId ? 'Edit Product' : 'Add Product'} 
                  formControls={addProductFormElements}
                  isBtnDisabled={!isFormValid()} 
                  /> 
                </div>
            </SheetContent>
        </Sheet>
      </Fragment>
    )
  }
  
  export default AdminProducts