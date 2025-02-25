import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css'
import axios from "../../../../api/axios";
import { useEffect, useState } from "react";

export default function ModalAddProduct({ openModalAdd, handleOpenAdd }) {
    const token = localStorage.getItem('admtoken')
    const [isLoading, setIsLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [categoryId, setCategoryId] = useState(0)
    const [subCategoryData, setSubCategoryData] = useState([])
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`/categories?all=true}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setCategoryData(response.data.result.rows)
            if (categoryId) {
                const response2 = await axios.get(`/categories/sub-category/${categoryId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setSubCategoryData(response2.data.result)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const RegisterSchema = Yup.object({
        name: Yup.string().required("Name can't be empty"),
        description: Yup.string().required("Description can't be empty"),
    });

    const handleSubmit = async (data) => {
        try {
            setIsLoading(true)
            const response = await axios.post("products/", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsLoading(false)
            toast.success(response.data.message, {
                position: "top-center",
                hideProgressBar: true,
                theme: "colored"
            });
        } catch (err) {
            setIsLoading(false)
            console.log(err);
            toast.error(err.response.data.message, { position: "top-center" });
        }
    };

    const handleClose = () => {
        setCategoryId(0)
        setSelectedFile(null)
        handleOpenAdd()
        formik.resetForm()
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            weight: "",
            price: "",
            category_id: "",
            subcategory_id: ""
        },
        validationSchema: RegisterSchema,
        onSubmit: (values, action) => {
            const formData = new FormData();
            formData.append("name", values.name)
            formData.append("description", values.description);
            formData.append("weight", values.weight);
            formData.append("price", values.price);
            formData.append("category_id", values.category_id);
            formData.append("subcategory_id", values.subcategory_id)
            formData.append("image1", selectedFile)
            handleSubmit(formData);
            action.resetForm();
        },
    });

    useEffect(() => {
        fetchData();
    }, [categoryId])

    return (
        <>
            <Dialog
                size="xs"
                open={openModalAdd}
                handler={handleOpenAdd}
                dismiss={{ outsidePress: (() => handleClose()) }}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <form onSubmit={formik.handleSubmit}>
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="blue-gray">
                                Add Product
                            </Typography>
                            <Typography className="-mb-2" variant="h6">
                                Name
                            </Typography>
                            <Input name="name" autoComplete="new" label="Name" size="lg"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                error={formik.touched.name && Boolean(formik.errors.name)} />
                            {formik.touched.name && formik.errors.name ? (
                                <div className=" text-red-900 text-xs">
                                    {formik.errors.name}
                                </div>
                            ) : null}
                            <Typography className="-mb-2" variant="h6">
                                Price
                            </Typography>
                            <Input name="price" type="number" autoComplete="new" label="Price" size="lg"
                                onChange={formik.handleChange}
                                value={formik.values.price}
                                error={formik.touched.price && Boolean(formik.errors.price)} />
                            {formik.touched.price && formik.errors.price ? (
                                <div className=" text-red-900 text-xs">
                                    {formik.errors.price}
                                </div>
                            ) : null}
                            <Typography className="-mb-2" variant="h6">
                                Description
                            </Typography>
                            <Input name="description" autoComplete="new" label="Description" size="lg"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                error={formik.touched.description && Boolean(formik.errors.description)} />
                            {formik.touched.description && formik.errors.description ? (
                                <div className=" text-red-900 text-xs">
                                    {formik.errors.description}
                                </div>
                            ) : null}
                            <Typography className="-mb-2" variant="h6">
                                {'Weight (gram)'}
                            </Typography>
                            <Input type="number" name="weight" autoComplete="new" label="Weight" size="lg"
                                onChange={formik.handleChange}
                                value={formik.values.weight}
                                error={formik.touched.weight && Boolean(formik.errors.weight)} />
                            {formik.touched.weight && formik.errors.weight ? (
                                <div className=" text-red-900 text-xs">
                                    {formik.errors.weight}
                                </div>
                            ) : null}
                            <Typography className="-mb-2" variant="h6">
                                Image 1
                            </Typography>
                            {selectedFile && <img src={selectedFile ? URL.createObjectURL(selectedFile) : ''} className="w-32 h-32 rounded-lg object-cover"></img>}
                            <input type="file" name="image1" autoComplete="new" size="sm"
                                onChange={handleFileChange} />
                            {categoryData && categoryData.length > 0 && (
                                <>
                                    <Typography className="-mb-2" variant="h6">
                                        Category
                                    </Typography>
                                    <Select
                                        name="category_id"
                                        color="teal"
                                        label="Select category"
                                        value={formik.values.category_id}
                                        onChange={(value) => { formik.setFieldValue("category_id", value); setCategoryId(value) }}
                                    >
                                        {categoryData?.map((item, index) => (
                                            <Option key={index} value={item.id}>{item.name}</Option>
                                        ))}
                                    </Select>
                                </>
                            )}
                            {subCategoryData && subCategoryData.length > 0 && categoryId != 0 && (
                                <>
                                    <Typography className="-mb-2" variant="h6">
                                        Sub Category
                                    </Typography>
                                    <Select
                                        name="subcategory_id"
                                        color="teal"
                                        label="Select sub category"
                                        value={formik.values.subcategory_id}
                                        onChange={(value) => formik.setFieldValue("subcategory_id", value)}
                                    >
                                        {subCategoryData?.map((item, index) => (
                                            <Option key={index} value={item.id}>{item.name}</Option>
                                        ))}
                                    </Select>
                                </>
                            )}
                        </CardBody>
                        <CardFooter className="pt-0">
                            <div className="flex flex-row gap-3">
                                <Button disabled={isLoading} onClick={handleClose} variant="text" fullWidth>
                                    Cancel
                                </Button>
                                <Button disabled={isLoading} type="submit" style={{ backgroundColor: '#41907a' }} variant="filled" fullWidth>
                                    {isLoading ? <div className="flex justify-center items-center">
                                        <SyncLoader color="#c0cac2" size={9} /></div> : <>Add</>}
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </>
    )
}