
import { useEffect, useRef } from 'react'
import { Input } from '../ui/input';
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';

const ProductImageUpload = ({imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState, imageLoadingState, isEditMode}) => {

    const inputRef = useRef(null);

    function handleImageFileChange(e){
        const selectedFile = e.target.files?.[0];
        if (selectedFile) setImageFile(selectedFile);
    }

    function handleOnDragOver(e){
        e.preventDefault();
    }

    function handleOnDrop(e){
        e.preventDefault();
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) setImageFile(droppedFile);
    }

    function handleRemoveImage(){
        setImageFile(null);
        if(inputRef.current){
            inputRef.current.value = '';
        }
    }

    async function uploadFileToCloudinaty(){
        setImageLoadingState(true);
        const data = new FormData();
        data.append('my_file', imageFile);
        const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data)
        if(response?.data?.success) {
            setUploadedImageUrl(response.data.result.url)
            setImageLoadingState(false);
        }
        
    }

    useEffect(() =>{
        if(imageFile !== null) uploadFileToCloudinaty()
    }, [imageFile])

  return (
    <div className='w-full max-w-md mx-auto'>
        <Label className='font-semibold my-2 block'>Product Image</Label>
        <div onDragOver={handleOnDragOver} onDrop={handleOnDrop} className={`${isEditMode} ? 'opacity-60' : '' border-2 border-dashed rounded-md p-4 flex items-center justify-center`}>
            <Input type="file" className='hidden' id='image-upload' ref={inputRef} onChange={handleImageFileChange} disabled={isEditMode}/>
            {
                !imageFile ? 
                (
                <Label htmlFor="image-upload" className={`${isEditMode} ? 'cursor-not-allowed' : '' flex flex-col items-center justify-center h-32 cursor-pointer`}>
                    <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2'/>
                    <span>Click to upload image or drag and drop</span>
                </Label>
                )
                :
              (  
                
                imageLoadingState ? <Skeleton className='w-full h-10 bg-gray-100'/> : 

              <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <FileIcon className='w-8 text-primary mr-2 h-8'/>
                    </div>
                    <p className='text-sm font-medium'>{imageFile.name}</p>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground ml-2" onClick={handleRemoveImage}>
                        <XIcon className='w-4 h-4'/>
                        <span className='sr-only'>Remove File</span>
                    </Button>
                </div>
                )
            }
        </div>
    </div>
  )
}

export default ProductImageUpload