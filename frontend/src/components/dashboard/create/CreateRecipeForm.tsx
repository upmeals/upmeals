import { TextField, Button, TextareaAutosize, Autocomplete, Grid } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { Formik, FormikValues, FormikProps, Field, FieldArray } from 'formik';
import * as yup from 'yup';
import { gqlCollectionCreate } from '../../../services/gql/Collection';
import { gqlSystemUploadFile } from '../../../services/gql/System';
import { Recipe, Ingredient } from '../../../interfaces/Collections'
import useAllRecords from '../../../hooks/useAllRecords';
import HeadTitle from '../../ui/HeadTitle';
import InputAdornment from '@mui/material/InputAdornment';
import Edit from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import { useState } from 'react';


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        formContainer: {
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            flexWrap: "wrap",
            padding: 0,
            minWidth: 400,
            boxSizing: "border-box",
        },
        textFieldContainer: {
            width: "70%",
            margin: theme.spacing(0, 0, 2, 0) + "!important",
        },
        textFieldIngredients: {
            width: "50%",
            margin: "16px 8px 8px 0 !important",
        },
        unitField: {
            width: "30%",
        },
        buttonIngredient: {
            border: 0,
            background: "transparent",
            cursor: "pointer",
            color: theme.palette.primary.main,
        },
        textAreaContainer: {
            width: "70%",
            margin: theme.spacing(0, 0, 2, 0) + "!important",
            fontSize: "1rem",
            fontFamily: "Poppins, sans-serif",
            color: "inherit",
            resize: "none",
            '&:focus': {
                outlineColor: theme.palette.primary.main,
            },
            padding: theme.spacing(1),
            boxSizing: "border-box !important" as any,
            borderRadius: '4px',
            background: "#F4F6F7",
            borderColor: "rgb(118, 118, 118)"
        },
        buttonContainer: {
            width: "50%",
            margin: "auto",
            marginTop: `${theme.spacing(10)} !important`,
        },
        addItemButton: {
            fontSize: "1rem",
            fontFamily: "Poppins, sans-serif",
            background: "transparent",
            border: 0,
            cursor: "pointer",
            display: "block",
        },
        gridContainer: {
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column !important" as 'column',
            flexWrap: "nowrap",
            padding: theme.spacing(4),
        },
        imageLabel: {
            fontSize: "1rem",
            fontFamily: "Poppins, sans-serif",
            color: "inherit",
            cursor: "pointer",
            height: "100%",
            width: "100%",
            display: "flex",
        },
        imageContainer: {
            width: "100%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        imageFieldContainer: {
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginBottom: theme.spacing(4),
        },
        imageField: {
            opacity: 0,
        },
        fieldsContainer: {
            height: "50%",
        },
        rightSection: {
            display: "flex",
            flexDirection: "column !important" as 'column',
            justifyContent: "flex-start",
            wrap: "nowrap",
            height: "calc(100vh - 98px)",
            backgroundColor: "#F4F6F7",
            padding: theme.spacing(4),
            position: "fixed",
            right: 0,
            top: "98px",
            width: "40%",
        },
        leftSection: {
            display: "flex",
            flexDirection: "column !important" as 'column',
            justifyContent: "flex-start",
            wrap: "nowrap",
            padding: theme.spacing(4),
            boxSizing: "border-box",
            width: "60%",
        },
        RecipeNameField: {
            width: "70%",
            margin: theme.spacing(0, 0, 2, 0) + "!important",
            border: "0 !important",
        },
        fieldArray: {
            marginBottom: theme.spacing(2),
        },
        ingredientArray: {
            marginBottom: theme.spacing(5),
        }
    })
})

const validationSchemaRecipeForm = yup.object({
    title: yup
        .string()
        .required("Un nom de recette est requis."),
    description: yup
        .string()
        .required("Une description est requise."),
    price: yup
        .number()
        .required("Un prix est requis."),
    preparation_time: yup
        .number()
        .required("Un temps de préparation est requis."),
    image: yup
        .string(),
    ingredients: yup
        .array()
})

