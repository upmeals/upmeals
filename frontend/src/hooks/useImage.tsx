import React, { useEffect } from 'react';
import { File } from '../interfaces/Collections';
import { gqlSystemGetFile, gqlSystemGetFileData } from '../services/gql/System';


interface useImageProps {
    image: File | undefined,
    key?: string
}


export const useImage = ({ image, key }: useImageProps) => {
    const [currentImage, setCurrentImage] = React.useState<File | undefined>(undefined)
    const [src, setSrc] = React.useState<string | undefined>(undefined)

    useEffect(() => {
        if (image) {
            let img = (currentImage ? currentImage : image)
            let cacheId = img.modified_on.replace(/[^A-Za-z0-9]+/g, '')
            let imageParams = ((key) ? ('?key=' + key) : ('')) + ((key) ? ('&cache=' + cacheId) : ('?cache=' + cacheId))
            let url = gqlSystemGetFile({ id: img.id })

            setCurrentImage(img)
            setSrc(url + imageParams)
        }
    }, [currentImage, image, key])

    const handleRefreshImage = async (newImage?: File) => {
        if (newImage) {
            setCurrentImage(newImage)
        } else {
            if (image && image.id) {
                let response = await gqlSystemGetFileData({ id: image.id })
                setCurrentImage(response.data)
            }
        }
    }

    return { src, refreshImage: handleRefreshImage }
};