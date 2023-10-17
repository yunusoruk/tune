import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    accept: "image" | "mp3",
    className?: string
}

const FileUpload = ({
    onChange,
    value,
    accept,
    className
}: FileUploadProps) => {

    const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0]!
        const filename = encodeURIComponent(file.name)
        const fileType = encodeURIComponent(file.type)

        const res = await fetch(
            `/api/upload-url?file=${filename}&fileType=${fileType}`
        )
        const { url, fields } = await res.json()

        console.log(url, fields);

        const imageUrl = `s3.amazonaws.com/${fields.key}`
        console.log(imageUrl);


        const formData = new FormData()

        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value as string)
        })

        const upload = await fetch(url, {
            method: 'POST',
            body: formData,
        })



        if (upload.ok) {
            console.log('Uploaded successfully!')
            onChange(imageUrl)

        } else {
            console.error('Upload failed.')
        }
    }

    return (
        <div className={cn("",
            className
        )}>
            <Input
                type="file"
                accept={accept === "image" ? ".jpeg, .jpg, .png" : ".mp3"}
                onChange={uploadFile}
            />
        </div>
    );
}

export default FileUpload;