const initialValues = {
    status: 'draft',
    title: '',
    description: '',
    image: null,
    price: '',
    preparation_time: '',
    ingredients: [{
        ingredient: {
            name: ''
        },
        value: '',
        unit: {
            slug: ''
        },
    }],
    steps: [{
        content: '',
    }]
}

const handleCreateRecipe = async (values: Recipe) => {

    const imgUploaded = await gqlSystemUploadFile({
        file: values.image
    })

    const createCollection = await gqlCollectionCreate({
        collection: 'recipes',
        item: {
            status: values.status,
            title: values.title,
            description: values.description,
            image: {
                id: imgUploaded.data.data.id,
                storage: imgUploaded.data.data.storage,
                filename_download: imgUploaded.data.data.filename_download,
                uploaded_on: imgUploaded.data.data.uploaded_on,
                modified_on: imgUploaded.data.data.modified_on,
                type: imgUploaded.data.data.type
            },
            price: values.price,
            preparation_time: values.preparation_time,
            ingredients: values.ingredients,
            steps: values.steps,
        },
    })
    console.log(createCollection)
}


const CreateRecipeForm = () => {
    const classes = useStyles()
    const { records: ingredients }: { loading: boolean, records: Ingredient[] | [] } = useAllRecords(
        100,
        {
            collection: 'ingredients',
        }
    );

    const unit = [
        'g',
        'L',
        'mL',
        'tranche',
    ]

    const [imageUrl, setImageUrl] = useState<string>('')

    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: Function) => {
        if (event?.currentTarget?.files?.length) {
            setImageUrl(URL.createObjectURL(event?.currentTarget?.files[0] ?? ''))
        }
    }

    const backgroundStyle = {
        backgroundImage: 'url(' + imageUrl + ')',
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchemaRecipeForm}
            onSubmit={async (values: any) => {
                return handleCreateRecipe(values);
            }}
        >
            {
                (formikProps: FormikProps<FormikValues>) => (
                    <form className={classes.formContainer} onSubmit={formikProps.handleSubmit}>
                        <Grid width="90%">
                            <Grid
                                className={classes.leftSection}
                            >
                                <HeadTitle
                                    title="Créer une recette"
                                    subtitle="C'est vous le chef ! Ajoutez une recette afin de la retrouver facilement plus tard."
                                />
                                <FieldArray
                                    name="ingredients"
                                    render={(arrayHelpers: any) => (
                                        <div className={classes.ingredientArray}>
                                            {formikProps.values.ingredients.map((ingredient: any, index: number) => (
                                                <div key={index} className={classes.fieldArray}>
                                                    <Autocomplete
                                                        id="ingredient"
                                                        freeSolo
                                                        options={ingredients.map((option: Ingredient) => option.name)}
                                                        onChange={(event: any, value: any) => {
                                                            arrayHelpers.replace(index, {
                                                                ingredient: {name: value}
                                                            })
                                                        }}
                                                        renderInput={(params: any) => (
                                                            <TextField {...params} label="Ingrédient" margin="normal" />
                                                        )}
                                                    />
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        wrap="nowrap"
                                                        alignItems='center'
                                                    >
                                                        <TextField
                                                            name={`ingredients.${index}.value`}
                                                            label='Quantité'
                                                            id={`ingredients.${index}.value`}
                                                            type="number"
                                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                            error={formikProps.touched.ingredients && Boolean(formikProps.errors.ingredients)}
                                                            helperText={formikProps.touched.ingredients && formikProps.errors.ingredients}
                                                            onChange={formikProps.handleChange}
                                                            className={classes.textFieldIngredients}
                                                        />
                                                        <Autocomplete
                                                            id="unit"
                                                            freeSolo
                                                            options={unit}
                                                            onChange={(event: any, value: any) => {
                                                                arrayHelpers.replace(index, {
                                                                    unit: {
                                                                        slug: value.slug
                                                                    },
                                                                })
                                                            }}
                                                            renderInput={(params: any) => (
                                                                <TextField {...params} label="Unité" margin="normal" />
                                                            )}
                                                            className={classes.unitField}
                                                        />
                                                        <button className={classes.buttonIngredient} onClick={() => arrayHelpers.remove(index)}>
                                                            <Delete />
                                                        </button>
                                                    </Grid>
                                                    <button className={classes.addItemButton} onClick={() => arrayHelpers.push({})}>
                                                        + Ajouter un ingrédient
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                />
                                <FieldArray
                                    name="steps"
                                    render={(arrayHelpers: any) => (
                                        <div>
                                            {formikProps.values.steps.map((steps: any, index: number) => (
                                                <div key={index} className={classes.fieldArray}>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        wrap="nowrap"
                                                        alignItems='center'
                                                    >
                                                        <TextField
                                                            name={`steps.${index}.content`}
                                                            label='Étape'
                                                            id={`steps.${index}.content`}
                                                            type="text"
                                                            error={formikProps.touched.steps && Boolean(formikProps.errors.steps)}
                                                            helperText={formikProps.touched.steps && formikProps.errors.steps}
                                                            onChange={formikProps.handleChange}
                                                            className={classes.textFieldContainer}
                                                        />
                                                        <button className={classes.buttonIngredient} onClick={() => arrayHelpers.remove(index)}>
                                                            <Delete />
                                                        </button>
                                                    </Grid>
                                                    <button className={classes.addItemButton} onClick={() => arrayHelpers.push({})}>
                                                        + Ajouter une étape
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                />
                                <Grid
                                    container
                                    justifyContent="center"
                                >
                                    <Button className={classes.buttonContainer} color="primary" variant="contained" type="submit">
                                        Enregistrer la recette
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.rightSection}
                            >
                                <Grid
                                    className={classes.imageContainer}
                                >
                                    <Field name="image"
                                        error={formikProps.touched.image && Boolean(formikProps.errors.image)}
                                        helperText={formikProps.touched.image && formikProps.errors.image}
                                    >
                                        {
                                            ({ field, form }: any) => {
                                                const { setFieldValue } = form
                                                return (
                                                    <div className={classes.imageFieldContainer} style={backgroundStyle}>
                                                        <label htmlFor="image" className={classes.imageLabel}>
                                                            <Edit />
                                                            Ajouter une image
                                                        </label>
                                                        <input id="image" name="image" type="file" className={classes.imageField} onChange={(event) => {
                                                            if (event?.target?.files?.length) {
                                                                handleChangeImage(event, setFieldValue('image', event.target.files[0]))
                                                            }
                                                        }} />
                                                    </div>
                                                )
                                            }
                                        }
                                    </Field>
                                </Grid>
                                <Grid
                                    className={classes.fieldsContainer}
                                >
                                    <TextField
                                        name='title'
                                        id='title'
                                        error={formikProps.touched.title && Boolean(formikProps.errors.title)}
                                        helperText={formikProps.touched.title && formikProps.errors.title}
                                        onChange={formikProps.handleChange}
                                        className={classes.RecipeNameField}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Edit />
                                                </InputAdornment>
                                            ),
                                        }}
                                        label="Nom de la recette"
                                    />
                                    <TextareaAutosize
                                        name='description'
                                        placeholder='Description'
                                        id='description'
                                        className={classes.textAreaContainer}
                                        onChange={formikProps.handleChange}
                                        minRows={3}
                                        maxRows={5}
                                    />

                                    <TextField
                                        name='price'
                                        label='Prix estimé'
                                        id='price'
                                        type="number"
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        error={formikProps.touched.price && Boolean(formikProps.errors.price)}
                                        helperText={formikProps.touched.price && formikProps.errors.price}
                                        onChange={formikProps.handleChange}
                                        className={classes.textFieldContainer}
                                    />
                                    <TextField
                                        name='preparation_time'
                                        label='Temps de préparation'
                                        id='preparation_time'
                                        type="number"
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        error={formikProps.touched.preparation_time && Boolean(formikProps.errors.preparation_time)}
                                        helperText={formikProps.touched.preparation_time && formikProps.errors.preparation_time}
                                        onChange={formikProps.handleChange}
                                        className={classes.textFieldContainer}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                )
            }
        </Formik>


    )
}

export default CreateRecipeForm