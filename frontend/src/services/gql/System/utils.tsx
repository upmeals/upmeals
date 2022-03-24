interface buildFormDataInterface {
    file?: object | Array<object>,
    data?: object | Array<object>,
}

export const buildFormData = ({ file, data } : buildFormDataInterface) => {
    let formData = new FormData()

    if (!Array.isArray(file)) {
        if (data && !Array.isArray(data)) {
            Object.entries(data).forEach(([key, value]) => {
                return formData.append(key as string, value as any);
            })
        } else if (data && Array.isArray(data)) {
            Object.entries(data[0]).forEach(([key, value]) => {
                return formData.append(key as string, value as any)
            })
        }
        formData.append('file', file as Blob)
    } else if (Array.isArray(file)) {
        (file as []).forEach((f: Blob, index) => {
            if (data && !Array.isArray(data)) {
                Object.entries(data).forEach(([key, value]) => {
                    return formData.append(key as string, value as any);
                })
            } else if (data && Array.isArray(data)) {
                Object.entries(data[index]).forEach(([key, value]) => {
                    return formData.append(key as string, value as any)
                })
            }
            formData.append('file', f)
        });
    }

    return formData
}